import { useMemo, useState } from "react";
import { formatDate } from "../utils/formatDate";
import { deleteExpense, updateExpense } from "../services/expenseServices";

/**
 * ExpenseList Component
 *
 * Props:
 * - expenses: Array of expense objects
 *   (Each object should have _id, category, amount, date)
 */
export default function ExpenseList({ expenses = [] }) {
  // State for filters
  const [category, setCategory] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  /**
   * Compute unique category list dynamically
   * Add "All" as the first option for showing everything
   */
  const categories = useMemo(() => {
    const set = new Set(expenses.map((e) => e.category));
    return ["All", ...Array.from(set)];
  }, [expenses]);

  /**
   * Apply filters:
   * - Category match
   * - Date range match (fromDate → toDate)
   */
  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      const okCat = category === "All" || e.category === category;
      const d = new Date(e.date);
      const okFrom = fromDate ? d >= new Date(fromDate) : true;
      const okTo = toDate ? d <= new Date(toDate) : true;
      return okCat && okFrom && okTo;
    });
  }, [expenses, category, fromDate, toDate]);

  return (
    <div className="p-4 bg-expense-purpleLight/60 rounded-2xl shadow">
      {/* Filter Controls */}
      <div className="flex flex-wrap items-end gap-3 mb-3">
        {/* Category Filter */}
        <div className="flex-1 min-w-[160px]">
          <label className="block text-sm mb-1 font-semibold">Category</label>
          <select
            className="p-2 border rounded w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* From Date */}
        <div className="min-w-[140px]">
          <label className="block text-sm mb-1 font-semibold">From</label>
          <input
            type="date"
            className="p-2 border rounded w-full"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        {/* To Date */}
        <div className="min-w-[140px]">
          <label className="block text-sm mb-1 font-semibold">To</label>
          <input
            type="date"
            className="p-2 border rounded w-full"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>

      {/* If no filtered results */}
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-600">No expenses found.</p>
      ) : (
        <ul className="divide-y">
          {filtered.map((expense) => (
            <li
              key={expense._id}
              className="py-2 flex flex-wrap items-center justify-between gap-2"
            >
              {/* {Expense Title} */}
              <span className="font-medium break-words">{expense.title}</span>
              {/* Expense Category */}
              <span className="font-medium break-words">{expense.category}</span>

              {/* Expense Amount */}
              <span className="tabular-nums">
                ₹{Number(expense.amount).toLocaleString()}
              </span>

              {/* Expense Date */}
              <span className="text-gray-600">{formatDate(expense.date)}</span>

              {/* Edit Button */}
              <button
                className="bg-violet-950 font-semibold text-white rounded p-2 hover:opacity-90 "
                onClick={async () => {
                  const newAmount = prompt(
                    "Enter new amount:",
                    expense.amount
                  );
                  const newCategory = prompt(
                    "Enter new category:",
                    expense.category
                  );

                  if (newAmount || newCategory) {
                    await updateExpense(expense._id, {
                      ...expense,
                      amount: newAmount,
                      category: newCategory,
                    });
                    window.location.reload();
                  }
                }}
              >
                Edit
              </button>

              {/* Delete Button */}
              <button
                className="bg-red-600 font-semibold text-white rounded p-2 hover:opacity-90 "
                onClick={async () => {
                  await deleteExpense(expense._id);
                  window.location.reload();
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

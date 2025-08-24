import { useMemo, useState } from "react";
import { formatDate } from "../utils/formatDate";
import { deleteExpense, updateExpense } from "../services/expenseServices";

export default function ExpenseList({ expenses = [] }) {
  // Filters
  const [category, setCategory] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Edit state
  const [editingExpense, setEditingExpense] = useState(null);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const DEFAULT_CATEGORIES = ["Food", "Travel", "Shopping", "Bills", "Entertainment", "Groceries", "Other"];

  // Unique categories
  const categories = useMemo(() => {
    const set = new Set(expenses.map((e) => e.category));
    return ["All", ...Array.from(set)];
  }, [expenses]);

  // Filtered expenses
  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      const okCat = category === "All" || e.category === category;
      const d = new Date(e.date);
      const okFrom = fromDate ? d >= new Date(fromDate) : true;
      const okTo = toDate ? d <= new Date(toDate) : true;
      return okCat && okFrom && okTo;
    });
  }, [expenses, category, fromDate, toDate]);

  // When clicking Edit → pre-fill form
  const handleEditClick = (expense) => {
    setEditingExpense(expense);
    setTitle(expense.title);
    setAmount(expense.amount);
    setDate(expense.date.split("T")[0]); // format yyyy-mm-dd
    setCategory(expense.category);
  };

  // Submit update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateExpense(editingExpense._id, {
        title,
        amount,
        category,
        date,
      });
      window.location.reload(); // optional, we can make this instant later
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-expense-purpleLight/60 rounded-2xl shadow">
      {/* Filters */}
      <div className="flex flex-wrap items-end gap-3 mb-3">
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

        <div className="min-w-[140px]">
          <label className="block text-sm mb-1 font-semibold">From</label>
          <input
            type="date"
            className="p-2 border rounded w-full"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

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

      {/* Expenses List */}
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-600">No expenses found.</p>
      ) : (
        <ul className="divide-y">
          {filtered.map((expense) => (
            <li
              key={expense._id}
              className="py-2 flex flex-wrap items-center justify-between gap-2"
            >
              <span className="font-medium break-words">{expense.title}</span>
              <span className="font-medium break-words">{expense.category}</span>
              <span className="tabular-nums">
                ₹{Number(expense.amount).toLocaleString()}
              </span>
              <span className="text-gray-600">{formatDate(expense.date)}</span>

              <button
                className="bg-violet-950 font-semibold text-white rounded p-2 hover:opacity-90"
                onClick={() => handleEditClick(expense)}
              >
                Edit
              </button>

              <button
                className="bg-red-600 font-semibold text-white rounded p-2 hover:opacity-90"
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

      {/* Modal for Editing */}
      {editingExpense && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">Edit Expense</h2>
            <form
              onSubmit={handleUpdate}
              className="grid grid-cols-1 gap-3"
            >
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 outline-none font-semibold border rounded w-full"
              />

              <input
                type="number"
                step="0.01"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-2 font-semibold outline-none border rounded w-full"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-2 font-semibold outline-none border rounded w-full"
              >
                {DEFAULT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-2 font-semibold outline-none border rounded w-full"
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setEditingExpense(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:opacity-90"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-violet-950 font-semibold flex items-center justify-center text-white rounded px-4 py-2 hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating... 
                  </>
                   : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import { useMemo, useState } from "react";
import { formatDate } from "../utils/formatDate";

export default function ExpenseList({ expenses = [] }) {
  const [category, setCategory] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const categories = useMemo(() => {
    const set = new Set(expenses.map((e) => e.category));
    return ["All", ...Array.from(set)];
  }, [expenses]);

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
    <div className="p-4 bg-white rounded-2xl shadow">
      <div className="flex flex-wrap items-end gap-3 mb-3">
        <div className="flex-1 min-w-[160px]">
          <label className="block text-sm mb-1">Category</label>
          <select
            className="p-2 border rounded w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">From</label>
          <input
            type="date"
            className="p-2 border rounded"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">To</label>
          <input
            type="date"
            className="p-2 border rounded"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-600">No expenses found.</p>
      ) : (
        <ul className="divide-y">
          {filtered.map((expense) => (
            <li key={expense._id} className="py-2 flex items-center justify-between">
              <span className="font-medium">{expense.category}</span>
              <span className="tabular-nums">₹{Number(expense.amount).toLocaleString()}</span>
              <span className="text-gray-600">{formatDate(expense.date)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

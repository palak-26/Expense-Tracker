import { useState } from "react";
import { addExpense } from "../services/expenseServices";

// Default categories for expenses
const DEFAULT_CATEGORIES = ["Food", "Travel", "Shopping", "Bills", "Entertainment", "Groceries", "Other"];

/**
 * ExpenseForm Component
 * 
 * Props:
 * - onAdded: Function (optional) - Callback triggered after successful expense addition
 */
export default function ExpenseForm({ onAdded }) {
  // Form state variables
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(DEFAULT_CATEGORIES[0]);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10)); // Default to today's date
  const [loading, setLoading] = useState(false); // Tracks form submission loading state

  /**
   * Handle form submission
   */
  const submit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!title || !amount || !category || !date) {
      return alert("All fields are required");
    }

    setLoading(true);

    try {
      // Call API to add expense
      await addExpense({ title, amount: Number(amount), category, date });

      // Reset form after success
      setTitle("");
      setAmount("");
      setCategory(DEFAULT_CATEGORIES[0]);
      setDate(new Date().toISOString().slice(0, 10));

      // Trigger callback if provided
      onAdded?.();
    } catch (e) {
      alert(e?.response?.data?.message || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="p-4 bg-expense-purpleLight/60 rounded-2xl shadow 
                 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
    >
      {/* Title Input */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 outline-none font-semibold rounded w-full"
      />

      {/* Amount Input */}
      <input
        type="number"
        step="0.01"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="p-2 font-semibold outline-none rounded w-full"
      />

      {/* Category Dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 font-semibold outline-none border rounded w-full"
      >
        {DEFAULT_CATEGORIES.map((c) => (
          <option key={c} value={c} className="font-semibold">
            {c}
          </option>
        ))}
      </select>

      {/* Date Picker */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="p-2 font-semibold outline-none border rounded w-full"
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-violet-950 font-semibold text-white rounded px-4 py-2 
                   hover:opacity-90 disabled:opacity-50 w-full sm:col-span-2 lg:col-span-1"
      >
        {loading ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
}

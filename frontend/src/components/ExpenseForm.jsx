import { useState } from "react";
import { addExpense } from "../services/expenseServices";

const DEFAULT_CATEGORIES = ["Food", "Travel", "Shopping", "Bills", "Entertainment", "Other"];

export default function ExpenseForm({ onAdded }) {
  const [title,setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(DEFAULT_CATEGORIES[0]);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!title || !amount || !category || !date) return alert("All fields are required");
    setLoading(true);
    try {
      await addExpense({ title, amount: Number(amount), category, date });
      setAmount("");
      setCategory(DEFAULT_CATEGORIES[0]);
      setDate(new Date().toISOString().slice(0, 10));
      onAdded?.();
    } catch (e) {
      alert(e?.response?.data?.message || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="p-4 bg-expense-purpleLight/60 rounded-2xl shadow grid sm:grid-cols-4 gap-3 ">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 outline-none font-semibold  rounded"
      />
      <input
        type="number"
        step="0.01"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="p-2 font-semibold outline-none rounded"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 font-semibold outline-none  border rounded"
      >
        {DEFAULT_CATEGORIES.map((c) => (
          <option key={c} value={c} className="font-semibold hover:bg-expense-purpleDark">{c}</option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="p-2 font-semibold outline-none border rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-violet-950 font-semibold   relative left-96 text-white rounded px-4 py-2 hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
}

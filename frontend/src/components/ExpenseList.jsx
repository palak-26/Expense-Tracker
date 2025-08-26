import { useMemo, useState } from "react";
import { formatDate } from "../utils/formatDate";
import { deleteExpense, updateExpense } from "../services/expenseServices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ExpenseList({ expenses = [] }) {
  // ---------------- Filters ----------------
  const [category, setCategory] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // ---------------- Edit State ----------------
  const [editingExpense, setEditingExpense] = useState(null);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const user= auth?.user;

  const DEFAULT_CATEGORIES = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
    "Groceries",
    "Other",
  ];

  // ---------------- Unique Categories ----------------
  const categories = useMemo(() => {
    const set = new Set(expenses.map((e) => e.category));
    return ["All", ...Array.from(set)];
  }, [expenses]);

  // ---------------- Filtered Expenses ----------------
  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      const okCat = category === "All" || e.category === category;
      const d = new Date(e.date);
      const okFrom = fromDate ? d >= new Date(fromDate) : true;
      const okTo = toDate ? d <= new Date(toDate) : true;
      return okCat && okFrom && okTo;
    });
  }, [expenses, category, fromDate, toDate]);

  // ---------------- Handlers ----------------
  const handleEditClick = (expense) => {
    setEditingExpense(expense);
    setTitle(expense.title);
    setAmount(expense.amount);
    setDate(expense.date.split("T")[0]);
    setCategory(expense.category);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateExpense(editingExpense._id, { title, amount, category, date });
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Component ----------------
  return (
    <div className="p-4 bg-expense-purpleLight/60 rounded-2xl shadow">
      {/* ================= Filters ================= */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-end gap-4">
          {/* Category Filter */}
          <div className="flex-1 min-w-[160px]">
            <label className="block text-sm mb-1 font-semibold">Category</label>
            <select
              className="p-2 border rounded w-full appearance-none bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
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
              className="p-2 border rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          {/* To Date */}
          <div className="min-w-[140px]">
            <label className="block text-sm mb-1 font-semibold">To</label>
            <input
              type="date"
              className="p-2 border rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>

        {/* ================= Table Layout (Desktop) ================= */}
        <div className="hidden sm:block overflow-x-auto hide-scrollbar  rounded-lg ">
          <table className="min-w-full divide-y">
            <thead >
              <tr>
                <th className="px-4 py-2 text-center text-base font-semibold ">Title</th>
                <th className="px-4 py-2 text-center text-base font-semibold ">Category</th>
                <th className="px-4 py-2 text-center text-base font-semibold ">Amount</th>
                <th className="px-4 py-2 text-center text-base font-semibold ">Date</th>
                <th className="px-4 py-2 text-center text-base font-semibold ">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-3 text-center text-gray-500">
                    No expenses found.
                  </td>
                </tr>
              ) : (
                filtered.map((expense) => (
                  <tr key={expense._id} className="hover:bg-black/10 backdrop-blur-sm">
                    <td className="px-4 py-2">{expense.title}</td>
                    <td className="px-4 py-2">{expense.category}</td>
                    <td className="px-4 py-2 text-right tabular-nums">
                      ₹{Number(expense.amount).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">{formatDate(expense.date)}</td>
                    <td className="px-4 py-2 text-center flex justify-center gap-2">
                      <button
                        className="bg-violet-950 text-white px-3 py-1 rounded hover:opacity-95 transition"
                        onClick={() => 
                          handleEditClick(expense)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                        onClick={async () => {
                          await deleteExpense(expense._id);
                          window.location.reload();
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ================= Mobile Cards ================= */}
        <div className="sm:hidden space-y-2">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500">No expenses found.</p>
          ) : (
            filtered.map((expense) => (
              <div
                key={expense._id}
                className="p-3 border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{expense.title}</span>
                  <span className="text-gray-500">{formatDate(expense.date)}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-gray-700">{expense.category}</span>
                  <span className="font-medium tabular-nums">
                    ₹{Number(expense.amount).toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    className="bg-violet-950 text-white px-3 py-1 rounded hover:opacity-95 transition"
                    onClick={() => 
                      handleEditClick(expense)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    onClick={async () => {
                      await deleteExpense(expense._id);
                      window.location.reload();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ================= Modal for Editing ================= */}
      {editingExpense && (
        <div className="fixed inset-0  bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white space-y-4 p-6 rounded-2xl shadow-xl w-full max-w-lg">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-bold">Edit Expense</h1>
              <span
                className="cursor-pointer text-gray-500 hover:text-gray-800 text-xl font-bold"
                onClick={() => setEditingExpense(false)}
              >
                ×
            </span>
            </div>
            <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-3">
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
                  onClick={`/users/${user.name}/dashboard`}
                  className="bg-violet-950 font-semibold flex items-center justify-center text-white rounded px-4 py-2 hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

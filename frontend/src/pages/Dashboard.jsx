import {  useEffect, useState } from "react";
import { motion } from "framer-motion";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseSummary from "../components/ExpenseSummary";
import ChartComponent from "../components/ChartComponent";
import { getExpenses } from "../services/expenseServices";
import { useAuth } from "../context/AuthContext";

/**
 * Animated Dashboard Component
 * ----------------------------
 * - Fetches and displays expense data
 * - Animated entry for sections
 * - Responsive layout for mobile & desktop
 **/
export default function Dashboard() {
  const { user, logout } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch latest expenses from API
  const refresh = async () => {
    try {
      setLoading(true);
      const data = await getExpenses();
      setExpenses(data);
    } catch (e) {
      alert(e?.response?.data?.message || "Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <motion.div
      className=" mx-auto p-4 space-y-4 overflow-y-scroll scrollbar-none bg-gradient-to-b from-expense-purpleLight via-purple-200 to-expense-purpleLight"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Dashboard Header */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold">Dashboard</h1>

        {/* User info */}
        <div className="flex flex-col items-center sm:items-end">
          <p className="text-sm text-gray-600">
            Logged in as <span className="font-bold">{user?.email}</span>
          </p>
          <p
            onClick={logout}
            className="font-bold text-sm text-red-500 cursor-pointer hover:underline"
          >
            Log Out
          </p>
        </div>
      </motion.div>

      {/* Greeting */}
      <motion.h2
        className="font-bold text-xl sm:text-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        👋🏻 Hiiiii {user?.name}!!!
      </motion.h2>

      {/* Expense Form */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <ExpenseForm onAdded={refresh} />
      </motion.div>

      {/* Loading or Data */}
      {loading ? (
        <motion.div
          className="p-4 bg-white rounded-2xl shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loading...
        </motion.div>
      ) : (
        <>
          {/* Expense List + Summary */}
          <motion.div
            className="grid md:grid-cols-2 "
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ExpenseList expenses={expenses} />
            <ExpenseSummary expenses={expenses} />
          </motion.div>

          {/* Charts */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ChartComponent expenses={expenses} />
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

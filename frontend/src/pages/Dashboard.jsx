import { use, useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseSummary from "../components/ExpenseSummary";
import ChartComponent from "../components/ChartComponent";
import { getExpenses } from "../services/expenseServices";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const {logout} = useAuth();


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
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-bold">Dashboard</h1>
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-600">Logged in as <span className="font-bold">{user?.email}</span></p>
          <p onClick={logout} className="font-bold text-sm text-gray-600"><span onClick={logout} className="cursor-pointer">LogOut</span></p>
        </div>
      </div>

      <h1 className="font-bold text-2xl">👋🏻 Hiiiii {user?.name}!!! </h1>

      <ExpenseForm onAdded={refresh} />

      {loading ? (
        <div className="p-4 bg-white rounded-2xl shadow">Loading...</div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <ExpenseList expenses={expenses} />
            <ExpenseSummary expenses={expenses} />
          </div>
          <ChartComponent expenses={expenses} />
        </>
      )}
    </div>
  );
}

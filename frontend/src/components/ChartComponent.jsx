import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useMemo, useState } from "react";

export default function ChartComponent({ expenses = [] }) {
  const data = useMemo(() => {
    const totals = expenses.reduce((acc, curr) => {
      const key = curr.category?.trim() || "Uncategorized";
      acc[key] = (acc[key] || 0) + Number(curr.amount || 0);
      return acc;
    }, {});
    return Object.entries(totals).map(([category, total]) => ({
      category,
      total,
    }));
  }, [expenses]);

  const [view, setView] = useState("bar"); // 'bar' or 'pie'

  if (!data.length) {
    return (
      <div className="p-4 bg-white rounded-2xl shadow">
        <h2 className="text-lg font-bold mb-3">Spending Chart</h2>
        <p>No data to visualize yet.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-2xl shadow">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold">Spending Chart</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setView("bar")}
            className={`px-3 py-1 rounded border ${view === "bar" ? "bg-gray-900 text-white" : "bg-white"}`}
          >
            Bar
          </button>
          <button
            onClick={() => setView("pie")}
            className={`px-3 py-1 rounded border ${view === "pie" ? "bg-gray-900 text-white" : "bg-white"}`}
          >
            Pie
          </button>
        </div>
      </div>

      {view === "bar" ? (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" name="Total Spend" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie data={data} dataKey="total" nameKey="category" cx="50%" cy="50%" outerRadius={110} label>
                {data.map((_, idx) => <Cell key={idx} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

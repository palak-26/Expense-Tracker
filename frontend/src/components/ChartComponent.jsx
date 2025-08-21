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

/**
 * ChartComponent
 *
 * Displays expense data as either a Bar Chart or Pie Chart using Recharts.
 * Allows switching between chart types via buttons.
 *
 * Props:
 * - expenses: Array of expense objects (each having category & amount)
 */
export default function ChartComponent({ expenses = [] }) {
  /**
   * Transform `expenses` into a chart-friendly format.
   * Groups expenses by category and sums their amounts.
   */
  const data = useMemo(() => {
    const totals = expenses.reduce((acc, curr) => {
      const key = curr.category?.trim() || "Uncategorized"; // Default if category is missing
      acc[key] = (acc[key] || 0) + Number(curr.amount || 0);
      return acc;
    }, {});
    // Convert object to array: [{ category, total }]
    return Object.entries(totals).map(([category, total]) => ({
      category,
      total,
    }));
  }, [expenses]);

  /**
   * Color palette for both Bar and Pie charts.
   * Loops through if there are more categories than colors.
   */
  const COLORS = [
    "#210F37",
    "#065084",
    "#0F828C",
    "#78B9B5",
    "#4F1C51",
    "#064232"
  ];

  // State for toggling between Bar and Pie views
  const [view, setView] = useState("bar"); // 'bar' or 'pie'

  /**
   * If no data, show a placeholder message.
   */
  if (!data.length) {
    return (
      <div className="p-4 rounded-2xl shadow">
        <h2 className="text-lg font-bold mb-3">Spending Chart</h2>
        <p>No data to visualize yet.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-expense-purpleLight/60 rounded-2xl shadow">
      
      {/* Header with toggle buttons */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold">Spending Chart</h2>
        <div className="flex gap-2">
          {/* Switch to Bar Chart */}
          <button
            onClick={() => setView("bar")}
            className={`px-3 py-1 rounded border ${
              view === "bar"
                ? "bg-violet-950 font-semibold text-white"
                : "bg-white"
            }`}
          >
            Bar
          </button>
          {/* Switch to Pie Chart */}
          <button
            onClick={() => setView("pie")}
            className={`px-3 py-1 rounded border ${
              view === "pie"
                ? "bg-violet-950 font-semibold text-white"
                : "bg-white"
            }`}
          >
            Pie
          </button>
        </div>
      </div>

      {/* Chart Rendering */}
      {view === "bar" ? (
        // Bar Chart View
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" name="Total Spend">
                {data.map((_, idx) => (
                  <Cell
                    key={`bar-${idx}`}
                    fill={COLORS[idx % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        // Pie Chart View
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie
                data={data}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
              >
                {data.map((_, idx) => (
                  <Cell
                    key={`pie-${idx}`}
                    fill={COLORS[idx % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

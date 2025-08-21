/**
 * ExpenseSummary Component
 *
 * Props:
 * - expenses: Array of expense objects [{ category, amount, ... }]
 *
 * Purpose:
 * - Summarizes expenses by category.
 * - Displays total per category and an overall total.
 * - Shows a "No data" message if there are no expenses.
 */

export default function ExpenseSummary({ expenses = [] }) {
  // Group and sum expenses by category
  const totals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount || 0);
    return acc;
  }, {});

  // Calculate grand total of all categories
  const overall = Object.values(totals).reduce((a, b) => a + b, 0);

  return (
    <div
      className="
        p-4 sm:p-6 
        bg-expense-purpleLight/60 
        rounded-2xl 
        shadow 
        w-full 
        max-w-md 
        mx-auto
      "
    >
      {/* Title */}
      <h2 className="text-lg font-bold mb-3">Summary</h2>

      {/* If no data, show placeholder */}
      {Object.keys(totals).length === 0 ? (
        <p className="text-sm text-gray-600">No data to summarize.</p>
      ) : (
        <ul className="space-y-1 text-sm sm:text-base">
          {/* Show category-wise totals */}
          {Object.entries(totals).map(([cat, total]) => (
            <li
              key={cat}
              className="flex justify-between border-b border-gray-300 pb-1"
            >
              <span className="font-medium">{cat}</span>
              <span className="tabular-nums font-medium">
                ₹{total.toLocaleString()}
              </span>
            </li>
          ))}

          {/* Show overall total */}
          <li className="flex justify-between border-t pt-2 mt-2 text-base sm:text-lg">
            <span className="font-semibold">Total</span>
            <span className="tabular-nums font-semibold">
              ₹{overall}
            </span>
          </li>
        </ul>
      )}
    </div>
  );
}

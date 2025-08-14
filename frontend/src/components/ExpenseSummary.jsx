export default function ExpenseSummary({ expenses = [] }) {
  const totals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount || 0);
    return acc;
  }, {});
  const overall = Object.values(totals).reduce((a, b) => a + b, 0);

  return (
    <div className="p-4 bg-expense-purpleLight/60 rounded-2xl shadow">
      <h2 className="text-lg font-bold mb-3">Summary</h2>
      {Object.keys(totals).length === 0 ? (
        <p className="text-sm text-gray-600">No data to summarize.</p>
      ) : (
        <ul className="space-y-1">
          {Object.entries(totals).map(([cat, total]) => (
            <li key={cat} className="flex justify-between">
              <span>{cat}</span>
              <span className="tabular-nums">₹{total.toLocaleString()}</span>
            </li>
          ))}
          <li className="flex justify-between border-t pt-2 mt-2">
            <span className="font-semibold">Total</span>
            <span className="tabular-nums font-semibold">₹{overall.toLocaleString()}</span>
          </li>
        </ul>
      )}
    </div>
  );
}

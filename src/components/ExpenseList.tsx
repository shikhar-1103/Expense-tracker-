import { format } from 'date-fns';

type Expense = {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
};

export default function ExpenseList({ expenses, isLoading, error }: { expenses: Expense[], isLoading: boolean, error: any }) {
  if (error) return <div className="p-8 text-center text-red-500 bg-white rounded-xl border border-gray-200 shadow-sm">Failed to load expenses.</div>;
  if (isLoading) return <div className="p-8 text-center text-gray-500 bg-white rounded-xl border border-gray-200 shadow-sm">Loading expenses...</div>;
  
  if (expenses.length === 0) {
    return (
      <div className="p-12 text-center text-gray-500 bg-white rounded-xl border border-gray-200 shadow-sm">
        <p className="text-lg font-medium text-gray-900 mb-1">No expenses found</p>
        <p>Try adjusting your filters or add a new expense.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
            <tr>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Description</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {format(new Date(expense.date), 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-gray-900">{expense.description}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    {expense.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-gray-900">
                  ${(expense.amount / 100).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type Expense = {
  amount: number;
};

export default function ExpenseSummary({ expenses, isLoading }: { expenses: Expense[], isLoading: boolean }) {
  if (isLoading) {
    return <div className="text-right"><div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div></div>;
  }

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="text-right">
      <span className="text-sm text-gray-500 mr-2">Total:</span>
      <span className="text-2xl font-bold text-gray-900">
        ${(totalAmount / 100).toFixed(2)}
      </span>
    </div>
  );
}

import ExpenseDashboard from '@/components/ExpenseDashboard';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Expense Tracker</h1>
          <p className="text-gray-500 mt-1">Manage your finances with ease.</p>
        </header>

        <ExpenseDashboard />
      </div>
    </main>
  );
}

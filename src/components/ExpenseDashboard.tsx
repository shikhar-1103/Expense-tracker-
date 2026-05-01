'use client';

import { useState } from 'react';
import useSWR from 'swr';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import ExpenseSummary from './ExpenseSummary';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ExpenseDashboard() {
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('date_desc');

  const queryParams = new URLSearchParams();
  if (category) queryParams.set('category', category);
  if (sort) queryParams.set('sort', sort);

  const { data: expenses, error, mutate } = useSWR(`/api/expenses?${queryParams.toString()}`, fetcher);

  const handleExpenseAdded = () => {
    mutate(); // Revalidate SWR cache
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <ExpenseForm onExpenseAdded={handleExpenseAdded} />
      </div>
      <div className="md:col-span-2 space-y-6">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="flex gap-4 w-full md:w-auto">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm"
            >
              <option value="">All Categories</option>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Other">Other</option>
            </select>
            
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm"
            >
              <option value="date_desc">Newest First</option>
              <option value="date_asc">Oldest First</option>
            </select>
          </div>
          
          <ExpenseSummary expenses={expenses || []} isLoading={!expenses && !error} />
        </div>

        <ExpenseList expenses={expenses || []} isLoading={!expenses && !error} error={error} />
      </div>
    </div>
  );
}

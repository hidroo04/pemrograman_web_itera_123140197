import React from 'react';
import StatCard from '../components/StatCard';
import { useBookStats } from '../hooks/useBookStats';

export default function Stats() {
  const { totalBooks, ownedCount, readCount, toBuyCount } = useBookStats();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">
        Statistik Buku
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard title="Total Buku" value={totalBooks} icon="total" />
        <StatCard title="Buku Dimiliki" value={ownedCount} icon="owned" />
        <StatCard title="Buku Dibaca" value={readCount} icon="read" />
        <StatCard title="Akan Dibeli" value={toBuyCount} icon="to-buy" />
      </div>
    </div>
  );
}
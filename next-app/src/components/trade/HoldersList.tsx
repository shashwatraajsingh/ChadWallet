'use client';

import { useEffect, useState } from 'react';

interface Holder {
  owner: string;
  amount: number;
  uiAmount: number;
  percentage?: number;
}

export default function HoldersList({ tokenAddress }: { tokenAddress: string }) {
  const [holders, setHolders] = useState<Holder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHolders() {
      try {
        setLoading(true);
        const res = await fetch(`/api/birdeye/holders?address=${tokenAddress}`);
        const data = await res.json();
        
        if (data.success && data.data?.items) {
          // Assume total supply is sum of top 50 for percentage calculation 
          // (if Birdeye doesn't return total supply easily here)
          const items = data.data.items.slice(0, 50);
          const total = items.reduce((acc: number, val: any) => acc + val.ui_amount, 0);
          
          setHolders(items.map((item: any) => ({
            owner: item.owner,
            amount: item.amount,
            uiAmount: item.ui_amount,
            percentage: (item.ui_amount / total) * 100
          })));
        }
      } catch (error) {
        console.error('Error fetching holders:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchHolders();
  }, [tokenAddress]);

  return (
    <div className="flex-1 bg-bg-card border border-bg-card-border rounded-xl flex flex-col overflow-hidden">
      <div className="p-3 border-b border-bg-card-border">
        <h3 className="font-semibold text-sm">Top Holders</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-bg-card/80 z-10">
             <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-accent-cyan"></div>
          </div>
        )}
        
        <table className="w-full text-left text-sm">
          <thead className="text-text-secondary text-xs sticky top-0 bg-bg-card">
            <tr>
              <th className="pb-2 font-normal">Address</th>
              <th className="pb-2 font-normal text-right">Amount</th>
              <th className="pb-2 font-normal text-right">%</th>
            </tr>
          </thead>
          <tbody>
            {holders.map((holder, idx) => (
              <tr key={holder.owner} className="hover:bg-white/5 transition-colors">
                <td className="py-1.5 text-text-primary font-mono text-xs">
                  {holder.owner.slice(0, 4)}...{holder.owner.slice(-4)}
                </td>
                <td className="py-1.5 text-right text-text-secondary">
                  {holder.uiAmount >= 1000 
                    ? (holder.uiAmount / 1000).toFixed(1) + 'k' 
                    : holder.uiAmount.toFixed(2)}
                </td>
                <td className="py-1.5 text-right text-text-primary">
                  {holder.percentage?.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

interface Trade {
  id: string;
  type: 'buy' | 'sell';
  price: number;
  amount: number;
  time: number;
}

export default function LiveTrades({ tokenAddress }: { tokenAddress: string }) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Note: To use Birdeye Websockets in production securely without exposing the key,
    // we would proxy the WS connection through a Next.js custom server or API route
    // using something like `ws` package. For this client-side demo, we simulate
    // the live feed to avoid exposing the X-API-KEY directly in the browser WebSocket URL.
    
    // Simulating WebSocket connection
    setConnected(true);
    
    const interval = setInterval(() => {
      const isBuy = Math.random() > 0.5;
      const newTrade: Trade = {
        id: Math.random().toString(36).substr(2, 9),
        type: isBuy ? 'buy' : 'sell',
        price: Math.random() * 100, // Placeholder price
        amount: Math.random() * 1000,
        time: Date.now(),
      };
      
      setTrades((prev) => [newTrade, ...prev].slice(0, 50));
    }, 2500);

    return () => {
      clearInterval(interval);
      setConnected(false);
    };
  }, [tokenAddress]);

  return (
    <div className="flex-1 bg-bg-card border border-bg-card-border rounded-xl flex flex-col overflow-hidden">
      <div className="p-3 border-b border-bg-card-border flex items-center justify-between">
        <h3 className="font-semibold text-sm">Live Trades</h3>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${connected ? 'bg-accent-green' : 'bg-accent-red'} animate-pulse`} />
          <span className="text-xs text-text-secondary">{connected ? 'Live' : 'Connecting...'}</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
        <table className="w-full text-left text-sm">
          <thead className="text-text-secondary text-xs sticky top-0 bg-bg-card">
            <tr>
              <th className="pb-2 font-normal">Price</th>
              <th className="pb-2 font-normal text-right">Amount</th>
              <th className="pb-2 font-normal text-right">Time</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade.id} className="hover:bg-white/5 transition-colors">
                <td className={`py-1.5 ${trade.type === 'buy' ? 'text-accent-green' : 'text-accent-red'}`}>
                  ${trade.price.toFixed(4)}
                </td>
                <td className="py-1.5 text-right text-text-primary">
                  {trade.amount.toFixed(2)}
                </td>
                <td className="py-1.5 text-right text-text-secondary text-xs">
                  {new Date(trade.time).toLocaleTimeString([], { hour12: false })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

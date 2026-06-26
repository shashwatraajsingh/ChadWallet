'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TrendingSidebar() {
  const [tokens, setTokens] = useState<any[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchTrending() {
      try {
        const res = await fetch('/api/birdeye/trending');
        const data = await res.json();
        if (data.success && data.data?.tokens) {
          setTokens(data.data.tokens.slice(0, 15));
        }
      } catch (error) {
        console.error('Error fetching trending tokens for sidebar:', error);
      }
    }
    fetchTrending();
  }, []);

  return (
    <div className="hidden lg:flex flex-col w-64 bg-bg-card border border-bg-card-border rounded-xl overflow-hidden h-full">
      <div className="p-4 border-b border-bg-card-border">
        <h2 className="font-semibold text-text-primary">Trending Hot 15</h2>
      </div>
      <div className="overflow-y-auto flex-1 p-2 space-y-1 custom-scrollbar">
        {tokens.map((token) => {
          const isActive = pathname.includes(token.address);
          return (
            <Link
              key={token.address}
              href={`/trade/${token.address}`}
              className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                isActive ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                {token.logoURI ? (
                  <img src={token.logoURI} alt={token.symbol} className="w-6 h-6 rounded-full" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-white/10" />
                )}
                <div>
                  <div className="text-sm font-semibold text-text-primary leading-tight">
                    {token.symbol}
                  </div>
                  <div className="text-[10px] text-text-secondary leading-tight truncate w-20">
                    {token.name}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-text-primary leading-tight">
                  ${token.price < 0.01 ? token.price.toFixed(6) : token.price.toFixed(2)}
                </div>
                <div
                  className={`text-[11px] leading-tight ${
                    token.v24hChangePercent >= 0 ? 'text-accent-green' : 'text-accent-red'
                  }`}
                >
                  {token.v24hChangePercent >= 0 ? '+' : ''}
                  {token.v24hChangePercent?.toFixed(2)}%
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

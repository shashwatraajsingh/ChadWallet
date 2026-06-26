'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Token {
  address: string;
  symbol: string;
  name: string;
  price: number;
  v24hChangePercent: number;
  logoURI?: string;
}

export default function TokenMarquee() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const res = await fetch('/api/birdeye/trending');
        const data = await res.json();
        
        if (data.success && data.data && data.data.tokens) {
          setTokens(data.data.tokens);
        }
      } catch (error) {
        console.error('Error fetching trending tokens:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTrending();
  }, []);

  if (loading || tokens.length === 0) {
    return (
      <div className="h-10 bg-bg-secondary border-y border-white/5 flex items-center justify-center overflow-hidden whitespace-nowrap">
        <span className="text-text-secondary text-sm">Loading market data...</span>
      </div>
    );
  }

  // Duplicate tokens for seamless marquee scroll
  const marqueeItems = [...tokens, ...tokens, ...tokens];

  return (
    <div className="h-10 bg-bg-secondary border-y border-white/5 flex items-center overflow-hidden relative">
      {/* CSS Animation defined in globals.css */}
      <div className="flex items-center gap-8 animate-marquee whitespace-nowrap will-change-transform">
        {marqueeItems.map((token, index) => (
          <Link
            key={`${token.address}-${index}`}
            href={`/trade/${token.address}`}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            {token.logoURI ? (
              <img src={token.logoURI} alt={token.symbol} className="w-4 h-4 rounded-full" />
            ) : (
              <div className="w-4 h-4 rounded-full bg-white/10" />
            )}
            <span className="font-semibold text-text-primary text-sm">{token.symbol}</span>
            <span className="text-text-secondary text-sm">
              ${token.price < 0.01 ? token.price.toFixed(6) : token.price.toFixed(2)}
            </span>
            <span
              className={`text-sm ${
                token.v24hChangePercent >= 0 ? 'text-accent-green' : 'text-accent-red'
              }`}
            >
              {token.v24hChangePercent >= 0 ? '+' : ''}
              {token.v24hChangePercent?.toFixed(2) || '0.00'}%
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

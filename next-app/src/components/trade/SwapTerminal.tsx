'use client';

import { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { Settings, ArrowDownUp } from 'lucide-react';

export default function SwapTerminal({ tokenAddress }: { tokenAddress: string }) {
  const { authenticated, login } = usePrivy();
  const [isBuy, setIsBuy] = useState(true);
  const [amount, setAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');

  const handleSwap = () => {
    if (!authenticated) {
      login();
      return;
    }
    // Swap execution logic would go here
    console.log(`Executing swap: ${isBuy ? 'Buy' : 'Sell'} ${amount} for ${tokenAddress}`);
  };

  return (
    <div className="w-full lg:w-80 flex flex-col gap-4 h-full">
      {/* Swap UI */}
      <div className="bg-bg-card border border-bg-card-border rounded-xl p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 bg-bg-secondary p-1 rounded-lg">
            <button
              onClick={() => setIsBuy(true)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                isBuy ? 'bg-accent-green text-white' : 'text-text-secondary hover:text-white'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setIsBuy(false)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                !isBuy ? 'bg-accent-red text-white' : 'text-text-secondary hover:text-white'
              }`}
            >
              Sell
            </button>
          </div>
          <button className="text-text-secondary hover:text-white transition-colors">
            <Settings size={18} />
          </button>
        </div>

        <div className="bg-bg-secondary rounded-xl p-3 border border-white/5 focus-within:border-accent-purple/50 transition-colors">
          <div className="flex justify-between text-xs text-text-secondary mb-2">
            <span>You pay</span>
            <span>Balance: 0.00 {isBuy ? 'SOL' : 'TOKEN'}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent w-full text-2xl font-semibold outline-none text-text-primary"
            />
            <div className="flex items-center gap-1 bg-bg-card px-2 py-1 rounded-lg">
              <span className="font-semibold text-sm">{isBuy ? 'SOL' : 'TOKEN'}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center -my-2 relative z-10">
          <button 
            onClick={() => setIsBuy(!isBuy)}
            className="bg-bg-card border border-bg-card-border p-2 rounded-full hover:border-accent-purple/50 transition-colors"
          >
            <ArrowDownUp size={16} className="text-text-secondary" />
          </button>
        </div>

        <div className="bg-bg-secondary rounded-xl p-3 border border-white/5">
          <div className="flex justify-between text-xs text-text-secondary mb-2">
            <span>You receive</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <input
              type="number"
              placeholder="0.00"
              readOnly
              className="bg-transparent w-full text-2xl font-semibold outline-none text-text-secondary cursor-not-allowed"
            />
            <div className="flex items-center gap-1 bg-bg-card px-2 py-1 rounded-lg">
              <span className="font-semibold text-sm">{!isBuy ? 'SOL' : 'TOKEN'}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between text-xs text-text-secondary px-1">
          <span>Slippage</span>
          <span>{slippage}%</span>
        </div>

        <button
          onClick={handleSwap}
          className={`w-full py-3 rounded-xl font-bold text-white transition-opacity hover:opacity-90 ${
            !authenticated 
              ? 'bg-accent-purple' 
              : isBuy 
                ? 'bg-accent-green' 
                : 'bg-accent-red'
          }`}
        >
          {!authenticated ? 'Connect Wallet to Trade' : isBuy ? 'Quick Buy' : 'Quick Sell'}
        </button>
      </div>

      {/* Position Summary */}
      <div className="bg-bg-card border border-bg-card-border rounded-xl p-4 flex-1">
        <h3 className="font-semibold text-sm mb-4">Your Position</h3>
        {!authenticated ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-text-secondary text-sm px-4">
            <p>Connect your wallet to see your active positions and history.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Tokens</span>
              <span className="font-semibold text-text-primary">0.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Value</span>
              <span className="font-semibold text-text-primary">$0.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">PnL</span>
              <span className="font-semibold text-text-secondary">--</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

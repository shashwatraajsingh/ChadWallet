'use client';

import { PrivyProvider } from '@privy-io/react-auth';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || 'your_privy_app_id_here'}
      config={{
        loginMethods: ['email', 'wallet', 'apple', 'google'],
        appearance: {
          theme: 'dark',
          accentColor: '#676FFF',
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}

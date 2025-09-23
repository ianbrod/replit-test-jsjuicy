import { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';

interface SubscriptionContextType {
  tier: string;
  isPro: boolean;
  isEnterprise: boolean;
  canAccess: (feature: string) => boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const tier = user?.tier || 'free';

  const isPro = tier === 'pro';
  const isEnterprise = tier === 'enterprise';

  const canAccess = (feature: string): boolean => {
    switch (feature) {
      case 'unlimited-opportunities':
      case 'advanced-filters':
      case 'resume-templates':
        return isPro || isEnterprise;
      case 'custom-branding':
      case 'team-management':
        return isEnterprise;
      default:
        return true;
    }
  };

  return (
    <SubscriptionContext.Provider value={{ tier, isPro, isEnterprise, canAccess }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}

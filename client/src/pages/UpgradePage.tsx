import { useState } from 'react';
import { useLocation } from 'wouter';
import { Target, ArrowLeft, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PricingCard from '../components/PricingCard';
import { PricingTier } from '../types';
import { useAuth } from '../hooks/useAuth';

const PRICING_TIERS: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: '/month',
    description: 'Basic job search tools',
    current: true,
    features: [
      'Unlimited job applications',
      'AI-powered resume builder',
      'Personalized job recommendations',
      'Personalized job search searches',
      'Access to job search resources',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 49,
    period: ' USD/month',
    description: 'More access to advanced intelligence',
    popular: true,
    features: [
      'GPT-5 with features, plus',
      'Advanced messaging and filters',
      'Expanded and faster image creation',
      'Expanded memory and context',
      'Expanded deep research and analysis',
      'Projects, optimization of apps/workflows',
      'Sora video generation',
      'Codes agent',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 0, // Custom pricing
    period: '',
    description: 'Tailored solutions',
    features: [
      'GPT-5 with advanced planning task support',
      'Unlimited messages and webhooks',
      'Unlimited and faster image creation',
      'Maximum memory and context',
      'Maximum deep research and agent mode',
      'Integrated projects, tasks, and custom GPTs',
      'Expanded Sora video generation',
      'Expanded Codes agent',
    ],
  },
];

export default function UpgradePage() {
  const [selectedPlan, setSelectedPlan] = useState<'personal' | 'business'>('personal');
  const [, navigate] = useLocation();
  const { user } = useAuth();

  const handleUpgrade = (tierName: string) => {
    console.log('Upgrading to:', tierName);
    // TODO: Implement payment flow
    if (tierName === 'Enterprise') {
      // Open contact form or redirect to sales
      window.location.href = 'mailto:sales@jobsniper.com';
    } else {
      // Handle Pro upgrade
      alert(`Upgrading to ${tierName} - Payment integration coming soon!`);
    }
  };

  // Update current tier based on user
  const tiersWithCurrentStatus = PRICING_TIERS.map(tier => ({
    ...tier,
    current: tier.name.toLowerCase() === (user?.tier || 'free'),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-2">
              <Target className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">JobSniper</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="upgrade-title">
            Upgrade your plan
          </h1>
          <p className="text-xl text-muted-foreground" data-testid="upgrade-subtitle">
            Choose the plan that fits your career goals
          </p>
        </div>

        {/* Plan Toggle */}
        <div className="flex justify-center mb-12" data-testid="plan-toggle">
          <div className="bg-muted rounded-lg p-1 flex">
            <Button
              variant={selectedPlan === 'personal' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedPlan('personal')}
              data-testid="personal-plan-tab"
            >
              Personal
            </Button>
            <Button
              variant={selectedPlan === 'business' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedPlan('business')}
              data-testid="business-plan-tab"
            >
              Business
            </Button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12" data-testid="pricing-cards">
          {tiersWithCurrentStatus.map((tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              onUpgrade={handleUpgrade}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="mb-4">
            <Building className="w-8 h-8 text-muted-foreground mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2" data-testid="enterprise-cta-title">
            Need more capabilities for your business?
          </h3>
          <p className="text-muted-foreground mb-4" data-testid="enterprise-cta-description">
            See{' '}
            <Button variant="link" className="p-0 h-auto" data-testid="enterprise-link">
              JobSniper Enterprise
            </Button>
          </p>
          
          <Button 
            variant="outline"
            onClick={() => navigate('/dashboard')}
            data-testid="back-to-dashboard-button"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

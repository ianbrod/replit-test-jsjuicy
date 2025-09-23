import { Check, Star } from 'lucide-react';
import { PricingTier } from '../types';
import { Button } from './ui/button';

interface PricingCardProps {
  tier: PricingTier;
  onUpgrade?: (tierName: string) => void;
}

export default function PricingCard({ tier, onUpgrade }: PricingCardProps) {
  const isPro = tier.name === 'Pro';
  
  return (
    <div className={`tier-card rounded-xl p-8 relative ${
      isPro ? 'tier-popular' : 'bg-card border border-border'
    }`} data-testid={`pricing-card-${tier.id}`}>
      
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center">
            <Star className="w-3 h-3 mr-1" />
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h2 className={`text-2xl font-bold mb-2 ${
          isPro ? 'text-white' : 'text-foreground'
        }`} data-testid={`tier-name-${tier.id}`}>
          {tier.name}
        </h2>
        
        <div className="mb-4">
          {tier.price === 0 ? (
            <span className={`text-4xl font-bold ${
              isPro ? 'text-white' : 'text-foreground'
            }`} data-testid={`tier-price-${tier.id}`}>
              Free
            </span>
          ) : tier.name === 'Enterprise' ? (
            <span className={`text-4xl font-bold ${
              isPro ? 'text-white' : 'text-foreground'
            }`} data-testid={`tier-price-${tier.id}`}>
              Custom
            </span>
          ) : (
            <>
              <span className={`text-4xl font-bold ${
                isPro ? 'text-white' : 'text-foreground'
              }`} data-testid={`tier-price-${tier.id}`}>
                {tier.price}
              </span>
              <span className={`text-lg ${
                isPro ? 'text-white/80' : 'text-muted-foreground'
              }`}>
                {tier.period}
              </span>
            </>
          )}
        </div>
        
        <p className={`${
          isPro ? 'text-white/80' : 'text-muted-foreground'
        }`} data-testid={`tier-description-${tier.id}`}>
          {tier.description}
        </p>
      </div>

      <div className="mb-8">
        {tier.current ? (
          <Button 
            variant="secondary" 
            className="w-full" 
            disabled
            data-testid={`current-plan-button-${tier.id}`}
          >
            Your current plan
          </Button>
        ) : tier.name === 'Enterprise' ? (
          <Button 
            variant={isPro ? "secondary" : "outline"}
            className="w-full"
            onClick={() => onUpgrade?.(tier.name)}
            data-testid={`contact-sales-button-${tier.id}`}
          >
            Contact Sales
          </Button>
        ) : (
          <Button 
            variant={isPro ? "secondary" : "default"}
            className={`w-full ${
              isPro ? 'bg-slate-800 text-white hover:bg-slate-700' : ''
            }`}
            onClick={() => onUpgrade?.(tier.name)}
            data-testid={`upgrade-button-${tier.id}`}
          >
            {tier.name === 'Pro' ? 'Upgrade Pro' : `Upgrade to ${tier.name}`}
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {tier.features.map((feature, index) => (
          <div key={index} className="flex items-start" data-testid={`feature-${tier.id}-${index}`}>
            <Check className={`w-4 h-4 mt-1 mr-3 ${
              isPro ? 'text-slate-800' : 'text-primary'
            }`} />
            <span className={`text-sm ${
              isPro ? 'text-slate-800' : 'text-foreground'
            }`}>
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

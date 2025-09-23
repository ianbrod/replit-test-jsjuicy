import { useState } from 'react';
import { OpportunityWithMatch } from '@shared/schema';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { useSubscription } from '../contexts/SubscriptionContext';

interface OpportunityTableProps {
  opportunities: OpportunityWithMatch[];
  onUpgrade?: () => void;
}

function getScoreLevel(score: number): 'high' | 'medium' | 'low' {
  if (score >= 80) return 'high';
  if (score >= 60) return 'medium';
  return 'low';
}

export default function OpportunityTable({ opportunities, onUpgrade }: OpportunityTableProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { canAccess } = useSubscription();
  const canAccessAll = canAccess('unlimited-opportunities');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const visibleIds = opportunities.slice(0, canAccessAll ? opportunities.length : 3).map(opp => opp.id);
      setSelectedItems(visibleIds);
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
    }
  };

  const visibleOpportunities = canAccessAll ? opportunities : opportunities.slice(0, 3);
  const blurredOpportunities = canAccessAll ? [] : opportunities.slice(3);

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full" data-testid="opportunities-table">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4 font-medium text-foreground">
                <Checkbox 
                  checked={selectedItems.length === visibleOpportunities.length && visibleOpportunities.length > 0}
                  onCheckedChange={handleSelectAll}
                  data-testid="select-all-checkbox"
                />
                <span className="ml-2">Job Title</span>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Company</th>
              <th className="text-left p-4 font-medium text-foreground">Location</th>
              <th className="text-left p-4 font-medium text-foreground">Match</th>
              <th className="text-left p-4 font-medium text-foreground">Intensity</th>
              <th className="text-left p-4 font-medium text-foreground">Perk</th>
              <th className="text-left p-4 font-medium text-foreground">Optics</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {visibleOpportunities.map((job) => (
              <tr key={job.id} className="hover:bg-muted/10 transition-colors cursor-pointer"
                  data-testid={`opportunity-row-${job.id}`}>
                <td className="p-4">
                  <div className="flex items-center">
                    <Checkbox 
                      checked={selectedItems.includes(job.id)}
                      onCheckedChange={(checked) => handleSelectItem(job.id, checked as boolean)}
                      data-testid={`select-checkbox-${job.id}`}
                    />
                    <span className="ml-3 font-medium text-foreground" data-testid={`job-title-${job.id}`}>
                      {job.title}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-muted-foreground" data-testid={`company-${job.id}`}>
                  {job.company}
                </td>
                <td className="p-4 text-muted-foreground" data-testid={`location-${job.id}`}>
                  {job.location}
                </td>
                <td className="p-4">
                  <span className={`match-score match-${getScoreLevel(job.matchScore)}`} data-testid={`match-${job.id}`}>
                    {job.matchScore}%
                  </span>
                </td>
                <td className="p-4">
                  <span className={`match-score match-${getScoreLevel(job.intensityScore)}`} data-testid={`intensity-${job.id}`}>
                    {job.intensityScore}%
                  </span>
                </td>
                <td className="p-4">
                  <span className={`match-score match-${getScoreLevel(job.perkScore)}`} data-testid={`perk-${job.id}`}>
                    {job.perkScore}%
                  </span>
                </td>
                <td className="p-4">
                  <span className={`match-score match-${getScoreLevel(job.opticsScore)}`} data-testid={`optics-${job.id}`}>
                    {job.opticsScore}%
                  </span>
                </td>
              </tr>
            ))}
            
            {/* Blurred rows for free tier */}
            {blurredOpportunities.map((job) => (
              <tr key={job.id} className="blur-content hover:bg-muted/10 transition-colors">
                <td className="p-4">
                  <div className="flex items-center">
                    <Checkbox disabled />
                    <span className="ml-3 font-medium text-foreground">{job.title}</span>
                  </div>
                </td>
                <td className="p-4 text-muted-foreground">{job.company}</td>
                <td className="p-4 text-muted-foreground">{job.location}</td>
                <td className="p-4">
                  <span className={`match-score match-${getScoreLevel(job.matchScore)}`}>
                    {job.matchScore}%
                  </span>
                </td>
                <td className="p-4">
                  <span className={`match-score match-${getScoreLevel(job.intensityScore)}`}>
                    {job.intensityScore}%
                  </span>
                </td>
                <td className="p-4">
                  <span className={`match-score match-${getScoreLevel(job.perkScore)}`}>
                    {job.perkScore}%
                  </span>
                </td>
                <td className="p-4">
                  <span className={`match-score match-${getScoreLevel(job.opticsScore)}`}>
                    {job.opticsScore}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upgrade prompt for free tier */}
      {!canAccessAll && (
        <div className="bg-primary/5 border-t border-border p-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Unlock all opportunities and advanced filtering
          </p>
          <Button 
            onClick={onUpgrade}
            data-testid="upgrade-to-pro-button"
          >
            Upgrade to Pro
          </Button>
        </div>
      )}
    </div>
  );
}

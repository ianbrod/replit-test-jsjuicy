import { Building } from 'lucide-react';
import { OpportunityWithMatch } from '@shared/schema';
import { Button } from './ui/button';

interface JobCardProps {
  job: OpportunityWithMatch;
  onViewDetails?: (job: OpportunityWithMatch) => void;
}

function getScoreLevel(score: number): 'high' | 'medium' | 'low' {
  if (score >= 80) return 'high';
  if (score >= 60) return 'medium';
  return 'low';
}

export default function JobCard({ job, onViewDetails }: JobCardProps) {
  const scoreLevel = getScoreLevel(job.matchScore);
  
  return (
    <div className="job-card bg-card rounded-lg p-6 border hover:shadow-lg transition-shadow cursor-pointer"
         data-testid={`job-card-${job.id}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
          <Building className="w-6 h-6 text-muted-foreground" />
        </div>
        <span className={`match-score match-${scoreLevel} text-sm font-medium`} data-testid={`match-score-${job.id}`}>
          {job.matchScore}% Match
        </span>
      </div>
      
      <h3 className="font-semibold text-foreground mb-1" data-testid={`job-title-${job.id}`}>
        {job.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4" data-testid={`job-company-${job.id}`}>
        {job.company}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground" data-testid={`job-location-${job.id}`}>
          {job.location}
        </span>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onViewDetails?.(job)}
          data-testid={`view-details-${job.id}`}
        >
          View Details
        </Button>
      </div>
    </div>
  );
}

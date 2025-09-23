export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'modern' | 'creative' | 'executive' | 'technical' | 'minimal' | 'academic';
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  current?: boolean;
}

export interface ActivityItem {
  id: string;
  type: 'application' | 'interview' | 'update';
  title: string;
  timestamp: string;
  description?: string;
}

export interface ScoreType {
  value: number;
  level: 'high' | 'medium' | 'low';
}

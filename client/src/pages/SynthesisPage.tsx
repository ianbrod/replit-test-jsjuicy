import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Bot, Check, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { api } from '../services/api';

interface SynthesisStep {
  id: string;
  label: string;
  completed: boolean;
  loading: boolean;
}

export default function SynthesisPage() {
  const [, navigate] = useLocation();
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState<SynthesisStep[]>([
    { id: 'documents', label: 'Documents processed', completed: true, loading: false },
    { id: 'skills', label: 'Skills extracted', completed: true, loading: false },
    { id: 'profile', label: 'Generating profile...', completed: false, loading: true },
  ]);

  useEffect(() => {
    let progressTimer: NodeJS.Timeout;
    let synthesisTimer: NodeJS.Timeout;

    // Animate progress bar
    progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    // Start profile synthesis
    const synthesizeProfile = async () => {
      try {
        await api.post('/profile/synthesize', {
          data: {
            documents: ['resume.pdf', 'cover-letter.pdf'],
            preferences: 'remote-work',
          },
        });
      } catch (error) {
        console.error('Synthesis failed:', error);
      }
    };

    synthesizeProfile();

    // Complete synthesis after 5 seconds
    synthesisTimer = setTimeout(() => {
      setSteps((prev) =>
        prev.map((step) =>
          step.id === 'profile'
            ? { ...step, completed: true, loading: false }
            : step
        )
      );
      setProgress(100);

      // Navigate to dashboard after animation
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }, 5000);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(synthesisTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Bot className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="synthesis-title">
            Synthesizing Your Profile
          </h1>
          <p className="text-muted-foreground text-lg" data-testid="synthesis-description">
            Our AI is analyzing your materials to create your Master CV. This may take up to 90 seconds.
          </p>
        </div>

        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-4" data-testid="progress-label">
            Analyzing...
          </p>
          <Progress 
            value={progress} 
            className="w-full h-2"
            data-testid="synthesis-progress"
          />
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-3 text-left">
              {steps.map((step) => (
                <div key={step.id} className="flex items-center text-sm" data-testid={`step-${step.id}`}>
                  {step.completed ? (
                    <Check className="w-5 h-5 text-primary mr-3" />
                  ) : step.loading ? (
                    <Loader2 className="w-5 h-5 text-muted-foreground mr-3 animate-spin" />
                  ) : (
                    <div className="w-5 h-5 mr-3" />
                  )}
                  <span className={`${
                    step.completed 
                      ? 'text-foreground font-medium' 
                      : step.loading 
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Mic, MicOff, Play, Square, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

type RecordingState = 'idle' | 'recording' | 'paused' | 'completed';

export default function OnboardingStep2() {
  const [, navigate] = useLocation();
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        setRecordingState('completed');
        
        // Stop all tracks to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setRecordingState('recording');
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to record your story.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetRecording = () => {
    setRecordingState('idle');
    setRecordingTime(0);
    setAudioBlob(null);
    audioChunksRef.current = [];
  };

  const playRecording = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleContinue = async () => {
    setIsProcessing(true);
    
    // Here you would typically upload the audio to the backend
    // For now, we'll simulate processing and move to synthesis
    
    setTimeout(() => {
      navigate('/synthesis');
    }, 1000);
  };

  const handleSkip = () => {
    navigate('/synthesis');
  };

  const getRecordingButtonIcon = () => {
    switch (recordingState) {
      case 'recording':
        return <Square className="w-6 h-6" />;
      case 'completed':
        return <RotateCcw className="w-6 h-6" />;
      default:
        return <Mic className="w-6 h-6" />;
    }
  };

  const getRecordingButtonText = () => {
    switch (recordingState) {
      case 'recording':
        return 'Stop Recording';
      case 'completed':
        return 'Record Again';
      default:
        return 'Start Recording';
    }
  };

  const handleRecordingAction = () => {
    switch (recordingState) {
      case 'idle':
        startRecording();
        break;
      case 'recording':
        stopRecording();
        break;
      case 'completed':
        resetRecording();
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg mx-auto">
        <div className="text-center mb-8">
          <p className="text-sm text-muted-foreground mb-2" data-testid="step-indicator">
            Step 2 of 4
          </p>
          <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="page-title">
            Tell Us Your Story
          </h1>
          <p className="text-muted-foreground text-lg" data-testid="page-description">
            Record a short audio to introduce yourself.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-8 text-center">
            {/* Recording Visualizer */}
            <div className="mb-8">
              <div 
                className={`
                  w-32 h-32 mx-auto rounded-full flex items-center justify-center transition-all duration-300
                  ${recordingState === 'recording' 
                    ? 'bg-red-100 border-4 border-red-300 animate-pulse' 
                    : recordingState === 'completed'
                    ? 'bg-green-100 border-4 border-green-300'
                    : 'bg-primary/10 border-4 border-primary/30'
                  }
                `}
                data-testid="recording-visualizer"
              >
                {recordingState === 'recording' ? (
                  <MicOff className="w-8 h-8 text-red-600" />
                ) : (
                  <Mic className="w-8 h-8 text-primary" />
                )}
              </div>
              
              <div className="mt-4">
                <div className="text-2xl font-mono font-bold text-foreground" data-testid="recording-timer">
                  {formatTime(recordingTime)}
                </div>
                {recordingState === 'recording' && (
                  <p className="text-sm text-muted-foreground mt-1">Recording...</p>
                )}
              </div>
            </div>

            {/* Recording Controls */}
            <div className="space-y-4 mb-6">
              <Button
                onClick={handleRecordingAction}
                size="lg"
                className={`
                  w-full
                  ${recordingState === 'recording' 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : ''
                  }
                `}
                data-testid="recording-action-button"
              >
                {getRecordingButtonIcon()}
                <span className="ml-2">{getRecordingButtonText()}</span>
              </Button>

              {recordingState === 'completed' && (
                <Button
                  variant="outline"
                  onClick={playRecording}
                  className="w-full"
                  data-testid="play-recording-button"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Play Recording
                </Button>
              )}
            </div>

            {/* Tips */}
            <div className="text-left bg-muted/20 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-foreground mb-2">Tips for a great recording:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Speak clearly and at a normal pace</li>
                <li>• Mention your key skills and experience</li>
                <li>• Share what type of role you're seeking</li>
                <li>• Keep it under 2 minutes</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleSkip}
                data-testid="skip-button"
              >
                Skip for now
              </Button>
              
              <Button
                onClick={handleContinue}
                disabled={isProcessing || recordingState === 'recording'}
                data-testid="continue-button"
              >
                {isProcessing ? "Processing..." : "Next Step"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
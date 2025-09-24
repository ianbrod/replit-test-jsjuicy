import { useState, useCallback } from 'react';
import { useLocation } from 'wouter';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

export default function OnboardingStep1() {
  const [, navigate] = useLocation();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const acceptedTypes = ['.pdf', '.doc', '.docx', '.txt', '.rtf'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return;

    const validFiles: UploadedFile[] = [];
    
    Array.from(files).forEach((file) => {
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (!acceptedTypes.includes(fileExtension)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported format. Please use PDF, DOC, DOCX, TXT, or RTF.`,
          variant: "destructive",
        });
        return;
      }
      
      if (file.size > maxFileSize) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the 10MB limit.`,
          variant: "destructive",
        });
        return;
      }

      validFiles.push({
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type: file.type,
        file,
      });
    });

    setUploadedFiles(prev => [...prev, ...validFiles]);
  }, [toast]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleContinue = async () => {
    setIsUploading(true);
    
    // Here you would typically upload files to the backend
    // For now, we'll simulate the upload and move to next step
    
    setTimeout(() => {
      navigate('/onboarding/voice');
    }, 1000);
  };

  const handleSkip = () => {
    navigate('/onboarding/voice');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-sm text-muted-foreground mb-2" data-testid="step-indicator">
            Step 1 of 4
          </p>
          <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="page-title">
            Upload your resume
          </h1>
          <p className="text-muted-foreground text-lg" data-testid="page-description">
            We'll extract your skills and experience to get you started.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-8">
            {/* File Upload Area */}
            <div
              className={`
                border-2 border-dashed rounded-lg p-8 text-center transition-colors
                ${isDragOver 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted-foreground/25 hover:border-primary/50'
                }
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              data-testid="file-upload-area"
            >
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Drag and drop your resume(s) here
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                We support PDF, DOC, DOCX, TXT, RTF. Max size 10MB.
              </p>
              
              <input
                type="file"
                multiple
                accept={acceptedTypes.join(',')}
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="file-input"
                data-testid="file-input"
              />
              <Button
                type="button"
                onClick={() => document.getElementById('file-input')?.click()}
                data-testid="browse-files-button"
              >
                Browse Files
              </Button>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="mt-6" data-testid="uploaded-files-list">
                <h4 className="text-sm font-medium text-foreground mb-3">
                  Uploaded Files ({uploadedFiles.length})
                </h4>
                <div className="space-y-2">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                      data-testid={`uploaded-file-${file.id}`}
                    >
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-primary mr-3" />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        data-testid={`remove-file-${file.id}`}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span data-testid="security-notice">
                  Your data is encrypted and confidential.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleSkip}
                data-testid="skip-button"
              >
                Skip for now
              </Button>
              
              <Button
                onClick={handleContinue}
                disabled={isUploading}
                data-testid="continue-button"
              >
                {isUploading ? "Processing..." : "Next Step"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
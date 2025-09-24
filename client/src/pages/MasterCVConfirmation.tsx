import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { FileText, AlertTriangle, Info, CheckCircle, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ProfileSection {
  id: string;
  title: string;
  content: string;
  confidence: 'high' | 'medium' | 'low';
  editable: boolean;
}

const mockProfileData: ProfileSection[] = [
  {
    id: 'header',
    title: 'Contact Information',
    content: 'John Doe\n123 Main Street, Anytown, USA 12345 | (123) 456-7890 | john.doe@email.com',
    confidence: 'high',
    editable: true
  },
  {
    id: 'summary',
    title: 'Professional Summary',
    content: 'Highly motivated and results-oriented Software Engineer with over 10 years of experience in developing, testing, and maintaining web applications. Proficient in JavaScript, React, and Node.js. Adept at problem-solving and collaborating with cross-functional teams to deliver high-quality software solutions.',
    confidence: 'medium',
    editable: true
  },
  {
    id: 'experience',
    title: 'Professional Experience',
    content: 'Senior Software Engineer, Tech Solutions Inc. — Anytown, USA (2018 - Present)\nLed the development of a new customer relationship management (CRM) platform, resulting in a 20% increase in user engagement. Mentored junior developers and conducted code reviews to ensure code quality and adherence to best practices.\n\nSoftware Engineer, Web Innovators LLC — Sometown, USA (2014 - 2018)\nDeveloped and maintained front-end features for a high-traffic e-commerce website using React and Redux. Collaborated with UI/UX designers to create responsive and user-friendly interfaces.',
    confidence: 'low',
    editable: true
  },
  {
    id: 'education',
    title: 'Education',
    content: 'Bachelor of Science in Computer Science\nUniversity of Technology, Cityville, USA (2010 - 2014)',
    confidence: 'high',
    editable: true
  }
];

export default function MasterCVConfirmation() {
  const [, navigate] = useLocation();
  const [profileSections, setProfileSections] = useState<ProfileSection[]>(mockProfileData);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isApproving, setIsApproving] = useState(false);
  const { toast } = useToast();

  const getConfidenceStyle = (confidence: 'high' | 'medium' | 'low') => {
    switch (confidence) {
      case 'low':
        return 'bg-red-100/50 border-l-4 border-red-400';
      case 'medium':
        return 'bg-yellow-100/50 border-l-4 border-yellow-400';
      case 'high':
      default:
        return '';
    }
  };

  const getConfidenceIcon = (confidence: 'high' | 'medium' | 'low') => {
    switch (confidence) {
      case 'low':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'medium':
        return <Info className="w-4 h-4 text-yellow-600" />;
      case 'high':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
  };

  const getConfidenceLabel = (confidence: 'high' | 'medium' | 'low') => {
    switch (confidence) {
      case 'low':
        return 'Low confidence - Please review';
      case 'medium':
        return 'Medium confidence - Review recommended';
      case 'high':
        return 'High confidence';
    }
  };

  const handleEditSection = (sectionId: string) => {
    setEditingSection(sectionId);
  };

  const handleSaveSection = (sectionId: string, newContent: string) => {
    setProfileSections(prev =>
      prev.map(section =>
        section.id === sectionId
          ? { ...section, content: newContent }
          : section
      )
    );
    setEditingSection(null);
    
    toast({
      title: "Section updated",
      description: "Your changes have been saved.",
    });
  };

  const handleCancelEdit = () => {
    setEditingSection(null);
  };

  const handleApprove = async () => {
    setIsApproving(true);
    
    // Here you would typically send the approved profile to the backend
    // For now, we'll simulate the API call and navigate to dashboard
    
    setTimeout(() => {
      toast({
        title: "Master CV Approved!",
        description: "Your profile has been saved and you can now start using JobSniper.",
        variant: "default",
      });
      navigate('/dashboard');
    }, 1500);
  };

  const handleDiscard = () => {
    // Navigate to an empty profile or back to onboarding
    navigate('/dashboard');
    toast({
      title: "Profile Discarded",
      description: "You can add your materials later through Settings.",
      variant: "destructive",
    });
  };

  const lowConfidenceCount = profileSections.filter(section => section.confidence === 'low').length;
  const mediumConfidenceCount = profileSections.filter(section => section.confidence === 'medium').length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="page-title">
            Master CV
          </h1>
          <p className="text-muted-foreground text-lg mb-6" data-testid="page-description">
            Review your AI-generated profile. Pay special attention to highlighted sections that need your review.
          </p>
          
          {/* Confidence Summary */}
          {(lowConfidenceCount > 0 || mediumConfidenceCount > 0) && (
            <div className="bg-muted/20 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-6 text-sm">
                {lowConfidenceCount > 0 && (
                  <div className="flex items-center text-red-600">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    <span>{lowConfidenceCount} section{lowConfidenceCount !== 1 ? 's' : ''} need review</span>
                  </div>
                )}
                {mediumConfidenceCount > 0 && (
                  <div className="flex items-center text-yellow-600">
                    <Info className="w-4 h-4 mr-1" />
                    <span>{mediumConfidenceCount} section{mediumConfidenceCount !== 1 ? 's' : ''} recommended for review</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Sections */}
        <div className="space-y-6 mb-8">
          {profileSections.map((section) => (
            <Card 
              key={section.id}
              className={getConfidenceStyle(section.confidence)}
              data-testid={`section-${section.id}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                  <div className="flex items-center space-x-2">
                    {section.confidence !== 'high' && (
                      <div className="flex items-center text-xs">
                        {getConfidenceIcon(section.confidence)}
                        <span className="ml-1">{getConfidenceLabel(section.confidence)}</span>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditSection(section.id)}
                      data-testid={`edit-section-${section.id}`}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {editingSection === section.id ? (
                  <EditableSection
                    content={section.content}
                    onSave={(content) => handleSaveSection(section.id, content)}
                    onCancel={handleCancelEdit}
                  />
                ) : (
                  <div 
                    className="whitespace-pre-wrap text-foreground leading-relaxed"
                    data-testid={`section-content-${section.id}`}
                  >
                    {section.content}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center bg-card border rounded-lg p-6">
          <Button
            variant="outline"
            onClick={handleDiscard}
            data-testid="discard-button"
          >
            Discard Profile
          </Button>
          
          <div className="flex space-x-4">
            <Button
              variant="secondary"
              data-testid="save-draft-button"
            >
              Save Draft
            </Button>
            <Button
              onClick={handleApprove}
              disabled={isApproving}
              className="bg-green-600 hover:bg-green-700"
              data-testid="approve-button"
            >
              {isApproving ? "Approving..." : "Approve Master CV"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface EditableSectionProps {
  content: string;
  onSave: (content: string) => void;
  onCancel: () => void;
}

function EditableSection({ content, onSave, onCancel }: EditableSectionProps) {
  const [editedContent, setEditedContent] = useState(content);

  return (
    <div className="space-y-4">
      <Textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        className="min-h-[100px] resize-y"
        data-testid="edit-textarea"
      />
      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onCancel}
          data-testid="cancel-edit-button"
        >
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={() => onSave(editedContent)}
          data-testid="save-edit-button"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
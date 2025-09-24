import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sidebar from '../components/Sidebar';
import ResumeTemplate from '../components/ResumeTemplate';
import { ResumeTemplate as ResumeTemplateType } from '../types';

const RESUME_TEMPLATES: ResumeTemplateType[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, professional layout',
    category: 'modern',
    preview: '/templates/modern.png',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Sidebar design with visual elements',
    category: 'creative',
    preview: '/templates/creative.png',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Professional format for senior roles',
    category: 'executive',
    preview: '/templates/executive.png',
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Terminal-inspired design for developers',
    category: 'technical',
    preview: '/templates/technical.png',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, typography-focused design',
    category: 'minimal',
    preview: '/templates/minimal.png',
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Traditional format for research roles',
    category: 'academic',
    preview: '/templates/academic.png',
  },
];

export default function LaunchpadPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleUseTemplate = (template: ResumeTemplateType) => {
    console.log('Using template:', template);
    // TODO: Navigate to resume editor with selected template
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0 overflow-hidden">
          <div className="h-screen overflow-y-auto">
            <div className="p-6">
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden mr-2"
                    onClick={() => setIsSidebarOpen(true)}
                    data-testid="mobile-menu-button"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground mb-2" data-testid="page-title">
                      Launchpad
                    </h1>
                    <p className="text-muted-foreground" data-testid="page-description">
                      Choose from professionally designed resume templates
                    </p>
                  </div>
                </div>
              </div>

              {/* Resume Templates Grid - Reduced to 1/4 size */}
              <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4" data-testid="templates-grid">
                {RESUME_TEMPLATES.map((template) => (
                  <ResumeTemplate
                    key={template.id}
                    template={template}
                    onUse={handleUseTemplate}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

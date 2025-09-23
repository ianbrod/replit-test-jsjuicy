import { ResumeTemplate as ResumeTemplateType } from '../types';
import { Button } from './ui/button';

interface ResumeTemplateProps {
  template: ResumeTemplateType;
  onUse: (template: ResumeTemplateType) => void;
}

export default function ResumeTemplate({ template, onUse }: ResumeTemplateProps) {
  const renderPreview = () => {
    switch (template.category) {
      case 'modern':
        return (
          <div className="aspect-[8.5/11] bg-gradient-to-br from-slate-50 to-white p-8 text-xs">
            <div className="h-full flex flex-col">
              <div className="border-b border-slate-200 pb-4 mb-4">
                <h3 className="text-lg font-bold text-slate-900">JOHN DOE</h3>
                <p className="text-slate-600">Senior Software Engineer</p>
                <div className="flex justify-between text-slate-500 text-xs mt-1">
                  <span>john.doe@email.com</span>
                  <span>(555) 123-4567</span>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h4 className="font-semibold text-slate-700 mb-1">EXPERIENCE</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between">
                        <span className="font-medium">Senior Developer</span>
                        <span className="text-slate-500">2020-Present</span>
                      </div>
                      <p className="text-slate-600">TechCorp Inc.</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700 mb-1">SKILLS</h4>
                  <div className="grid grid-cols-2 gap-1 text-slate-600">
                    <span>• JavaScript</span>
                    <span>• Python</span>
                    <span>• React</span>
                    <span>• Node.js</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'creative':
        return (
          <div className="aspect-[8.5/11] bg-gradient-to-r from-blue-50 to-indigo-50 p-8 text-xs">
            <div className="h-full flex">
              <div className="w-1/3 bg-slate-800 text-white p-4 -m-4 mr-4">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-white rounded-full mx-auto mb-2"></div>
                  <h3 className="font-bold">JANE SMITH</h3>
                  <p className="text-sm">UX Designer</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">CONTACT</h4>
                    <p className="text-xs">jane@email.com</p>
                    <p className="text-xs">(555) 987-6543</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">SKILLS</h4>
                    <div className="space-y-1 text-xs">
                      <div>Figma ●●●●●</div>
                      <div>Sketch ●●●●○</div>
                      <div>Adobe XD ●●●○○</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 pl-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-1">EXPERIENCE</h4>
                    <div>
                      <div className="flex justify-between">
                        <span className="font-medium">Senior UX Designer</span>
                        <span className="text-slate-500">2019-Present</span>
                      </div>
                      <p className="text-slate-600">Creative Solutions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="aspect-[8.5/11] bg-white p-8 text-xs flex items-center justify-center">
            <div className="text-center">
              <h3 className="font-bold text-lg mb-2">{template.name}</h3>
              <p className="text-muted-foreground">Preview coming soon</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="resume-template cursor-pointer" data-testid={`resume-template-${template.id}`}>
      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
        {renderPreview()}
        
        <div className="p-4 border-t border-border bg-muted/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-foreground" data-testid={`template-name-${template.id}`}>
                {template.name}
              </h3>
              <p className="text-sm text-muted-foreground" data-testid={`template-description-${template.id}`}>
                {template.description}
              </p>
            </div>
            <Button 
              size="sm"
              onClick={() => onUse(template)}
              data-testid={`use-template-${template.id}`}
            >
              Use Template
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Sidebar from '../components/Sidebar';
import OpportunityTable from '../components/OpportunityTable';
import { api } from '../services/api';
import { OpportunityWithMatch } from '@shared/schema';

export default function OpportunitiesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [, navigate] = useLocation();

  // Mock data for opportunities (remove this when real API is ready)
  const mockOpportunities: OpportunityWithMatch[] = [
    {
      id: '1',
      title: 'Senior Engineering Director',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      description: 'Lead engineering teams and drive technical strategy for our core platform.',
      requirements: '10+ years experience, Team leadership, System architecture',
      salary: '$180,000 - $250,000',
      remote: false,
      createdAt: new Date('2024-01-15'),
      matchScore: 92,
      intensityScore: 85,
      perkScore: 88,
      opticsScore: 90,
    },
    {
      id: '2',
      title: 'VP of Engineering',
      company: 'StartupXYZ',
      location: 'Remote',
      description: 'Scale our engineering organization from 20 to 100+ engineers.',
      requirements: 'VP/Director experience, High-growth startup, Full-stack technical background',
      salary: '$200,000 - $300,000',
      remote: true,
      createdAt: new Date('2024-01-18'),
      matchScore: 88,
      intensityScore: 95,
      perkScore: 92,
      opticsScore: 85,
    },
    {
      id: '3',
      title: 'Director of Product Engineering',
      company: 'FinanceFlow',
      location: 'New York, NY',
      description: 'Own the technical direction for our flagship financial platform.',
      requirements: 'Product engineering, Financial services, 8+ years leadership',
      salary: '$160,000 - $220,000',
      remote: false,
      createdAt: new Date('2024-01-20'),
      matchScore: 85,
      intensityScore: 78,
      perkScore: 82,
      opticsScore: 88,
    },
    {
      id: '4',
      title: 'Principal Engineer (AI/ML)',
      company: 'DataDriven Co',
      location: 'Seattle, WA',
      description: 'Lead our machine learning infrastructure and AI product initiatives.',
      requirements: 'ML/AI expertise, Large-scale systems, Technical leadership',
      salary: '$170,000 - $240,000',
      remote: true,
      createdAt: new Date('2024-01-22'),
      matchScore: 91,
      intensityScore: 88,
      perkScore: 85,
      opticsScore: 92,
    },
    {
      id: '5',
      title: 'Engineering Manager - Platform',
      company: 'CloudScale',
      location: 'Austin, TX',
      description: 'Manage and grow our platform engineering team focused on infrastructure.',
      requirements: 'Cloud platforms, Team management, DevOps/SRE experience',
      salary: '$140,000 - $190,000',
      remote: true,
      createdAt: new Date('2024-01-25'),
      matchScore: 83,
      intensityScore: 82,
      perkScore: 78,
      opticsScore: 85,
    },
    {
      id: '6',
      title: 'Head of Technology',
      company: 'MediaNow',
      location: 'Los Angeles, CA',
      description: 'Shape technology strategy for our digital media platform reaching millions.',
      requirements: 'Media/Entertainment tech, Strategic leadership, High-scale systems',
      salary: '$190,000 - $280,000',
      remote: false,
      createdAt: new Date('2024-01-28'),
      matchScore: 89,
      intensityScore: 91,
      perkScore: 88,
      opticsScore: 86,
    },
  ];

  // Filter opportunities based on search and remote preferences
  const filteredOpportunities = mockOpportunities.filter(opp => {
    const matchesSearch = !searchTerm || 
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRemote = !remoteOnly || opp.remote;
    
    return matchesSearch && matchesRemote;
  });

  // Fetch opportunities (currently using mock data)
  const { data: opportunities = filteredOpportunities, isLoading = false } = useQuery<OpportunityWithMatch[]>({
    queryKey: ['/api/opportunities', { search: searchTerm, remote: remoteOnly }],
    enabled: false, // Disabled for now, using mock data above
  });

  const handleUpgrade = () => {
    navigate('/upgrade');
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
        <div className="flex-1 lg:ml-0">
          <div className="p-6">
            {/* Header with Search and Filters */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden mr-2"
                    onClick={() => setIsSidebarOpen(true)}
                    data-testid="mobile-menu-button"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                  <h1 className="text-2xl font-bold text-foreground" data-testid="page-title">
                    Opportunities
                  </h1>
                </div>
                <Button data-testid="find-best-matches-button">
                  Find Best Matches
                </Button>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search positions, companies, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    data-testid="search-input"
                  />
                </div>
                
                <div className="flex gap-4 items-center">
                  <select className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                          data-testid="location-filter">
                    <option>All Locations</option>
                    <option>Remote</option>
                    <option>San Francisco</option>
                    <option>New York</option>
                  </select>
                  
                  <label className="flex items-center" data-testid="remote-only-filter">
                    <Checkbox 
                      checked={remoteOnly}
                      onCheckedChange={(checked) => setRemoteOnly(checked as boolean)}
                    />
                    <span className="ml-2 text-sm text-foreground">Remote Only</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Opportunities Table */}
            {isLoading ? (
              <div className="bg-card rounded-lg border border-border p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading opportunities...</p>
              </div>
            ) : (
              <OpportunityTable 
                opportunities={opportunities}
                onUpgrade={handleUpgrade}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

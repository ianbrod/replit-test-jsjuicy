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

  // Fetch opportunities
  const { data: opportunities = [], isLoading } = useQuery<OpportunityWithMatch[]>({
    queryKey: ['/api/opportunities', { search: searchTerm, remote: remoteOnly }],
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

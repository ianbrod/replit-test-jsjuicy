import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Sidebar from '../components/Sidebar';
import JobCard from '../components/JobCard';
import { api } from '../services/api';
import { OpportunityWithMatch, DashboardStats } from '@shared/schema';
import { ActivityItem } from '../types';

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch high-potential matches
  const { data: matches = [], isLoading: matchesLoading } = useQuery<OpportunityWithMatch[]>({
    queryKey: ['/api/opportunities/matches'],
  });

  // Fetch dashboard stats
  const { data: stats } = useQuery<DashboardStats>({
    queryKey: ['/api/dashboard/stats'],
    select: (data) => data || { applications: 0, responses: 0, interviews: 0 },
  });

  // Mock activity data
  const recentActivity: ActivityItem[] = [
    {
      id: '1',
      type: 'application',
      title: 'Applied to Software Engineer at TechCorp',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      type: 'interview',
      title: 'Interview scheduled with HealthFirst',
      timestamp: '1 day ago',
    },
    {
      id: '3',
      type: 'update',
      title: 'Profile updated',
      timestamp: '3 days ago',
    },
  ];

  const handleJobDetails = (job: OpportunityWithMatch) => {
    console.log('View job details:', job);
    // TODO: Open job details modal or navigate to details page
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
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
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
                    Dashboard
                  </h1>
                </div>
                <Button data-testid="new-application-button">
                  <Plus className="w-4 h-4 mr-2" />
                  New Application
                </Button>
              </div>
            </div>

            {/* High-Potential Matches */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-6" data-testid="matches-section-title">
                New High-Potential Matches Found
              </h2>

              {matchesLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-card rounded-lg p-6 border animate-pulse">
                      <div className="h-4 bg-muted rounded mb-4"></div>
                      <div className="h-6 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded mb-4"></div>
                      <div className="flex justify-between">
                        <div className="h-3 bg-muted rounded w-1/3"></div>
                        <div className="h-3 bg-muted rounded w-1/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6" data-testid="high-potential-matches">
                  {matches.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onViewDetails={handleJobDetails}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Stats and Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Weekly Snapshot */}
              <Card data-testid="weekly-snapshot">
                <CardHeader>
                  <CardTitle>Weekly Snapshot</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Applications Sent</span>
                        <span className="text-2xl font-bold text-primary" data-testid="stat-applications">
                          {stats?.applications || 0}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Responses</span>
                        <span className="text-2xl font-bold text-primary" data-testid="stat-responses">
                          {stats?.responses || 0}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Interviews</span>
                        <span className="text-2xl font-bold text-primary" data-testid="stat-interviews">
                          {stats?.interviews || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card data-testid="quick-actions">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" data-testid="find-opportunities-button">
                      <Plus className="w-4 h-4 mr-2" />
                      Find New Opportunities
                    </Button>
                    <Button variant="secondary" className="w-full justify-start" data-testid="update-resume-button">
                      Update Resume
                    </Button>
                    <Button variant="secondary" className="w-full justify-start" data-testid="profile-settings-button">
                      Profile Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card data-testid="recent-activity">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3" data-testid={`activity-${activity.id}`}>
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'application' ? 'bg-primary' : 'bg-muted'
                        }`}></div>
                        <div>
                          <p className="text-sm text-foreground font-medium">
                            {activity.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

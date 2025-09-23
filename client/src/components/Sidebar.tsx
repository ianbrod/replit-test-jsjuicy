import { Link, useLocation } from 'wouter';
import { Home, Search, Rocket, Target, Settings } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/button';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const [location] = useLocation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/opportunities', icon: Search, label: 'Opportunities' },
    { path: '/launchpad', icon: Rocket, label: 'Launchpad' },
  ];

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <div className={`sidebar-nav w-64 bg-card border-r border-border h-screen fixed lg:relative lg:translate-x-0 z-50 ${
      isOpen ? 'open' : ''
    }`}>
      <div className="p-6">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-2">
            <Target className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">JobSniper</span>
        </div>

        <nav className="space-y-2" data-testid="sidebar-navigation">
          {navItems.map((item) => {
            const isActive = location === item.path;
            const Icon = item.icon;
            
            return (
              <Link key={item.path} href={item.path} onClick={handleLinkClick}>
                <a className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
                data-testid={`nav-${item.label.toLowerCase()}`}>
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </a>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 w-full p-6 border-t border-border">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
            <span className="text-sm font-medium text-primary-foreground" data-testid="user-initials">
              {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate" data-testid="user-name">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-muted-foreground capitalize" data-testid="user-tier">
              {user?.tier || 'free'} Tier
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <Link href="/upgrade" onClick={handleLinkClick}>
            <Button 
              variant="default" 
              size="sm" 
              className="w-full"
              data-testid="upgrade-button"
            >
              Upgrade
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={logout}
            className="w-full"
            data-testid="logout-button"
          >
            <Settings className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

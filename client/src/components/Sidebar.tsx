import { Link, useLocation } from 'wouter';
import { useState } from 'react';
import { Home, Search, Rocket, Target, Settings, ChevronLeft, ChevronRight, LogOut, HelpCircle, Palette, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const [location, navigate] = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/opportunities', icon: Search, label: 'Opportunities' },
    { path: '/launchpad', icon: Rocket, label: 'Launchpad' },
  ];

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSettings = () => {
    navigate('/master-cv');
    if (onClose) onClose();
  };

  const handleHelp = () => {
    // TODO: Open help modal or navigate to help page
    console.log('Help clicked');
  };

  const handleTheme = () => {
    // TODO: Toggle theme
    console.log('Theme toggle clicked');
  };

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
  };

  const sidebarWidth = isCollapsed ? 'w-16' : 'w-64';

  return (
    <div className={`sidebar-nav ${sidebarWidth} bg-card border-r border-border h-screen fixed lg:relative lg:translate-x-0 z-50 transition-all duration-300 ${
      isOpen ? 'open' : ''
    }`}>
      {/* Header with Logo and Collapse Toggle */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-2">
                <Target className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">JobSniper</span>
            </div>
          )}
          
          {isCollapsed && (
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mx-auto">
              <Target className="w-4 h-4 text-primary-foreground" />
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapse}
            className="hidden lg:flex p-1 h-8 w-8"
            data-testid="sidebar-collapse-toggle"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <nav className="space-y-2" data-testid="sidebar-navigation">
          {navItems.map((item) => {
            const isActive = location === item.path;
            const Icon = item.icon;
            
            return (
              <Link key={item.path} href={item.path}>
                <div 
                  className={`flex items-center px-3 py-2 rounded-md transition-colors group relative cursor-pointer ${
                    isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                  data-testid={`nav-${item.label.toLowerCase()}`}
                  title={isCollapsed ? item.label : undefined}
                  onClick={handleLinkClick}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!isCollapsed && <span className="ml-3">{item.label}</span>}
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile Section with Dropdown */}
      <div className="border-t border-border p-4">
        {!isCollapsed && (
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
        )}

        <div className="space-y-2">
          {/* Upgrade Button */}
          <Link href="/upgrade">
            <Button 
              variant="default" 
              size="sm" 
              className={`${isCollapsed ? 'w-8 h-8 p-0' : 'w-full'}`}
              data-testid="upgrade-button"
              title={isCollapsed ? 'Upgrade' : undefined}
              onClick={handleLinkClick}
            >
              {isCollapsed ? (
                <Rocket className="w-4 h-4" />
              ) : (
                'Upgrade'
              )}
            </Button>
          </Link>
          
          {/* Avatar Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`${isCollapsed ? 'w-8 h-8 p-0' : 'w-full justify-start'}`}
                data-testid="avatar-dropdown-trigger"
              >
                {isCollapsed ? (
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary-foreground">
                      {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </span>
                  </div>
                ) : (
                  <>
                    <User className="w-4 h-4 mr-2" />
                    Account
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={handleSettings} data-testid="settings-menu-item">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleHelp} data-testid="help-menu-item">
                <HelpCircle className="w-4 h-4 mr-2" />
                Help
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleTheme} data-testid="theme-menu-item">
                <Palette className="w-4 h-4 mr-2" />
                Theme
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} data-testid="logout-menu-item">
                <LogOut className="w-4 h-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
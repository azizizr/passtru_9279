import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState(['admin', 'events']);
  const location = useLocation();

  const navigationItems = [
    {
      id: 'admin',
      label: 'System Administration',
      icon: 'Shield',
      type: 'section',
      children: [
        {
          id: 'super-admin-dashboard',
          label: 'Super Admin Dashboard',
          icon: 'LayoutDashboard',
          path: '/super-admin-dashboard',
          description: 'Platform oversight and management'
        }
      ]
    },
    {
      id: 'events',
      label: 'Event Management',
      icon: 'Calendar',
      type: 'section',
      children: [
        {
          id: 'client-portal-dashboard',
          label: 'Client Portal',
          icon: 'Building2',
          path: '/client-portal-dashboard',
          description: 'Organization event management'
        },
        {
          id: 'event-management-interface',
          label: 'Event Interface',
          icon: 'Settings',
          path: '/event-management-interface',
          description: 'Event configuration and setup'
        }
      ]
    },
    {
      id: 'operations',
      label: 'Check-in Operations',
      icon: 'UserCheck',
      type: 'section',
      children: [
        {
          id: 'live-check-in-dashboard',
          label: 'Live Check-in',
          icon: 'Activity',
          path: '/live-check-in-dashboard',
          description: 'Real-time check-in monitoring'
        },
        {
          id: 'qr-code-scanner-interface',
          label: 'QR Scanner',
          icon: 'QrCode',
          path: '/qr-code-scanner-interface',
          description: 'Mobile scanning interface'
        }
      ]
    },
    {
      id: 'attendee',
      label: 'Attendee Experience',
      icon: 'Users',
      type: 'section',
      children: [
        {
          id: 'attendee-portal',
          label: 'Attendee Portal',
          icon: 'User',
          path: '/attendee-portal',
          description: 'Post-check-in experience'
        }
      ]
    }
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isActiveItem = (path) => {
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-998" />
      
      {/* Sidebar */}
      <aside className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-surface border-r border-border z-999 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        
        {/* Collapse Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <h2 className="text-sm font-semibold text-text-primary">Navigation</h2>
          )}
          <button
            onClick={toggleCollapse}
            className="p-2 hover:bg-secondary-50 rounded-lg transition-smooth"
          >
            <Icon 
              name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
              size={16} 
              color="#64748B" 
            />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-2 px-3">
            {navigationItems.map((section) => (
              <div key={section.id} className="space-y-1">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`w-full flex items-center justify-between p-2 text-left hover:bg-secondary-50 rounded-lg transition-smooth ${
                    isCollapsed ? 'justify-center' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={section.icon} size={18} color="#64748B" />
                    {!isCollapsed && (
                      <span className="text-sm font-medium text-text-secondary">
                        {section.label}
                      </span>
                    )}
                  </div>
                  {!isCollapsed && (
                    <Icon 
                      name={expandedSections.includes(section.id) ? "ChevronDown" : "ChevronRight"} 
                      size={14} 
                      color="#94A3B8" 
                    />
                  )}
                </button>

                {/* Section Items */}
                {(expandedSections.includes(section.id) || isCollapsed) && (
                  <div className={`space-y-1 ${isCollapsed ? '' : 'ml-4'}`}>
                    {section.children.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleNavigation(item.path)}
                        className={`w-full flex items-center space-x-3 p-2 text-left rounded-lg transition-smooth group ${
                          isActiveItem(item.path)
                            ? 'bg-primary-50 text-primary border-l-2 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                        } ${isCollapsed ? 'justify-center' : ''}`}
                        title={isCollapsed ? item.label : ''}
                      >
                        <Icon 
                          name={item.icon} 
                          size={16} 
                          color={isActiveItem(item.path) ? '#2563EB' : '#64748B'}
                          className="flex-shrink-0"
                        />
                        {!isCollapsed && (
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              {item.label}
                            </div>
                            <div className="text-xs text-text-muted truncate">
                              {item.description}
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Footer */}
        {!isCollapsed && (
          <div className="border-t border-border p-4">
            <div className="flex items-center space-x-3 p-2 bg-secondary-50 rounded-lg">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <Icon name="Wifi" size={14} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-text-primary">System Status</div>
                <div className="text-xs text-success">All systems operational</div>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
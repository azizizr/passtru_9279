import React, { useState } from 'react';
import Icon from '../AppIcon';

const QuickActionToolbar = ({ context = 'admin' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getActionsForContext = () => {
    switch (context) {
      case 'admin':
        return [
          {
            id: 'create-event',
            label: 'Create Event',
            icon: 'Plus',
            color: 'primary',
            action: () => console.log('Create event clicked')
          },
          {
            id: 'bulk-import',
            label: 'Bulk Import',
            icon: 'Upload',
            color: 'secondary',
            action: () => console.log('Bulk import clicked')
          },
          {
            id: 'reports',
            label: 'Generate Report',
            icon: 'FileText',
            color: 'accent',
            action: () => console.log('Generate report clicked')
          },
          {
            id: 'settings',
            label: 'Quick Settings',
            icon: 'Settings',
            color: 'secondary',
            action: () => console.log('Quick settings clicked')
          }
        ];
      case 'checkin':
        return [
          {
            id: 'manual-checkin',
            label: 'Manual Check-in',
            icon: 'UserPlus',
            color: 'success',
            action: () => console.log('Manual check-in clicked')
          },
          {
            id: 'scan-qr',
            label: 'Scan QR',
            icon: 'QrCode',
            color: 'primary',
            action: () => console.log('Scan QR clicked')
          },
          {
            id: 'emergency',
            label: 'Emergency',
            icon: 'AlertTriangle',
            color: 'error',
            action: () => console.log('Emergency clicked')
          }
        ];
      case 'event':
        return [
          {
            id: 'add-session',
            label: 'Add Session',
            icon: 'Calendar',
            color: 'primary',
            action: () => console.log('Add session clicked')
          },
          {
            id: 'manage-speakers',
            label: 'Manage Speakers',
            icon: 'Mic',
            color: 'accent',
            action: () => console.log('Manage speakers clicked')
          },
          {
            id: 'send-notification',
            label: 'Send Notification',
            icon: 'Bell',
            color: 'warning',
            action: () => console.log('Send notification clicked')
          },
          {
            id: 'export-data',
            label: 'Export Data',
            icon: 'Download',
            color: 'secondary',
            action: () => console.log('Export data clicked')
          }
        ];
      default:
        return [];
    }
  };

  const actions = getActionsForContext();
  const primaryActions = actions.slice(0, 2);
  const secondaryActions = actions.slice(2);

  const getButtonClasses = (color, isPrimary = false) => {
    const baseClasses = "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-smooth";
    
    switch (color) {
      case 'primary':
        return `${baseClasses} ${isPrimary ? 'bg-primary text-white hover:bg-primary-700' : 'bg-primary-50 text-primary hover:bg-primary-100'}`;
      case 'secondary':
        return `${baseClasses} bg-secondary-50 text-secondary hover:bg-secondary-100`;
      case 'accent':
        return `${baseClasses} bg-accent-50 text-accent hover:bg-accent-100`;
      case 'success':
        return `${baseClasses} ${isPrimary ? 'bg-success text-white hover:bg-success-500' : 'bg-success-50 text-success hover:bg-success-100'}`;
      case 'warning':
        return `${baseClasses} bg-warning-50 text-warning hover:bg-warning-100`;
      case 'error':
        return `${baseClasses} ${isPrimary ? 'bg-error text-white hover:bg-error-500' : 'bg-error-50 text-error hover:bg-error-100'}`;
      default:
        return `${baseClasses} bg-secondary-50 text-secondary hover:bg-secondary-100`;
    }
  };

  const getIconColor = (color, isPrimary = false) => {
    if (isPrimary && (color === 'primary' || color === 'success' || color === 'error')) {
      return 'white';
    }
    
    switch (color) {
      case 'primary':
        return '#2563EB';
      case 'secondary':
        return '#64748B';
      case 'accent':
        return '#0EA5E9';
      case 'success':
        return '#059669';
      case 'warning':
        return '#D97706';
      case 'error':
        return '#DC2626';
      default:
        return '#64748B';
    }
  };

  return (
    <>
      {/* Desktop Toolbar */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-1000">
        <div className="bg-surface rounded-lg shadow-elevation-4 border border-border p-4">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-text-secondary">Quick Actions:</span>
            <div className="flex items-center space-x-2">
              {primaryActions.map((action) => (
                <button
                  key={action.id}
                  onClick={action.action}
                  className={getButtonClasses(action.color, true)}
                  title={action.label}
                >
                  <Icon 
                    name={action.icon} 
                    size={16} 
                    color={getIconColor(action.color, true)} 
                  />
                  <span>{action.label}</span>
                </button>
              ))}
              {secondaryActions.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-smooth"
                    title="More actions"
                  >
                    <Icon name="MoreHorizontal" size={16} />
                  </button>
                  
                  {isExpanded && (
                    <div className="absolute bottom-full right-0 mb-2 w-48 bg-surface rounded-lg shadow-elevation-4 border border-border py-2 animate-slide-up">
                      {secondaryActions.map((action) => (
                        <button
                          key={action.id}
                          onClick={() => {
                            action.action();
                            setIsExpanded(false);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-smooth"
                        >
                          <Icon 
                            name={action.icon} 
                            size={16} 
                            color={getIconColor(action.color)} 
                          />
                          <span>{action.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Action Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-1000">
        <div className="relative">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-14 h-14 bg-primary text-white rounded-full shadow-elevation-4 flex items-center justify-center transition-smooth hover:bg-primary-700"
          >
            <Icon 
              name={isExpanded ? "X" : "Plus"} 
              size={24} 
              color="white" 
            />
          </button>

          {isExpanded && (
            <div className="absolute bottom-16 right-0 w-56 bg-surface rounded-lg shadow-elevation-4 border border-border py-2 animate-slide-up">
              {actions.map((action, index) => (
                <button
                  key={action.id}
                  onClick={() => {
                    action.action();
                    setIsExpanded(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-smooth"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    action.color === 'primary' ? 'bg-primary-50' :
                    action.color === 'success' ? 'bg-success-50' :
                    action.color === 'accent' ? 'bg-accent-50' :
                    action.color === 'warning' ? 'bg-warning-50' :
                    action.color === 'error'? 'bg-error-50' : 'bg-secondary-50'
                  }`}>
                    <Icon 
                      name={action.icon} 
                      size={16} 
                      color={getIconColor(action.color)} 
                    />
                  </div>
                  <span className="font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QuickActionToolbar;
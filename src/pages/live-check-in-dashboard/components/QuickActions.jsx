import React from 'react';
import Icon from 'components/AppIcon';

const QuickActions = ({ onManualCheckIn, onQRScan, onHelpDesk, isMobile = false }) => {
  const actions = [
    {
      id: 'manual',
      label: 'Manual Check-in',
      icon: 'UserPlus',
      color: 'success',
      description: 'Search and check-in attendees manually',
      onClick: onManualCheckIn
    },
    {
      id: 'qr',
      label: 'Scan QR Code',
      icon: 'QrCode',
      color: 'primary',
      description: 'Use camera to scan QR codes',
      onClick: onQRScan
    },
    {
      id: 'help',
      label: 'Help Desk',
      icon: 'HelpCircle',
      color: 'warning',
      description: 'Assist attendees with issues',
      onClick: onHelpDesk
    }
  ];

  const getButtonClasses = (color, isMobile) => {
    const baseClasses = `flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium text-sm transition-smooth ${
      isMobile ? 'flex-1' : 'w-full'
    }`;
    
    switch (color) {
      case 'primary':
        return `${baseClasses} bg-primary text-white hover:bg-primary-700 shadow-elevation-2`;
      case 'success':
        return `${baseClasses} bg-success text-white hover:bg-success-500 shadow-elevation-2`;
      case 'warning':
        return `${baseClasses} bg-warning text-white hover:bg-warning-500 shadow-elevation-2`;
      default:
        return `${baseClasses} bg-secondary-100 text-secondary hover:bg-secondary-200`;
    }
  };

  const getIconColor = (color) => {
    return color === 'primary' || color === 'success' || color === 'warning' ? 'white' : '#64748B';
  };

  if (isMobile) {
    return (
      <div className="flex space-x-3">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className={getButtonClasses(action.color, true)}
            title={action.description}
          >
            <Icon 
              name={action.icon} 
              size={18} 
              color={getIconColor(action.color)} 
            />
            <span className="hidden sm:inline">{action.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border p-4">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
      
      <div className="space-y-3">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className={getButtonClasses(action.color, false)}
          >
            <Icon 
              name={action.icon} 
              size={20} 
              color={getIconColor(action.color)} 
            />
            <div className="text-left flex-1">
              <div className="font-medium">{action.label}</div>
              <div className="text-xs opacity-80">{action.description}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Additional Tools */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-text-secondary mb-3">Additional Tools</h4>
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center space-x-2 p-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth">
            <Icon name="Download" size={16} />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 p-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth">
            <Icon name="RefreshCw" size={16} />
            <span>Refresh</span>
          </button>
          <button className="flex items-center space-x-2 p-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth">
            <Icon name="Filter" size={16} />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 p-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth">
            <Icon name="Settings" size={16} />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
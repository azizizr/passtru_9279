import React from 'react';
import Icon from 'components/AppIcon';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'event_created',
      title: 'New event created',
      description: 'Annual Tech Conference 2024',
      user: 'John Smith',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      icon: 'Plus',
      color: 'success'
    },
    {
      id: 2,
      type: 'attendee_registered',
      title: 'New registration',
      description: '25 attendees registered for Product Launch',
      user: 'System',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      icon: 'UserPlus',
      color: 'primary'
    },
    {
      id: 3,
      type: 'event_updated',
      title: 'Event updated',
      description: 'Q1 Workshop venue changed',
      user: 'Sarah Johnson',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      icon: 'Edit',
      color: 'accent'
    },
    {
      id: 4,
      type: 'email_sent',
      title: 'Email reminder sent',
      description: 'Confirmation emails to 150 attendees',
      user: 'System',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      icon: 'Mail',
      color: 'secondary'
    },
    {
      id: 5,
      type: 'admin_invited',
      title: 'Admin invited',
      description: 'Mike Davis added as event admin',
      user: 'John Smith',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      icon: 'Shield',
      color: 'warning'
    }
  ];

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getIconColor = (color) => {
    switch (color) {
      case 'success':
        return '#059669';
      case 'primary':
        return '#2563EB';
      case 'accent':
        return '#0EA5E9';
      case 'warning':
        return '#D97706';
      case 'secondary':
        return '#64748B';
      default:
        return '#64748B';
    }
  };

  const getBackgroundColor = (color) => {
    switch (color) {
      case 'success':
        return 'bg-success-50';
      case 'primary':
        return 'bg-primary-50';
      case 'accent':
        return 'bg-accent-50';
      case 'warning':
        return 'bg-warning-50';
      case 'secondary':
        return 'bg-secondary-50';
      default:
        return 'bg-secondary-50';
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
        <button className="text-sm text-accent hover:text-accent-600 font-medium">
          View all
        </button>
      </div>
      
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-secondary-50 rounded-lg transition-smooth">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getBackgroundColor(activity.color)}`}>
              <Icon 
                name={activity.icon} 
                size={14} 
                color={getIconColor(activity.color)} 
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary">{activity.title}</p>
              <p className="text-sm text-text-secondary truncate">{activity.description}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-text-muted">{activity.user}</span>
                <span className="text-xs text-text-muted">{formatTimestamp(activity.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-border">
        <button className="w-full text-center text-sm text-accent hover:text-accent-600 font-medium py-2">
          Load more activities
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;
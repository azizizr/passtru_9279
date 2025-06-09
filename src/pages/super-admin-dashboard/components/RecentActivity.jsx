import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const RecentActivity = () => {
  const [filter, setFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'client_created',
      title: 'New Client Registration',
      description: 'TechCorp Solutions registered as a new client',
      user: 'System',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      severity: 'info',
      details: {
        clientName: 'TechCorp Solutions',
        plan: 'Enterprise',
        region: 'North America'
      }
    },
    {
      id: 2,
      type: 'event_created',
      title: 'High-Volume Event Created',
      description: 'Annual Tech Conference 2024 created with 5,000+ expected attendees',
      user: 'Sarah Johnson (Acme Corp)',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      severity: 'warning',
      details: {
        eventName: 'Annual Tech Conference 2024',
        expectedAttendees: 5000,
        client: 'Acme Corp'
      }
    },
    {
      id: 3,
      type: 'system_alert',
      title: 'High API Usage Detected',
      description: 'API rate limit approaching threshold for client GlobalEvents Inc',
      user: 'System Monitor',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      severity: 'warning',
      details: {
        client: 'GlobalEvents Inc',
        usage: '85%',
        threshold: '90%'
      }
    },
    {
      id: 4,
      type: 'client_suspended',
      title: 'Client Account Suspended',
      description: 'EventPro Ltd suspended due to payment failure',
      user: 'Admin: John Doe',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      severity: 'error',
      details: {
        client: 'EventPro Ltd',
        reason: 'Payment failure',
        suspendedBy: 'John Doe'
      }
    },
    {
      id: 5,
      type: 'bulk_checkin',
      title: 'Bulk Check-in Completed',
      description: 'Corporate Training Summit processed 1,247 check-ins via CSV upload',
      user: 'Mike Chen (Corporate Training Co)',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      severity: 'success',
      details: {
        eventName: 'Corporate Training Summit',
        checkinsProcessed: 1247,
        method: 'CSV Upload'
      }
    },
    {
      id: 6,
      type: 'email_delivery',
      title: 'Email Delivery Issue',
      description: 'Failed to deliver 23 confirmation emails for University Graduation',
      user: 'Email Service',
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      severity: 'error',
      details: {
        eventName: 'University Graduation',
        failedEmails: 23,
        reason: 'SMTP timeout'
      }
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'client_created':
        return 'Building2';
      case 'event_created':
        return 'Calendar';
      case 'system_alert':
        return 'AlertTriangle';
      case 'client_suspended':
        return 'UserX';
      case 'bulk_checkin':
        return 'Users';
      case 'email_delivery':
        return 'Mail';
      default:
        return 'Activity';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'success':
        return 'text-success bg-success-50 border-success-200';
      case 'warning':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'error':
        return 'text-error bg-error-50 border-error-200';
      default:
        return 'text-accent bg-accent-50 border-accent-200';
    }
  };

  const getIconColor = (severity) => {
    switch (severity) {
      case 'success':
        return 'var(--color-success)';
      case 'warning':
        return 'var(--color-warning)';
      case 'error':
        return 'var(--color-error)';
      default:
        return 'var(--color-accent)';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    return `${hours}h ago`;
  };

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    return activity.severity === filter;
  });

  return (
    <div>
      {/* Filter Controls */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">System Activity Log</h3>
        <div className="flex space-x-2">
          {[
            { key: 'all', label: 'All' },
            { key: 'error', label: 'Errors' },
            { key: 'warning', label: 'Warnings' },
            { key: 'success', label: 'Success' },
            { key: 'info', label: 'Info' }
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-smooth ${
                filter === filterOption.key
                  ? 'bg-primary text-white' :'bg-secondary-100 text-secondary hover:bg-secondary-200'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-4 p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-smooth"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getSeverityColor(activity.severity)}`}>
              <Icon 
                name={getActivityIcon(activity.type)} 
                size={18} 
                color={getIconColor(activity.severity)} 
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-text-primary mb-1">
                    {activity.title}
                  </h4>
                  <p className="text-sm text-text-secondary mb-2">
                    {activity.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-text-muted">
                    <span>By: {activity.user}</span>
                    <span>{formatTimestamp(activity.timestamp)}</span>
                  </div>
                </div>
                <button className="p-1 text-text-muted hover:text-text-secondary hover:bg-secondary-200 rounded transition-smooth">
                  <Icon name="MoreHorizontal" size={16} />
                </button>
              </div>
              
              {/* Activity Details */}
              {activity.details && (
                <div className="mt-3 p-3 bg-surface rounded border border-border">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(activity.details).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-text-muted capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="text-text-primary font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-6 text-center">
        <button className="px-4 py-2 text-sm text-accent hover:text-accent-600 font-medium">
          Load more activities
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;
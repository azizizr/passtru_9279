import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const NotificationCenter = ({ onClose }) => {
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      title: 'High Volume Check-ins',
      message: 'Main entrance experiencing high traffic. Consider opening additional lanes.',
      type: 'warning',
      category: 'operations',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      title: 'New Client Registration',
      message: 'TechCorp Solutions registered as a new client with Enterprise plan.',
      type: 'info',
      category: 'clients',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      title: 'System Maintenance',
      message: 'Scheduled maintenance will begin at 2:00 AM EST tonight.',
      type: 'info',
      category: 'system',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      title: 'Email Delivery Failure',
      message: 'Failed to deliver 23 confirmation emails for University Graduation event.',
      type: 'error',
      category: 'email',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      priority: 'high'
    },
    {
      id: 5,
      title: 'API Rate Limit Warning',
      message: 'GlobalEvents Inc approaching API rate limit threshold (85% usage).',
      type: 'warning',
      category: 'system',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      read: true,
      priority: 'medium'
    }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      default:
        return 'Info';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-accent';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-error-100 text-error border-error-200';
      case 'medium':
        return 'bg-warning-100 text-warning border-warning-200';
      case 'low':
        return 'bg-secondary-100 text-secondary border-secondary-200';
      default:
        return 'bg-secondary-100 text-secondary border-secondary-200';
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

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.category === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="bg-surface rounded-lg shadow-elevation-2 border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-text-primary">Notifications</h3>
          {unreadCount > 0 && (
            <span className="bg-primary text-white text-xs rounded-full px-2 py-1 font-medium">
              {unreadCount}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded transition-smooth"
        >
          <Icon name="X" size={16} />
        </button>
      </div>

      {/* Filters */}
      <div className="p-4 border-b border-border">
        <div className="flex space-x-2 overflow-x-auto">
          {[
            { key: 'all', label: 'All' },
            { key: 'unread', label: 'Unread' },
            { key: 'operations', label: 'Operations' },
            { key: 'clients', label: 'Clients' },
            { key: 'system', label: 'System' },
            { key: 'email', label: 'Email' }
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-smooth ${
                filter === filterOption.key
                  ? 'bg-primary text-white' :'bg-secondary-100 text-secondary hover:bg-secondary-200'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <Icon name="Bell" size={48} color="var(--color-secondary-300)" />
            <p className="text-text-secondary mt-2">No notifications</p>
            <p className="text-text-muted text-sm">You're all caught up!</p>
          </div>
        ) : (
          <div className="divide-y divide-border-light">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-secondary-50 transition-smooth cursor-pointer ${
                  !notification.read ? 'bg-primary-50/30' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`mt-0.5 ${getNotificationColor(notification.type)}`}>
                    <Icon name={getNotificationIcon(notification.type)} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-text-primary">
                            {notification.title}
                          </p>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityBadge(notification.priority)}`}>
                            {notification.priority}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-text-muted">
                            {formatTimestamp(notification.timestamp)}
                          </p>
                          <span className="text-xs text-text-muted capitalize">
                            {notification.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                        <button className="p-1 text-text-muted hover:text-text-secondary hover:bg-secondary-100 rounded transition-smooth">
                          <Icon name="X" size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border p-3">
        <button className="w-full text-center text-sm text-accent hover:text-accent-600 font-medium py-2">
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationCenter;
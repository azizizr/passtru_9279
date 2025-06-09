import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const NotificationCenter = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  // Simulated real-time notifications
  useEffect(() => {
    const initialNotifications = [
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
        title: 'New Event Registration',
        message: 'Tech Conference 2024 received 25 new registrations in the last hour.',
        type: 'info',
        category: 'events',
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
        title: 'Check-in Milestone',
        message: 'Corporate Summit has reached 500 check-ins!',
        type: 'success',
        category: 'events',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: true,
        priority: 'medium'
      },
      {
        id: 5,
        title: 'Scanner Offline',
        message: 'QR scanner at Gate B is currently offline. Please check connection.',
        type: 'error',
        category: 'operations',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        read: false,
        priority: 'high'
      }
    ];

    setNotifications(initialNotifications);

    // Simulate real-time updates
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        title: 'Real-time Update',
        message: 'New check-in activity detected.',
        type: 'info',
        category: 'operations',
        timestamp: new Date(),
        read: false,
        priority: 'medium'
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

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
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.category === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const clearNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1002 lg:relative lg:inset-auto">
      {/* Mobile Overlay */}
      <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Notification Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-surface shadow-elevation-4 border-l border-border lg:absolute lg:top-2 lg:right-0 lg:h-auto lg:max-h-96 lg:rounded-lg lg:border animate-slide-down">
        
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
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-accent hover:text-accent-600 font-medium"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded transition-smooth"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-border">
          <div className="flex space-x-2 overflow-x-auto">
            {[
              { key: 'all', label: 'All' },
              { key: 'unread', label: 'Unread' },
              { key: 'operations', label: 'Operations' },
              { key: 'events', label: 'Events' },
              { key: 'system', label: 'System' }
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
        <div className="flex-1 overflow-y-auto max-h-80">
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-pulse-gentle">
                <Icon name="Loader2" size={24} color="#64748B" className="animate-spin" />
              </div>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <Icon name="Bell" size={48} color="#CBD5E1" />
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
                  onClick={() => markAsRead(notification.id)}
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
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              clearNotification(notification.id);
                            }}
                            className="p-1 text-text-muted hover:text-text-secondary hover:bg-secondary-100 rounded transition-smooth"
                          >
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
            View notification settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
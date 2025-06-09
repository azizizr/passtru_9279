import React, { useState } from 'react';
import Icon from '../AppIcon';

const Header = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications] = useState([
    {
      id: 1,
      title: 'New Event Registration',
      message: 'Tech Conference 2024 has 15 new registrations',
      time: '2 minutes ago',
      type: 'info',
      unread: true
    },
    {
      id: 2,
      title: 'Check-in Alert',
      message: 'High volume check-ins detected at Main Entrance',
      time: '5 minutes ago',
      type: 'warning',
      unread: true
    },
    {
      id: 3,
      title: 'System Update',
      message: 'Platform maintenance scheduled for tonight',
      time: '1 hour ago',
      type: 'info',
      unread: false
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationOpen(false);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const handleSettings = () => {
    console.log('Settings clicked');
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning':
        return 'AlertTriangle';
      case 'success':
        return 'CheckCircle';
      case 'error':
        return 'XCircle';
      default:
        return 'Info';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'warning':
        return 'text-warning';
      case 'success':
        return 'text-success';
      case 'error':
        return 'text-error';
      default:
        return 'text-accent';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-1000">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-text-primary">EventFlow</span>
              <span className="text-xs text-text-secondary">Management Platform</span>
            </div>
          </div>
        </div>

        {/* Context Information */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-2 bg-secondary-50 rounded-lg">
            <Icon name="Building2" size={16} color="#64748B" />
            <span className="text-sm font-medium text-text-secondary">Acme Corporation</span>
          </div>
          <div className="flex items-center space-x-2 px-3 py-2 bg-primary-50 rounded-lg">
            <Icon name="Users" size={16} color="#2563EB" />
            <span className="text-sm font-medium text-primary">Super Admin</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Quick Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-smooth">
              <Icon name="Search" size={20} />
            </button>
            <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-smooth">
              <Icon name="Plus" size={20} />
            </button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={handleNotificationClick}
              className="relative p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-smooth"
            >
              <Icon name="Bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-surface rounded-lg shadow-elevation-4 border border-border z-1001 animate-slide-down">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-text-primary">Notifications</h3>
                    <button className="text-xs text-accent hover:text-accent-600 font-medium">
                      Mark all read
                    </button>
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-border-light hover:bg-secondary-50 transition-smooth cursor-pointer ${
                        notification.unread ? 'bg-primary-50/30' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`mt-0.5 ${getNotificationColor(notification.type)}`}>
                          <Icon name={getNotificationIcon(notification.type)} size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-text-primary truncate">
                              {notification.title}
                            </p>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-primary rounded-full ml-2"></div>
                            )}
                          </div>
                          <p className="text-sm text-text-secondary mt-1">{notification.message}</p>
                          <p className="text-xs text-text-muted mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <button className="w-full text-center text-sm text-accent hover:text-accent-600 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={handleProfileClick}
              className="flex items-center space-x-2 p-2 hover:bg-secondary-50 rounded-lg transition-smooth"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-white">JD</span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-text-primary">John Doe</p>
                <p className="text-xs text-text-secondary">john@acme.com</p>
              </div>
              <Icon name="ChevronDown" size={16} color="#64748B" />
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-surface rounded-lg shadow-elevation-4 border border-border z-1001 animate-slide-down">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-white">JD</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">John Doe</p>
                      <p className="text-xs text-text-secondary">Super Administrator</p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <button
                    onClick={handleSettings}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-smooth"
                  >
                    <Icon name="Settings" size={16} />
                    <span>Account Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-smooth">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-smooth">
                    <Icon name="FileText" size={16} />
                    <span>Documentation</span>
                  </button>
                </div>
                <div className="border-t border-border py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-error hover:bg-error-50 transition-smooth"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
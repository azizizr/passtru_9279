import React, { useState } from 'react';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import QuickActionToolbar from 'components/ui/QuickActionToolbar';
import Icon from 'components/AppIcon';
import MetricsCard from './components/MetricsCard';
import RecentActivity from './components/RecentActivity';
import ClientOverview from './components/ClientOverview';
import EmailPerformance from './components/EmailPerformance';
import NotificationCenter from './components/NotificationCenter';
import PendingApprovals from './components/PendingApprovals';

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('activity');
  const [showNotifications, setShowNotifications] = useState(false);

  const systemMetrics = [
    {
      id: 'total-clients',
      title: 'Total Clients',
      value: '247',
      change: '+12',
      changeType: 'increase',
      icon: 'Building2',
      color: 'primary'
    },
    {
      id: 'active-events',
      title: 'Active Events',
      value: '89',
      change: '+5',
      changeType: 'increase',
      icon: 'Calendar',
      color: 'success'
    },
    {
      id: 'total-checkins',
      title: 'Total Check-ins Today',
      value: '12,847',
      change: '+1,234',
      changeType: 'increase',
      icon: 'UserCheck',
      color: 'accent'
    },
    {
      id: 'system-health',
      title: 'System Health',
      value: '99.8%',
      change: '+0.2%',
      changeType: 'increase',
      icon: 'Activity',
      color: 'success'
    }
  ];

  const tabs = [
    { id: 'activity', label: 'Recent Activity', icon: 'Activity' },
    { id: 'clients', label: 'Client Overview', icon: 'Building2' },
    { id: 'email', label: 'Email Performance', icon: 'Mail' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16">
        <div className="p-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6">
            <Icon name="Home" size={16} />
            <Icon name="ChevronRight" size={14} />
            <span className="text-text-primary font-medium">Super Admin Dashboard</span>
          </nav>

          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">System Overview</h1>
              <p className="text-text-secondary">
                Monitor platform performance and manage client operations
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <div className="flex items-center space-x-2 px-3 py-2 bg-success-50 rounded-lg">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-success">All Systems Operational</span>
              </div>
              
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-smooth"
              >
                <Icon name="Bell" size={20} />
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  3
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content Area */}
            <div className="xl:col-span-3 space-y-6">
              {/* Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {systemMetrics.map((metric) => (
                  <MetricsCard key={metric.id} metric={metric} />
                ))}
              </div>

              {/* Tabbed Content */}
              <div className="bg-surface rounded-lg shadow-elevation-2 border border-border">
                {/* Tab Navigation */}
                <div className="border-b border-border">
                  <nav className="flex space-x-8 px-6">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-smooth ${
                          activeTab === tab.id
                            ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        <Icon 
                          name={tab.icon} 
                          size={16} 
                          color={activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-secondary)'} 
                        />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'activity' && <RecentActivity />}
                  {activeTab === 'clients' && <ClientOverview />}
                  {activeTab === 'email' && <EmailPerformance />}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="xl:col-span-1 space-y-6">
              {/* Notification Center */}
              {showNotifications && (
                <NotificationCenter onClose={() => setShowNotifications(false)} />
              )}
              
              {/* Pending Approvals */}
              <PendingApprovals />

              {/* Quick Stats */}
              <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Server Uptime</span>
                    <span className="text-sm font-medium text-success">99.98%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">API Response Time</span>
                    <span className="text-sm font-medium text-text-primary">142ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Database Load</span>
                    <span className="text-sm font-medium text-warning">68%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Storage Used</span>
                    <span className="text-sm font-medium text-text-primary">2.4TB</span>
                  </div>
                </div>
              </div>

              {/* System Actions */}
              <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">System Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center space-x-3 p-3 text-left bg-primary-50 text-primary rounded-lg hover:bg-primary-100 transition-smooth">
                    <Icon name="Plus" size={16} />
                    <span className="text-sm font-medium">Add New Client</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 text-left bg-secondary-50 text-secondary rounded-lg hover:bg-secondary-100 transition-smooth">
                    <Icon name="Megaphone" size={16} />
                    <span className="text-sm font-medium">System Announcement</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 text-left bg-accent-50 text-accent rounded-lg hover:bg-accent-100 transition-smooth">
                    <Icon name="Download" size={16} />
                    <span className="text-sm font-medium">Export Reports</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 text-left bg-warning-50 text-warning rounded-lg hover:bg-warning-100 transition-smooth">
                    <Icon name="Settings" size={16} />
                    <span className="text-sm font-medium">System Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <QuickActionToolbar context="admin" />
    </div>
  );
};

export default SuperAdminDashboard;
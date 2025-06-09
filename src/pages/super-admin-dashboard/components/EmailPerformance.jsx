import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from 'components/AppIcon';

const EmailPerformance = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const deliveryData = [
    { name: 'Mon', delivered: 1240, failed: 23, bounced: 8 },
    { name: 'Tue', delivered: 1580, failed: 31, bounced: 12 },
    { name: 'Wed', delivered: 1820, failed: 18, bounced: 6 },
    { name: 'Thu', delivered: 2100, failed: 45, bounced: 15 },
    { name: 'Fri', delivered: 1950, failed: 28, bounced: 9 },
    { name: 'Sat', delivered: 1650, failed: 22, bounced: 7 },
    { name: 'Sun', delivered: 1420, failed: 19, bounced: 5 }
  ];

  const openRateData = [
    { name: 'Mon', rate: 68.5 },
    { name: 'Tue', rate: 71.2 },
    { name: 'Wed', rate: 69.8 },
    { name: 'Thu', rate: 73.1 },
    { name: 'Fri', rate: 70.4 },
    { name: 'Sat', rate: 66.9 },
    { name: 'Sun', rate: 68.7 }
  ];

  const emailTypeData = [
    { name: 'Confirmation', value: 45, color: 'var(--color-primary)' },
    { name: 'Reminder', value: 30, color: 'var(--color-accent)' },
    { name: 'Check-in', value: 15, color: 'var(--color-success)' },
    { name: 'Follow-up', value: 10, color: 'var(--color-warning)' }
  ];

  const emailStats = [
    {
      id: 'total-sent',
      title: 'Total Emails Sent',
      value: '12,847',
      change: '+8.2%',
      changeType: 'increase',
      icon: 'Mail',
      color: 'primary'
    },
    {
      id: 'delivery-rate',
      title: 'Delivery Rate',
      value: '98.2%',
      change: '+0.5%',
      changeType: 'increase',
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      id: 'open-rate',
      title: 'Open Rate',
      value: '69.8%',
      change: '-1.2%',
      changeType: 'decrease',
      icon: 'Eye',
      color: 'accent'
    },
    {
      id: 'bounce-rate',
      title: 'Bounce Rate',
      value: '1.8%',
      change: '-0.3%',
      changeType: 'decrease',
      icon: 'AlertTriangle',
      color: 'warning'
    }
  ];

  const recentIssues = [
    {
      id: 1,
      type: 'SMTP Timeout',
      count: 23,
      client: 'University of Excellence',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      severity: 'high'
    },
    {
      id: 2,
      type: 'Invalid Email Address',
      count: 8,
      client: 'TechCorp Solutions',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      severity: 'medium'
    },
    {
      id: 3,
      type: 'Rate Limit Exceeded',
      count: 12,
      client: 'GlobalEvents Inc',
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      severity: 'high'
    }
  ];

  const getStatColor = (color) => {
    switch (color) {
      case 'primary':
        return 'text-primary bg-primary-50';
      case 'success':
        return 'text-success bg-success-50';
      case 'accent':
        return 'text-accent bg-accent-50';
      case 'warning':
        return 'text-warning bg-warning-50';
      default:
        return 'text-secondary bg-secondary-50';
    }
  };

  const getIconColor = (color) => {
    switch (color) {
      case 'primary':
        return 'var(--color-primary)';
      case 'success':
        return 'var(--color-success)';
      case 'accent':
        return 'var(--color-accent)';
      case 'warning':
        return 'var(--color-warning)';
      default:
        return 'var(--color-secondary)';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-error bg-error-50 border-error-200';
      case 'medium':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'low':
        return 'text-success bg-success-50 border-success-200';
      default:
        return 'text-secondary bg-secondary-50 border-secondary-200';
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

  return (
    <div>
      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <h3 className="text-lg font-semibold text-text-primary">Email Delivery Analytics</h3>
        
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            {[
              { key: '24h', label: '24h' },
              { key: '7d', label: '7d' },
              { key: '30d', label: '30d' },
              { key: '90d', label: '90d' }
            ].map((range) => (
              <button
                key={range.key}
                onClick={() => setTimeRange(range.key)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-smooth ${
                  timeRange === range.key
                    ? 'bg-primary text-white' :'bg-secondary-100 text-secondary hover:bg-secondary-200'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-600 transition-smooth">
            <Icon name="Download" size={16} color="white" />
            <span className="text-sm font-medium">Export Report</span>
          </button>
        </div>
      </div>

      {/* Email Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {emailStats.map((stat) => (
          <div key={stat.id} className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStatColor(stat.color)}`}>
                <Icon name={stat.icon} size={24} color={getIconColor(stat.color)} />
              </div>
              <div className={`flex items-center space-x-1 ${
                stat.changeType === 'increase' ? 'text-success' : 'text-error'
              }`}>
                <Icon name={stat.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} size={16} />
                <span className="text-sm font-medium">{stat.change}</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-1">{stat.value}</h3>
              <p className="text-sm text-text-secondary">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Email Delivery Chart */}
        <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
          <h4 className="text-lg font-semibold text-text-primary mb-4">Email Delivery Status</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deliveryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-text-secondary)" />
                <YAxis stroke="var(--color-text-secondary)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="delivered" fill="var(--color-success)" name="Delivered" />
                <Bar dataKey="failed" fill="var(--color-error)" name="Failed" />
                <Bar dataKey="bounced" fill="var(--color-warning)" name="Bounced" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Open Rate Trend */}
        <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
          <h4 className="text-lg font-semibold text-text-primary mb-4">Open Rate Trend</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={openRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-text-secondary)" />
                <YAxis stroke="var(--color-text-secondary)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="var(--color-accent)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
                  name="Open Rate (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Email Type Distribution */}
        <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
          <h4 className="text-lg font-semibold text-text-primary mb-4">Email Type Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={emailTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {emailTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {emailTypeData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-text-secondary">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-text-primary">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Issues */}
        <div className="lg:col-span-2 bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-text-primary">Recent Delivery Issues</h4>
            <button className="text-sm text-accent hover:text-accent-600 font-medium">
              View All Issues
            </button>
          </div>
          
          <div className="space-y-4">
            {recentIssues.map((issue) => (
              <div key={issue.id} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getSeverityColor(issue.severity)}`}>
                    <Icon name="AlertTriangle" size={18} />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-text-primary">{issue.type}</h5>
                    <p className="text-sm text-text-secondary">{issue.client}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium text-text-primary">{issue.count} emails</div>
                  <div className="text-xs text-text-muted">{formatTimestamp(issue.timestamp)}</div>
                </div>
              </div>
            ))}
          </div>
          
          {recentIssues.length === 0 && (
            <div className="text-center py-8">
              <Icon name="CheckCircle" size={48} color="var(--color-success)" />
              <p className="text-text-secondary mt-2">No delivery issues detected</p>
              <p className="text-text-muted text-sm">All email services are running smoothly</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailPerformance;
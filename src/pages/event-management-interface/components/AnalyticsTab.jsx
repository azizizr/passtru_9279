// src/pages/event-management-interface/components/AnalyticsTab.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AnalyticsTab = ({ eventData, eventStats }) => {
  const [activeMetric, setActiveMetric] = useState('overview');
  const [dateRange, setDateRange] = useState('7');

  // Mock analytics data
  const registrationData = [
    { date: '2024-02-10', registrations: 12, cancellations: 1 },
    { date: '2024-02-11', registrations: 18, cancellations: 2 },
    { date: '2024-02-12', registrations: 25, cancellations: 0 },
    { date: '2024-02-13', registrations: 31, cancellations: 3 },
    { date: '2024-02-14', registrations: 28, cancellations: 1 },
    { date: '2024-02-15', registrations: 35, cancellations: 2 },
    { date: '2024-02-16', registrations: 42, cancellations: 1 }
  ];

  const attendeeSourceData = [
    { name: 'Direct Link', value: 45, color: '#2563EB' },
    { name: 'Email Campaign', value: 30, color: '#059669' },
    { name: 'Social Media', value: 15, color: '#D97706' },
    { name: 'Partner Referral', value: 10, color: '#7C3AED' }
  ];

  const checkInTimeData = [
    { hour: '8:00', checkIns: 15 },
    { hour: '8:30', checkIns: 32 },
    { hour: '9:00', checkIns: 58 },
    { hour: '9:30', checkIns: 42 },
    { hour: '10:00', checkIns: 28 },
    { hour: '10:30', checkIns: 35 },
    { hour: '11:00', checkIns: 22 }
  ];

  const engagementMetrics = [
    {
      metric: 'Email Open Rate',
      value: '68.5%',
      change: '+5.2%',
      changeType: 'positive',
      icon: 'Mail'
    },
    {
      metric: 'Click-through Rate',
      value: '24.3%',
      change: '+2.1%',
      changeType: 'positive',
      icon: 'MousePointer'
    },
    {
      metric: 'Registration Conversion',
      value: '85.7%',
      change: '-1.2%',
      changeType: 'negative',
      icon: 'UserPlus'
    },
    {
      metric: 'Average Session Duration',
      value: '4.2 min',
      change: '+0.8 min',
      changeType: 'positive',
      icon: 'Clock'
    }
  ];

  const geographicData = [
    { location: 'New York', attendees: 89, percentage: 25.6 },
    { location: 'California', attendees: 76, percentage: 21.9 },
    { location: 'Texas', attendees: 52, percentage: 15.0 },
    { location: 'Florida', attendees: 38, percentage: 10.9 },
    { location: 'Illinois', attendees: 31, percentage: 8.9 },
    { location: 'Other', attendees: 61, percentage: 17.6 }
  ];

  const deviceData = [
    { device: 'Desktop', count: 198, percentage: 57.0 },
    { device: 'Mobile', count: 125, percentage: 36.0 },
    { device: 'Tablet', count: 24, percentage: 7.0 }
  ];

  const getChangeColor = (type) => {
    return type === 'positive' ? 'text-success' : 'text-error';
  };

  const getChangeIcon = (type) => {
    return type === 'positive' ? 'TrendingUp' : 'TrendingDown';
  };

  const metrics = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'registrations', label: 'Registrations', icon: 'UserPlus' },
    { id: 'engagement', label: 'Engagement', icon: 'MousePointer' },
    { id: 'demographics', label: 'Demographics', icon: 'Users' }
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Navigation */}
      <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-wrap gap-2">
            {metrics?.map((metric) => (
              <button
                key={metric?.id}
                onClick={() => setActiveMetric(metric?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-smooth ${
                  activeMetric === metric?.id
                    ? 'bg-primary text-white' :'bg-secondary-100 text-secondary hover:bg-secondary-200'
                }`}
              >
                <Icon name={metric?.icon} size={16} color={activeMetric === metric?.id ? 'white' : undefined} />
                <span>{metric?.label}</span>
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-secondary-50 text-secondary hover:bg-secondary-100 rounded-lg font-medium transition-smooth">
              <Icon name="Download" size={16} />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      {activeMetric === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-medium">Total Registrations</p>
                  <p className="text-2xl font-bold text-text-primary">{eventStats?.registered || 0}</p>
                  <p className="text-xs text-success font-medium mt-1">+12% from last event</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={24} color="#2563EB" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-medium">Check-in Rate</p>
                  <p className="text-2xl font-bold text-text-primary">
                    {eventStats?.registered ? ((eventStats?.checkedIn || 0) / eventStats?.registered * 100).toFixed(1) : 0}%
                  </p>
                  <p className="text-xs text-accent font-medium mt-1">Above industry average</p>
                </div>
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                  <Icon name="UserCheck" size={24} color="#059669" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-medium">Engagement Score</p>
                  <p className="text-2xl font-bold text-text-primary">8.4<span className="text-lg text-text-secondary">/10</span></p>
                  <p className="text-xs text-success font-medium mt-1">+0.3 improvement</p>
                </div>
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={24} color="#0EA5E9" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-medium">Revenue Impact</p>
                  <p className="text-2xl font-bold text-text-primary">$24.8K</p>
                  <p className="text-xs text-success font-medium mt-1">ROI: 285%</p>
                </div>
                <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                  <Icon name="DollarSign" size={24} color="#D97706" />
                </div>
              </div>
            </div>
          </div>

          {/* Registration Trend */}
          <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-6">Registration Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={registrationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="registrations" 
                    stroke="#2563EB" 
                    strokeWidth={2}
                    dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cancellations" 
                    stroke="#EF4444" 
                    strokeWidth={2}
                    dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Registrations Section */}
      {activeMetric === 'registrations' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Registration Sources */}
            <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-6">Registration Sources</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={attendeeSourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {attendeeSourceData?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry?.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#F9FAFB',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {attendeeSourceData?.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: source?.color }}
                      ></div>
                      <span className="text-sm text-text-secondary">{source?.name}</span>
                    </div>
                    <span className="text-sm font-medium text-text-primary">{source?.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Check-in Timeline */}
            <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-6">Check-in Timeline</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={checkInTimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="hour" stroke="#6B7280" fontSize={12} />
                    <YAxis stroke="#6B7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#F9FAFB',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="checkIns" fill="#059669" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Engagement Section */}
      {activeMetric === 'engagement' && (
        <div className="space-y-6">
          {/* Engagement Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {engagementMetrics?.map((metric, index) => (
              <div key={index} className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Icon name={metric?.icon} size={24} color="#2563EB" />
                  </div>
                  <div className={`flex items-center space-x-1 ${getChangeColor(metric?.changeType)}`}>
                    <Icon name={getChangeIcon(metric?.changeType)} size={14} />
                    <span className="text-sm font-medium">{metric?.change}</span>
                  </div>
                </div>
                <div>
                  <p className="text-text-secondary text-sm font-medium">{metric?.metric}</p>
                  <p className="text-2xl font-bold text-text-primary">{metric?.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Device Usage */}
          <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-6">Device Usage</h3>
            <div className="space-y-4">
              {deviceData?.map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name={device?.device === 'Desktop' ? 'Monitor' : device?.device === 'Mobile' ? 'Smartphone' : 'Tablet'} size={20} color="#64748B" />
                    <span className="font-medium text-text-primary">{device?.device}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-secondary-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${device?.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-text-secondary w-12 text-right">{device?.percentage}%</span>
                    <span className="text-sm font-medium text-text-primary w-8 text-right">{device?.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Demographics Section */}
      {activeMetric === 'demographics' && (
        <div className="space-y-6">
          {/* Geographic Distribution */}
          <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-6">Geographic Distribution</h3>
            <div className="space-y-4">
              {geographicData?.map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name="MapPin" size={16} color="#64748B" />
                    <span className="font-medium text-text-primary">{location?.location}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-secondary-200 rounded-full h-2">
                      <div 
                        className="bg-accent h-2 rounded-full transition-all duration-300"
                        style={{ width: `${location?.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-text-secondary w-12 text-right">{location?.percentage}%</span>
                    <span className="text-sm font-medium text-text-primary w-8 text-right">{location?.attendees}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Age Distribution */}
          <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-6">Age Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { age: '18-25', count: 45 },
                  { age: '26-35', count: 89 },
                  { age: '36-45', count: 124 },
                  { age: '46-55', count: 67 },
                  { age: '56+', count: 22 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="age" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="count" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsTab;
// src/pages/event-management-interface/components/CheckInControlTab.jsx
import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const CheckInControlTab = ({ eventData, eventStats, setEventStats }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [liveMode, setLiveMode] = useState(true);
  const [recentCheckIns, setRecentCheckIns] = useState([
    {
      id: 1,
      name: 'Alice Wilson',
      email: 'alice.wilson@email.com',
      checkInTime: new Date(Date.now() - 300000), // 5 minutes ago
      method: 'qr',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 2,
      name: 'Bob Thompson',
      email: 'bob.thompson@email.com',
      checkInTime: new Date(Date.now() - 600000), // 10 minutes ago
      method: 'manual',
      avatar: 'https://images.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 3,
      name: 'Carol Davis',
      email: 'carol.davis@email.com',
      checkInTime: new Date(Date.now() - 900000), // 15 minutes ago
      method: 'qr',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b784?w=100&h=100&fit=crop&crop=center'
    }
  ]);

  const [hourlyStats, setHourlyStats] = useState([
    { hour: '8:00', checkIns: 12 },
    { hour: '9:00', checkIns: 45 },
    { hour: '10:00', checkIns: 78 },
    { hour: '11:00', checkIns: 32 },
    { hour: '12:00', checkIns: 15 },
  ]);

  // Mock attendees for manual check-in
  const [attendeesList] = useState([
    { id: 1, name: 'John Smith', email: 'john.smith@email.com', status: 'registered' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@email.com', status: 'registered' },
    { id: 3, name: 'Mike Davis', email: 'mike.davis@email.com', status: 'checked-in' },
    { id: 4, name: 'Emily Chen', email: 'emily.chen@email.com', status: 'registered' },
  ]);

  const filteredAttendees = attendeesList?.filter(attendee => 
    attendee?.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
    attendee?.email?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const handleManualCheckIn = (attendeeId) => {
    const newCheckIn = {
      id: Date.now(),
      name: attendeesList?.find(a => a?.id === attendeeId)?.name,
      email: attendeesList?.find(a => a?.id === attendeeId)?.email,
      checkInTime: new Date(),
      method: 'manual',
      avatar: null
    };
    
    setRecentCheckIns(prev => [newCheckIn, ...prev?.slice(0, 9)]);
    setEventStats?.(prev => ({
      ...prev,
      checkedIn: (prev?.checkedIn || 0) + 1
    }));
  };

  const generateQRCode = () => {
    console.log('Generate QR codes for event');
  };

  const exportCheckInData = () => {
    console.log('Export check-in data');
  };

  const getCheckInRate = () => {
    if (!eventStats?.registered || eventStats?.registered === 0) return 0;
    return ((eventStats?.checkedIn || 0) / eventStats?.registered * 100).toFixed(1);
  };

  const getMethodIcon = (method) => {
    return method === 'qr' ? 'QrCode' : 'UserCheck';
  };

  const getMethodColor = (method) => {
    return method === 'qr' ? 'text-primary' : 'text-accent';
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Live Dashboard Header */}
      <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${liveMode ? 'bg-success animate-pulse' : 'bg-secondary'}`}></div>
              <h2 className="text-xl font-semibold text-text-primary">
                {liveMode ? 'Live Check-in Dashboard' : 'Check-in Dashboard'}
              </h2>
            </div>
            <button
              onClick={() => setLiveMode(!liveMode)}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-smooth ${
                liveMode 
                  ? 'bg-success-100 text-success' :'bg-secondary-100 text-secondary hover:bg-secondary-200'
              }`}
            >
              {liveMode ? 'Live Mode' : 'Static Mode'}
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={exportCheckInData}
              className="flex items-center space-x-2 px-4 py-2 bg-secondary-50 text-secondary hover:bg-secondary-100 rounded-lg font-medium transition-smooth"
            >
              <Icon name="Download" size={16} />
              <span>Export Data</span>
            </button>
            <button
              onClick={generateQRCode}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white hover:bg-primary-700 rounded-lg font-medium transition-smooth"
            >
              <Icon name="QrCode" size={16} color="white" />
              <span>Generate QR Codes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm font-medium">Total Check-ins</p>
              <p className="text-2xl font-bold text-text-primary">{eventStats?.checkedIn || 0}</p>
              <p className="text-xs text-success font-medium mt-1">+{recentCheckIns?.length || 0} in last hour</p>
            </div>
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <Icon name="UserCheck" size={24} color="#059669" />
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm font-medium">Check-in Rate</p>
              <p className="text-2xl font-bold text-text-primary">{getCheckInRate()}%</p>
              <p className="text-xs text-accent font-medium mt-1">of registered attendees</p>
            </div>
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={24} color="#0EA5E9" />
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm font-medium">Remaining</p>
              <p className="text-2xl font-bold text-text-primary">
                {(eventStats?.registered || 0) - (eventStats?.checkedIn || 0)}
              </p>
              <p className="text-xs text-warning font-medium mt-1">still to check in</p>
            </div>
            <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={24} color="#D97706" />
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm font-medium">Avg. Time</p>
              <p className="text-2xl font-bold text-text-primary">1.2<span className="text-lg text-text-secondary">min</span></p>
              <p className="text-xs text-success font-medium mt-1">per check-in</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon name="Timer" size={24} color="#2563EB" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Manual Check-in Interface */}
        <div className="bg-surface rounded-lg shadow-elevation-2 border border-border">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Manual Check-in</h3>
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search attendees by name or email..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {filteredAttendees?.map((attendee) => (
              <div key={attendee?.id} className="flex items-center justify-between p-4 border-b border-border-light hover:bg-secondary-50 transition-smooth">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center">
                    <Icon name="User" size={20} color="#64748B" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{attendee?.name}</p>
                    <p className="text-sm text-text-secondary">{attendee?.email}</p>
                  </div>
                </div>
                
                {attendee?.status === 'checked-in' ? (
                  <div className="flex items-center space-x-2 text-success">
                    <Icon name="CheckCircle" size={16} color="#059669" />
                    <span className="text-sm font-medium">Checked In</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleManualCheckIn(attendee?.id)}
                    className="flex items-center space-x-2 px-3 py-1.5 bg-primary text-white hover:bg-primary-700 rounded-lg text-sm font-medium transition-smooth"
                  >
                    <Icon name="UserCheck" size={14} color="white" />
                    <span>Check In</span>
                  </button>
                )}
              </div>
            ))}
            
            {filteredAttendees?.length === 0 && (
              <div className="p-8 text-center">
                <Icon name="Search" size={48} color="#CBD5E1" className="mx-auto mb-4" />
                <p className="text-text-secondary">No attendees found</p>
                <p className="text-sm text-text-muted">Try adjusting your search terms</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Check-ins */}
        <div className="bg-surface rounded-lg shadow-elevation-2 border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary">Recent Check-ins</h3>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>Live updates</span>
              </div>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {recentCheckIns?.map((checkIn) => (
              <div key={checkIn?.id} className="flex items-center space-x-3 p-4 border-b border-border-light hover:bg-secondary-50 transition-smooth">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary-100 flex items-center justify-center">
                  {checkIn?.avatar ? (
                    <Image 
                      src={checkIn.avatar} 
                      alt={checkIn.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Icon name="User" size={20} color="#64748B" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-text-primary">{checkIn?.name}</p>
                  <p className="text-sm text-text-secondary">{checkIn?.email}</p>
                </div>
                <div className="text-right">
                  <div className={`flex items-center space-x-1 ${getMethodColor(checkIn?.method)}`}>
                    <Icon name={getMethodIcon(checkIn?.method)} size={14} />
                    <span className="text-xs font-medium uppercase">{checkIn?.method}</span>
                  </div>
                  <p className="text-xs text-text-muted">{formatTimeAgo(checkIn?.checkInTime)}</p>
                </div>
              </div>
            ))}
            
            {recentCheckIns?.length === 0 && (
              <div className="p-8 text-center">
                <Icon name="UserCheck" size={48} color="#CBD5E1" className="mx-auto mb-4" />
                <p className="text-text-secondary">No recent check-ins</p>
                <p className="text-sm text-text-muted">Check-ins will appear here in real-time</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* QR Code Management */}
      <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">QR Code Management</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 bg-white border-2 border-border rounded-lg flex items-center justify-center">
              <Icon name="QrCode" size={48} color="#2563EB" />
            </div>
            <h4 className="font-medium text-text-primary mb-2">Event QR Code</h4>
            <p className="text-sm text-text-secondary mb-4">Primary check-in QR code for the event</p>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-primary text-white hover:bg-primary-700 rounded-lg text-sm font-medium transition-smooth">
                Download PNG
              </button>
              <button className="w-full px-4 py-2 bg-secondary-100 text-secondary hover:bg-secondary-200 rounded-lg text-sm font-medium transition-smooth">
                Download SVG
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 bg-white border-2 border-border rounded-lg flex items-center justify-center">
              <Icon name="Users" size={48} color="#059669" />
            </div>
            <h4 className="font-medium text-text-primary mb-2">Bulk QR Codes</h4>
            <p className="text-sm text-text-secondary mb-4">Individual QR codes for each attendee</p>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-success text-white hover:bg-success-700 rounded-lg text-sm font-medium transition-smooth">
                Generate All
              </button>
              <button className="w-full px-4 py-2 bg-secondary-100 text-secondary hover:bg-secondary-200 rounded-lg text-sm font-medium transition-smooth">
                Email to Attendees
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 bg-white border-2 border-border rounded-lg flex items-center justify-center">
              <Icon name="Settings" size={48} color="#D97706" />
            </div>
            <h4 className="font-medium text-text-primary mb-2">QR Settings</h4>
            <p className="text-sm text-text-secondary mb-4">Configure QR code behavior and styling</p>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-warning text-white hover:bg-warning-700 rounded-lg text-sm font-medium transition-smooth">
                Configure
              </button>
              <button className="w-full px-4 py-2 bg-secondary-100 text-secondary hover:bg-secondary-200 rounded-lg text-sm font-medium transition-smooth">
                Test Scan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInControlTab;
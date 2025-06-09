import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import RecentActivity from './components/RecentActivity';
import MetricCard from './components/MetricCard';
import QuickActions from './components/QuickActions';
import AttendeeSearch from './components/AttendeeSearch';

const LiveCheckInDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);
  const [showManualCheckIn, setShowManualCheckIn] = useState(false);
  const [showHelpDesk, setShowHelpDesk] = useState(false);
  const [checkInStats, setCheckInStats] = useState({
    totalAttendees: 1250,
    checkedIn: 847,
    pending: 403,
    checkInRate: 67.8
  });

  const eventData = {
    name: "Tech Conference 2024",
    venue: "Convention Center Hall A",
    date: "March 15, 2024",
    startTime: "09:00 AM",
    endTime: "06:00 PM"
  };

  const staffProfile = {
    name: "Sarah Johnson",
    role: "Event Coordinator",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  };

  const recentCheckIns = [
    {
      id: 1,
      name: "Michael Rodriguez",
      email: "michael.r@company.com",
      checkInTime: new Date(Date.now() - 2 * 60 * 1000),
      method: "QR Code",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      id: 2,
      name: "Emily Chen",
      email: "emily.chen@techcorp.com",
      checkInTime: new Date(Date.now() - 5 * 60 * 1000),
      method: "Manual ID",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg"
    },
    {
      id: 3,
      name: "David Thompson",
      email: "d.thompson@startup.io",
      checkInTime: new Date(Date.now() - 8 * 60 * 1000),
      method: "QR Code",
      avatar: "https://randomuser.me/api/portraits/men/34.jpg"
    },
    {
      id: 4,
      name: "Lisa Wang",
      email: "lisa.wang@enterprise.com",
      checkInTime: new Date(Date.now() - 12 * 60 * 1000),
      method: "QR Code",
      avatar: "https://randomuser.me/api/portraits/women/41.jpg"
    },
    {
      id: 5,
      name: "James Miller",
      email: "james.m@consulting.com",
      checkInTime: new Date(Date.now() - 15 * 60 * 1000),
      method: "Manual ID",
      avatar: "https://randomuser.me/api/portraits/men/29.jpg"
    }
  ];

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Simulate real-time check-in updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCheckInStats(prev => ({
        ...prev,
        checkedIn: prev.checkedIn + Math.floor(Math.random() * 3),
        pending: prev.pending - Math.floor(Math.random() * 3),
        checkInRate: ((prev.checkedIn + Math.floor(Math.random() * 3)) / prev.totalAttendees * 100)
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleManualCheckIn = () => {
    setShowManualCheckIn(true);
    setShowHelpDesk(false);
  };

  const handleQRScan = () => {
    navigate('/qr-code-scanner-interface');
  };

  const handleHelpDesk = () => {
    setShowHelpDesk(true);
    setShowManualCheckIn(false);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-First Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Event Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-semibold text-text-primary truncate">
                {eventData.name}
              </h1>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="MapPin" size={14} />
                <span className="truncate">{eventData.venue}</span>
              </div>
            </div>

            {/* Current Time & Status */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-medium text-text-primary">
                  {formatTime(currentTime)}
                </div>
                <div className="text-xs text-text-secondary">
                  {formatDate(currentTime)}
                </div>
              </div>
              
              {/* Online Status */}
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-success' : 'bg-error'}`} />
              
              {/* Staff Profile */}
              <div className="flex items-center space-x-2">
                <Image
                  src={staffProfile.avatar}
                  alt={staffProfile.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-text-primary">
                    {staffProfile.name}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {staffProfile.role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Offline Banner */}
        {!isOnline && (
          <div className="bg-warning-50 border-b border-warning-200 px-4 py-2">
            <div className="flex items-center space-x-2">
              <Icon name="WifiOff" size={16} color="#D97706" />
              <span className="text-sm text-warning font-medium">
                Working offline - Data will sync when connection is restored
              </span>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="p-4 pb-20">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Total Attendees"
            value={checkInStats.totalAttendees.toLocaleString()}
            icon="Users"
            color="secondary"
          />
          <MetricCard
            title="Checked In"
            value={checkInStats.checkedIn.toLocaleString()}
            icon="UserCheck"
            color="success"
            trend="+12"
          />
          <MetricCard
            title="Pending"
            value={checkInStats.pending.toLocaleString()}
            icon="Clock"
            color="warning"
          />
          <MetricCard
            title="Check-in Rate"
            value={`${checkInStats.checkInRate.toFixed(1)}%`}
            icon="TrendingUp"
            color="primary"
            progress={checkInStats.checkInRate}
          />
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
          {/* Recent Activity - Takes 2 columns */}
          <div className="lg:col-span-2">
            <RecentActivity checkIns={recentCheckIns} />
          </div>

          {/* Quick Actions - Takes 1 column */}
          <div>
            <QuickActions
              onManualCheckIn={handleManualCheckIn}
              onQRScan={handleQRScan}
              onHelpDesk={handleHelpDesk}
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          <RecentActivity checkIns={recentCheckIns} />
        </div>

        {/* Manual Check-in Modal */}
        {showManualCheckIn && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-surface rounded-lg w-full max-w-md max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="text-lg font-semibold text-text-primary">Manual Check-in</h3>
                <button
                  onClick={() => setShowManualCheckIn(false)}
                  className="p-2 hover:bg-secondary-50 rounded-lg transition-smooth"
                >
                  <Icon name="X" size={20} color="#64748B" />
                </button>
              </div>
              <div className="p-4">
                <AttendeeSearch onCheckIn={() => setShowManualCheckIn(false)} />
              </div>
            </div>
          </div>
        )}

        {/* Help Desk Modal */}
        {showHelpDesk && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-surface rounded-lg w-full max-w-md max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="text-lg font-semibold text-text-primary">Help Desk</h3>
                <button
                  onClick={() => setShowHelpDesk(false)}
                  className="p-2 hover:bg-secondary-50 rounded-lg transition-smooth"
                >
                  <Icon name="X" size={20} color="#64748B" />
                </button>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-secondary-50 rounded-lg transition-smooth">
                    <Icon name="UserEdit" size={20} color="#64748B" />
                    <div>
                      <div className="font-medium text-text-primary">Edit Profile</div>
                      <div className="text-sm text-text-secondary">Update attendee information</div>
                    </div>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-secondary-50 rounded-lg transition-smooth">
                    <Icon name="Mail" size={20} color="#64748B" />
                    <div>
                      <div className="font-medium text-text-primary">Resend Email</div>
                      <div className="text-sm text-text-secondary">Send confirmation email again</div>
                    </div>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-secondary-50 rounded-lg transition-smooth">
                    <Icon name="AlertCircle" size={20} color="#64748B" />
                    <div>
                      <div className="font-medium text-text-primary">Report Issue</div>
                      <div className="text-sm text-text-secondary">Log technical problems</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Quick Actions - Fixed Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4">
        <QuickActions
          onManualCheckIn={handleManualCheckIn}
          onQRScan={handleQRScan}
          onHelpDesk={handleHelpDesk}
          isMobile={true}
        />
      </div>
    </div>
  );
};

export default LiveCheckInDashboard;
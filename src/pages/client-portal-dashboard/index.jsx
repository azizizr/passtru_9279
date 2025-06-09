import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import QuickActionToolbar from 'components/ui/QuickActionToolbar';
import RecentActivity from './components/RecentActivity';
import EventOverviewTable from './components/EventOverviewTable';
import MetricsWidget from './components/MetricsWidget';
import BrandingPanel from './components/BrandingPanel';

const ClientPortalDashboard = () => {
  const [showBrandingPanel, setShowBrandingPanel] = useState(false);
  const [dateRange, setDateRange] = useState('30');
  const [statusFilter, setStatusFilter] = useState('all');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');

  // Mock client data
  const clientData = {
    organization: "Acme Corporation",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
    domain: "acme.passtru.com",
    primaryColor: "#2563EB",
    secondaryColor: "#64748B"
  };

  // Mock metrics data
  const metricsData = [
    {
      id: 'upcoming-events',
      title: 'Upcoming Events',
      value: '12',
      change: '+3',
      changeType: 'positive',
      icon: 'Calendar',
      description: 'Events in next 30 days'
    },
    {
      id: 'total-attendees',
      title: 'Total Attendees',
      value: '2,847',
      change: '+156',
      changeType: 'positive',
      icon: 'Users',
      description: 'Registered this month'
    },
    {
      id: 'recent-checkins',
      title: 'Recent Check-ins',
      value: '1,234',
      change: '+89',
      changeType: 'positive',
      icon: 'UserCheck',
      description: 'Last 7 days'
    },
    {
      id: 'engagement-rate',
      title: 'Engagement Rate',
      value: '87.5%',
      change: '+2.3%',
      changeType: 'positive',
      icon: 'TrendingUp',
      description: 'Average attendance rate'
    }
  ];

  // Mock events data
  const eventsData = [
    {
      id: 1,
      name: "Annual Tech Conference 2024",
      date: "2024-03-15",
      time: "09:00 AM",
      status: "active",
      type: "conference",
      attendeeCount: 450,
      checkedIn: 0,
      capacity: 500,
      venue: "Convention Center Hall A",
      organizer: "John Smith"
    },
    {
      id: 2,
      name: "Product Launch Webinar",
      date: "2024-03-20",
      time: "02:00 PM",
      status: "draft",
      type: "webinar",
      attendeeCount: 125,
      checkedIn: 0,
      capacity: 200,
      venue: "Virtual Event",
      organizer: "Sarah Johnson"
    },
    {
      id: 3,
      name: "Q1 Team Building Workshop",
      date: "2024-02-28",
      time: "10:00 AM",
      status: "completed",
      type: "workshop",
      attendeeCount: 85,
      checkedIn: 82,
      capacity: 100,
      venue: "Training Room B",
      organizer: "Mike Davis"
    },
    {
      id: 4,
      name: "Customer Success Summit",
      date: "2024-04-05",
      time: "09:30 AM",
      status: "active",
      type: "summit",
      attendeeCount: 320,
      checkedIn: 0,
      capacity: 400,
      venue: "Grand Ballroom",
      organizer: "Emily Chen"
    },
    {
      id: 5,
      name: "Developer Meetup",
      date: "2024-03-25",
      time: "06:00 PM",
      status: "active",
      type: "meetup",
      attendeeCount: 75,
      checkedIn: 0,
      capacity: 80,
      venue: "Innovation Lab",
      organizer: "Alex Rodriguez"
    }
  ];

  const handleCreateEvent = () => {
    console.log('Create event clicked');
  };

  const handleInviteAdmin = () => {
    console.log('Invite admin clicked');
  };

  const handleBrandingConfig = () => {
    setShowBrandingPanel(true);
  };

  const filteredEvents = eventsData.filter(event => {
    if (statusFilter !== 'all' && event.status !== statusFilter) return false;
    if (eventTypeFilter !== 'all' && event.type !== eventTypeFilter) return false;
    
    const eventDate = new Date(event.date);
    const now = new Date();
    const daysAgo = new Date(now.getTime() - parseInt(dateRange) * 24 * 60 * 60 * 1000);
    
    return eventDate >= daysAgo;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16">
        <div className="p-6">
          {/* Client Header */}
          <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary-100 flex items-center justify-center">
                  <Image 
                    src={clientData.logo} 
                    alt={clientData.organization}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-text-primary">{clientData.organization}</h1>
                  <p className="text-text-secondary">{clientData.domain}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <span className="text-sm text-success font-medium">Active</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleBrandingConfig}
                  className="flex items-center space-x-2 px-4 py-2 bg-secondary-50 text-secondary hover:bg-secondary-100 rounded-lg font-medium transition-smooth"
                >
                  <Icon name="Palette" size={16} />
                  <span>Branding</span>
                </button>
                <button
                  onClick={handleInviteAdmin}
                  className="flex items-center space-x-2 px-4 py-2 bg-accent-50 text-accent hover:bg-accent-100 rounded-lg font-medium transition-smooth"
                >
                  <Icon name="UserPlus" size={16} />
                  <span>Invite Admin</span>
                </button>
                <button
                  onClick={handleCreateEvent}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-white hover:bg-primary-700 rounded-lg font-medium transition-smooth"
                >
                  <Icon name="Plus" size={16} color="white" />
                  <span>Create Event</span>
                </button>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {metricsData.map((metric) => (
              <MetricsWidget key={metric.id} metric={metric} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Filters */}
              <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <h2 className="text-lg font-semibold text-text-primary">Event Overview</h2>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
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
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <select
                      value={eventTypeFilter}
                      onChange={(e) => setEventTypeFilter(e.target.value)}
                      className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="all">All Types</option>
                      <option value="conference">Conference</option>
                      <option value="webinar">Webinar</option>
                      <option value="workshop">Workshop</option>
                      <option value="summit">Summit</option>
                      <option value="meetup">Meetup</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Events Table */}
              <EventOverviewTable events={filteredEvents} />
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              <RecentActivity />
              
              {/* Upcoming Deadlines */}
              <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-4">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Upcoming Deadlines</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-warning-50 rounded-lg border border-warning-200">
                    <Icon name="Clock" size={16} color="#D97706" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">Event Setup Due</p>
                      <p className="text-xs text-text-secondary">Tech Conference - 2 days left</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-accent-50 rounded-lg border border-accent-200">
                    <Icon name="Mail" size={16} color="#0EA5E9" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">Email Reminder</p>
                      <p className="text-xs text-text-secondary">Product Launch - Tomorrow</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-success-50 rounded-lg border border-success-200">
                    <Icon name="CheckCircle" size={16} color="#059669" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">Registration Open</p>
                      <p className="text-xs text-text-secondary">Customer Summit - 5 days</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-4">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Active Events</span>
                    <span className="text-sm font-semibold text-text-primary">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Draft Events</span>
                    <span className="text-sm font-semibold text-text-primary">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">This Month</span>
                    <span className="text-sm font-semibold text-text-primary">15</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Avg. Attendance</span>
                    <span className="text-sm font-semibold text-success">87.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Branding Panel */}
      {showBrandingPanel && (
        <BrandingPanel 
          isOpen={showBrandingPanel}
          onClose={() => setShowBrandingPanel(false)}
          clientData={clientData}
        />
      )}

      <QuickActionToolbar context="event" />
    </div>
  );
};

export default ClientPortalDashboard;
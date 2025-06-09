// src/pages/event-management-interface/index.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import QuickActionToolbar from 'components/ui/QuickActionToolbar';
import EventDetailsTab from './components/EventDetailsTab';
import AttendeeManagementTab from './components/AttendeeManagementTab';
import CheckInControlTab from './components/CheckInControlTab';
import ContentManagementTab from './components/ContentManagementTab';
import AnalyticsTab from './components/AnalyticsTab';

const EventManagementInterface = () => {
  const [activeTab, setActiveTab] = useState('event-details');
  const [eventData, setEventData] = useState({
    name: 'Annual Tech Conference 2024',
    description: 'A comprehensive technology conference featuring industry leaders and innovative solutions.',
    date: '2024-03-15',
    time: '09:00',
    endDate: '2024-03-15',
    endTime: '17:00',
    venue: 'Convention Center Hall A',
    address: '123 Convention Drive, Tech City, TC 12345',
    capacity: 500,
    status: 'draft',
    registrationDeadline: '2024-03-10',
    publicPage: true,
    requireApproval: false,
    allowWaitlist: true,
    emailReminders: true,
    categories: ['Technology', 'Innovation'],
    tags: ['conference', 'tech', 'networking']
  });

  const [eventStats, setEventStats] = useState({
    totalAttendees: 347,
    checkedIn: 0,
    registered: 347,
    pending: 23,
    confirmed: 324,
    waitlisted: 15
  });

  const tabs = [
    {
      id: 'event-details',
      label: 'Event Details',
      icon: 'Settings',
      description: 'Configure event information and settings'
    },
    {
      id: 'attendee-management',
      label: 'Attendee Management',
      icon: 'Users',
      description: 'Manage attendees and registrations',
      badge: eventStats?.pending > 0 ? eventStats.pending : null
    },
    {
      id: 'check-in-control',
      label: 'Check-in Control',
      icon: 'UserCheck',
      description: 'Real-time check-in dashboard'
    },
    {
      id: 'content-management',
      label: 'Content Management',
      icon: 'FileText',
      description: 'Manage content and announcements'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'BarChart3',
      description: 'View insights and reports'
    }
  ];

  const handlePublishEvent = () => {
    if (eventData?.status === 'draft') {
      setEventData(prev => ({ ...prev, status: 'active' }));
      console.log('Event published');
    } else {
      console.log('Event unpublished');
      setEventData(prev => ({ ...prev, status: 'draft' }));
    }
  };

  const handleSendInvitations = () => {
    console.log('Send invitations clicked');
  };

  const handlePreviewEvent = () => {
    console.log('Preview event clicked');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success text-white';
      case 'draft':
        return 'bg-warning text-white';
      case 'completed':
        return 'bg-secondary text-white';
      case 'cancelled':
        return 'bg-error text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'Published';
      case 'draft':
        return 'Draft';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'event-details':
        return (
          <EventDetailsTab 
            eventData={eventData}
            setEventData={setEventData}
          />
        );
      case 'attendee-management':
        return (
          <AttendeeManagementTab 
            eventData={eventData}
            eventStats={eventStats}
            setEventStats={setEventStats}
          />
        );
      case 'check-in-control':
        return (
          <CheckInControlTab 
            eventData={eventData}
            eventStats={eventStats}
            setEventStats={setEventStats}
          />
        );
      case 'content-management':
        return (
          <ContentManagementTab 
            eventData={eventData}
          />
        );
      case 'analytics':
        return (
          <AnalyticsTab 
            eventData={eventData}
            eventStats={eventStats}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16">
        <div className="p-6">
          {/* Event Header */}
          <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-lg bg-primary-100 flex items-center justify-center">
                  <Icon name="Calendar" size={32} color="#2563EB" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h1 className="text-2xl font-semibold text-text-primary">{eventData?.name}</h1>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(eventData?.status)}`}>
                      {getStatusLabel(eventData?.status)}
                    </span>
                  </div>
                  <p className="text-text-secondary mt-1">{eventData?.venue} • {eventData?.date}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm">
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={16} color="#64748B" />
                      <span className="text-text-secondary">{eventStats?.registered} registered</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="UserCheck" size={16} color="#64748B" />
                      <span className="text-text-secondary">{eventStats?.checkedIn} checked in</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={16} color="#64748B" />
                      <span className="text-text-secondary">Capacity: {eventData?.capacity}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePreviewEvent}
                  className="flex items-center space-x-2 px-4 py-2 bg-secondary-50 text-secondary hover:bg-secondary-100 rounded-lg font-medium transition-smooth"
                >
                  <Icon name="Eye" size={16} />
                  <span className="hidden sm:inline">Preview</span>
                </button>
                <button
                  onClick={handleSendInvitations}
                  className="flex items-center space-x-2 px-4 py-2 bg-accent-50 text-accent hover:bg-accent-100 rounded-lg font-medium transition-smooth"
                >
                  <Icon name="Mail" size={16} />
                  <span className="hidden sm:inline">Send Invitations</span>
                </button>
                <button
                  onClick={handlePublishEvent}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-smooth ${
                    eventData?.status === 'draft' ?'bg-primary text-white hover:bg-primary-700' :'bg-warning text-white hover:bg-warning-700'
                  }`}
                >
                  <Icon 
                    name={eventData?.status === 'draft' ? 'Send' : 'Archive'} 
                    size={16} 
                    color="white" 
                  />
                  <span className="hidden sm:inline">
                    {eventData?.status === 'draft' ? 'Publish Event' : 'Unpublish'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-surface rounded-lg shadow-elevation-2 border border-border mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`relative flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-smooth whitespace-nowrap ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                    {tab?.badge && (
                      <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-error rounded-full">
                        {tab?.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Tab Description */}
            <div className="px-6 py-3 bg-secondary-50 border-b border-border">
              <p className="text-sm text-text-secondary">
                {tabs?.find(tab => tab?.id === activeTab)?.description}
              </p>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-6">
            {renderTabContent()}
          </div>
        </div>
      </main>

      <QuickActionToolbar context="event-management" />
    </div>
  );
};

export default EventManagementInterface;
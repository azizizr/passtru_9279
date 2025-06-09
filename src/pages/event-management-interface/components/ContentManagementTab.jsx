// src/pages/event-management-interface/components/ContentManagementTab.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ContentManagementTab = ({ eventData }) => {
  const [activeSection, setActiveSection] = useState('posters');
  const [eventPosters, setEventPosters] = useState([
    {
      id: 1,
      name: 'Main Event Poster',
      url: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop',
      type: 'primary',
      uploadDate: '2024-02-15'
    },
    {
      id: 2,
      name: 'Speaker Lineup',
      url: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?w=800&h=600&fit=crop',
      type: 'secondary',
      uploadDate: '2024-02-16'
    }
  ]);

  const [customTabs, setCustomTabs] = useState([
    {
      id: 1,
      name: 'Agenda',
      content: 'Event schedule and timeline information',
      order: 1,
      enabled: true,
      icon: 'Calendar'
    },
    {
      id: 2,
      name: 'Speakers',
      content: 'Information about event speakers and presenters',
      order: 2,
      enabled: true,
      icon: 'Users'
    },
    {
      id: 3,
      name: 'Sponsors',
      content: 'Sponsor information and acknowledgments',
      order: 3,
      enabled: false,
      icon: 'Award'
    }
  ]);

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Welcome to Tech Conference 2024',
      message: 'Welcome all attendees! Please check in at the registration desk.',
      type: 'info',
      scheduledTime: '2024-03-15T08:00:00',
      status: 'scheduled',
      priority: 'normal'
    },
    {
      id: 2,
      title: 'Lunch Break Announcement',
      message: 'Lunch will be served in the main hall from 12:00 PM to 1:00 PM.',
      type: 'info',
      scheduledTime: '2024-03-15T11:45:00',
      status: 'scheduled',
      priority: 'high'
    }
  ]);

  const [feedbackForm, setFeedbackForm] = useState({
    enabled: true,
    title: 'Event Feedback',
    description: 'Help us improve future events by sharing your feedback',
    questions: [
      {
        id: 1,
        question: 'How would you rate the overall event?',
        type: 'rating',
        required: true
      },
      {
        id: 2,
        question: 'What did you like most about the event?',
        type: 'textarea',
        required: false
      },
      {
        id: 3,
        question: 'Would you recommend this event to others?',
        type: 'yesno',
        required: true
      }
    ]
  });

  const handlePosterUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPoster = {
          id: Date.now(),
          name: file.name,
          url: e.target.result,
          type: 'secondary',
          uploadDate: new Date().toISOString().split('T')[0]
        };
        setEventPosters(prev => [...prev, newPoster]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePoster = (posterId) => {
    setEventPosters(prev => prev?.filter(poster => poster?.id !== posterId));
  };

  const handleAddCustomTab = () => {
    const newTab = {
      id: Date.now(),
      name: 'New Tab',
      content: 'Tab content goes here',
      order: customTabs?.length + 1,
      enabled: true,
      icon: 'FileText'
    };
    setCustomTabs(prev => [...prev, newTab]);
  };

  const handleDeleteCustomTab = (tabId) => {
    setCustomTabs(prev => prev?.filter(tab => tab?.id !== tabId));
  };

  const handleAddAnnouncement = () => {
    const newAnnouncement = {
      id: Date.now(),
      title: 'New Announcement',
      message: 'Announcement message',
      type: 'info',
      scheduledTime: new Date().toISOString().slice(0, 16),
      status: 'draft',
      priority: 'normal'
    };
    setAnnouncements(prev => [...prev, newAnnouncement]);
  };

  const handleDeleteAnnouncement = (announcementId) => {
    setAnnouncements(prev => prev?.filter(announcement => announcement?.id !== announcementId));
  };

  const getAnnouncementIcon = (type) => {
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

  const getAnnouncementColor = (type) => {
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-error-100 text-error';
      case 'medium':
        return 'bg-warning-100 text-warning';
      default:
        return 'bg-secondary-100 text-secondary';
    }
  };

  const sections = [
    { id: 'posters', label: 'Event Posters', icon: 'Image' },
    { id: 'tabs', label: 'Custom Tabs', icon: 'Layout' },
    { id: 'announcements', label: 'Announcements', icon: 'Megaphone' },
    { id: 'feedback', label: 'Feedback Form', icon: 'MessageSquare' }
  ];

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-4">
        <div className="flex flex-wrap gap-2">
          {sections?.map((section) => (
            <button
              key={section?.id}
              onClick={() => setActiveSection(section?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-smooth ${
                activeSection === section?.id
                  ? 'bg-primary text-white' :'bg-secondary-100 text-secondary hover:bg-secondary-200'
              }`}
            >
              <Icon name={section?.icon} size={16} color={activeSection === section?.id ? 'white' : undefined} />
              <span>{section?.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Posters Section */}
      {activeSection === 'posters' && (
        <div className="space-y-6">
          <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Event Posters</h3>
                <p className="text-sm text-text-secondary">Upload and manage event promotional materials</p>
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePosterUpload}
                  className="hidden"
                  id="poster-upload"
                />
                <label
                  htmlFor="poster-upload"
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-white hover:bg-primary-700 rounded-lg font-medium cursor-pointer transition-smooth"
                >
                  <Icon name="Upload" size={16} color="white" />
                  <span>Upload Poster</span>
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventPosters?.map((poster) => (
                <div key={poster?.id} className="group relative">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden border border-border">
                    <Image 
                      src={poster?.url} 
                      alt={poster?.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleDeletePoster(poster?.id)}
                      className="p-1.5 bg-error text-white hover:bg-error-700 rounded-lg transition-smooth"
                    >
                      <Icon name="Trash2" size={14} color="white" />
                    </button>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-text-primary">{poster?.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        poster?.type === 'primary' ?'bg-primary-100 text-primary' :'bg-secondary-100 text-secondary'
                      }`}>
                        {poster?.type}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">Uploaded {new Date(poster?.uploadDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
              
              {eventPosters?.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <Icon name="Image" size={48} color="#CBD5E1" className="mx-auto mb-4" />
                  <p className="text-text-secondary mb-2">No posters uploaded yet</p>
                  <p className="text-sm text-text-muted">Upload your first event poster to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom Tabs Section */}
      {activeSection === 'tabs' && (
        <div className="space-y-6">
          <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Custom Event Tabs</h3>
                <p className="text-sm text-text-secondary">Create custom sections for your event page</p>
              </div>
              <button
                onClick={handleAddCustomTab}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white hover:bg-primary-700 rounded-lg font-medium transition-smooth"
              >
                <Icon name="Plus" size={16} color="white" />
                <span>Add Tab</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {customTabs?.map((tab, index) => (
                <div key={tab?.id} className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="flex flex-col items-center space-y-1">
                      <button className="p-1 text-text-secondary hover:text-primary">
                        <Icon name="ChevronUp" size={16} />
                      </button>
                      <span className="text-xs text-text-muted">{tab?.order}</span>
                      <button className="p-1 text-text-secondary hover:text-primary">
                        <Icon name="ChevronDown" size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <select
                          value={tab?.icon}
                          onChange={(e) => {
                            const updatedTabs = [...customTabs];
                            updatedTabs[index] = { ...tab, icon: e.target.value };
                            setCustomTabs(updatedTabs);
                          }}
                          className="px-2 py-1 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="FileText">Document</option>
                          <option value="Calendar">Calendar</option>
                          <option value="Users">Users</option>
                          <option value="Award">Award</option>
                          <option value="MapPin">Location</option>
                          <option value="Camera">Media</option>
                        </select>
                        <input
                          type="text"
                          value={tab?.name}
                          onChange={(e) => {
                            const updatedTabs = [...customTabs];
                            updatedTabs[index] = { ...tab, name: e.target.value };
                            setCustomTabs(updatedTabs);
                          }}
                          className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={tab?.enabled}
                            onChange={(e) => {
                              const updatedTabs = [...customTabs];
                              updatedTabs[index] = { ...tab, enabled: e.target.checked };
                              setCustomTabs(updatedTabs);
                            }}
                            className="rounded border-border text-primary focus:ring-primary"
                          />
                          <span className="text-sm text-text-secondary">Enabled</span>
                        </label>
                        
                        <button
                          onClick={() => handleDeleteCustomTab(tab?.id)}
                          className="p-1.5 text-error hover:bg-error-50 rounded transition-smooth"
                        >
                          <Icon name="Trash2" size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <textarea
                      value={tab?.content}
                      onChange={(e) => {
                        const updatedTabs = [...customTabs];
                        updatedTabs[index] = { ...tab, content: e.target.value };
                        setCustomTabs(updatedTabs);
                      }}
                      rows={3}
                      placeholder="Tab content..."
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
              
              {customTabs?.length === 0 && (
                <div className="text-center py-8">
                  <Icon name="Layout" size={48} color="#CBD5E1" className="mx-auto mb-4" />
                  <p className="text-text-secondary mb-2">No custom tabs created yet</p>
                  <p className="text-sm text-text-muted">Add custom tabs to organize your event content</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Announcements Section */}
      {activeSection === 'announcements' && (
        <div className="space-y-6">
          <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Event Announcements</h3>
                <p className="text-sm text-text-secondary">Schedule announcements for your event</p>
              </div>
              <button
                onClick={handleAddAnnouncement}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white hover:bg-primary-700 rounded-lg font-medium transition-smooth"
              >
                <Icon name="Plus" size={16} color="white" />
                <span>Add Announcement</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {announcements?.map((announcement, index) => (
                <div key={announcement?.id} className="p-4 border border-border rounded-lg space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-4">
                        <select
                          value={announcement?.type}
                          onChange={(e) => {
                            const updatedAnnouncements = [...announcements];
                            updatedAnnouncements[index] = { ...announcement, type: e.target.value };
                            setAnnouncements(updatedAnnouncements);
                          }}
                          className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="info">Info</option>
                          <option value="warning">Warning</option>
                          <option value="success">Success</option>
                          <option value="error">Error</option>
                        </select>
                        
                        <select
                          value={announcement?.priority}
                          onChange={(e) => {
                            const updatedAnnouncements = [...announcements];
                            updatedAnnouncements[index] = { ...announcement, priority: e.target.value };
                            setAnnouncements(updatedAnnouncements);
                          }}
                          className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="normal">Normal</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                        
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(announcement?.priority)}`}>
                          {announcement?.priority} priority
                        </span>
                      </div>
                      
                      <input
                        type="text"
                        value={announcement?.title}
                        onChange={(e) => {
                          const updatedAnnouncements = [...announcements];
                          updatedAnnouncements[index] = { ...announcement, title: e.target.value };
                          setAnnouncements(updatedAnnouncements);
                        }}
                        placeholder="Announcement title"
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      
                      <textarea
                        value={announcement?.message}
                        onChange={(e) => {
                          const updatedAnnouncements = [...announcements];
                          updatedAnnouncements[index] = { ...announcement, message: e.target.value };
                          setAnnouncements(updatedAnnouncements);
                        }}
                        rows={3}
                        placeholder="Announcement message"
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      
                      <div className="flex items-center space-x-4">
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-1">Scheduled Time</label>
                          <input
                            type="datetime-local"
                            value={announcement?.scheduledTime}
                            onChange={(e) => {
                              const updatedAnnouncements = [...announcements];
                              updatedAnnouncements[index] = { ...announcement, scheduledTime: e.target.value };
                              setAnnouncements(updatedAnnouncements);
                            }}
                            className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-1">Status</label>
                          <select
                            value={announcement?.status}
                            onChange={(e) => {
                              const updatedAnnouncements = [...announcements];
                              updatedAnnouncements[index] = { ...announcement, status: e.target.value };
                              setAnnouncements(updatedAnnouncements);
                            }}
                            className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value="draft">Draft</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="sent">Sent</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleDeleteAnnouncement(announcement?.id)}
                      className="p-2 text-error hover:bg-error-50 rounded transition-smooth"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </div>
              ))}
              
              {announcements?.length === 0 && (
                <div className="text-center py-8">
                  <Icon name="Megaphone" size={48} color="#CBD5E1" className="mx-auto mb-4" />
                  <p className="text-text-secondary mb-2">No announcements scheduled</p>
                  <p className="text-sm text-text-muted">Create announcements to keep attendees informed</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Feedback Form Section */}
      {activeSection === 'feedback' && (
        <div className="space-y-6">
          <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Event Feedback Form</h3>
                <p className="text-sm text-text-secondary">Configure post-event feedback collection</p>
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={feedbackForm?.enabled}
                  onChange={(e) => setFeedbackForm(prev => ({ ...prev, enabled: e.target.checked }))}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium text-text-primary">Enable Feedback Form</span>
              </label>
            </div>
            
            {feedbackForm?.enabled && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Form Title</label>
                    <input
                      type="text"
                      value={feedbackForm?.title}
                      onChange={(e) => setFeedbackForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Description</label>
                    <input
                      type="text"
                      value={feedbackForm?.description}
                      onChange={(e) => setFeedbackForm(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-text-primary">Form Questions</h4>
                    <button className="flex items-center space-x-2 px-3 py-1.5 bg-primary text-white hover:bg-primary-700 rounded-lg text-sm font-medium transition-smooth">
                      <Icon name="Plus" size={14} color="white" />
                      <span>Add Question</span>
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {feedbackForm?.questions?.map((question, index) => (
                      <div key={question?.id} className="p-4 border border-border rounded-lg">
                        <div className="flex items-start space-x-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center space-x-4">
                              <select
                                value={question?.type}
                                className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                              >
                                <option value="text">Text</option>
                                <option value="textarea">Long Text</option>
                                <option value="rating">Rating</option>
                                <option value="yesno">Yes/No</option>
                                <option value="multiple">Multiple Choice</option>
                              </select>
                              
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={question?.required}
                                  className="rounded border-border text-primary focus:ring-primary"
                                />
                                <span className="text-sm text-text-secondary">Required</span>
                              </label>
                            </div>
                            
                            <input
                              type="text"
                              value={question?.question}
                              placeholder="Enter question"
                              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                          
                          <button className="p-1.5 text-error hover:bg-error-50 rounded transition-smooth">
                            <Icon name="Trash2" size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {!feedbackForm?.enabled && (
              <div className="text-center py-8">
                <Icon name="MessageSquare" size={48} color="#CBD5E1" className="mx-auto mb-4" />
                <p className="text-text-secondary mb-2">Feedback form is disabled</p>
                <p className="text-sm text-text-muted">Enable the feedback form to collect attendee responses</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManagementTab;
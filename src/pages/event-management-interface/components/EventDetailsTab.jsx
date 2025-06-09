// src/pages/event-management-interface/components/EventDetailsTab.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';


const EventDetailsTab = ({ eventData, setEventData }) => {
  const [previewMode, setPreviewMode] = useState(false);
  const [formData, setFormData] = useState(eventData);

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    setEventData?.(updatedData);
  };

  const handleArrayInputChange = (field, value) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    handleInputChange(field, array);
  };

  const eventTypes = [
    'Conference',
    'Workshop',
    'Seminar',
    'Webinar',
    'Meetup',
    'Summit',
    'Trade Show',
    'Networking Event',
    'Training Session',
    'Other'
  ];

  const timezones = [
    'UTC-8 (PST)',
    'UTC-7 (MST)',
    'UTC-6 (CST)',
    'UTC-5 (EST)',
    'UTC+0 (GMT)',
    'UTC+1 (CET)',
    'UTC+8 (CST)',
    'UTC+9 (JST)'
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Configuration Form */}
      <div className="space-y-6">
        <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-6">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Event Name *
              </label>
              <input
                type="text"
                value={formData?.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter event name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Description
              </label>
              <textarea
                value={formData?.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Describe your event"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Event Type
                </label>
                <select
                  value={formData?.type || ''}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select type</option>
                  {eventTypes?.map((type) => (
                    <option key={type} value={type.toLowerCase().replace(' ', '-')}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Capacity
                </label>
                <input
                  type="number"
                  value={formData?.capacity || ''}
                  onChange={(e) => handleInputChange('capacity', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Maximum attendees"
                  min="1"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-6">Date & Time</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={formData?.date || ''}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Start Time *
                </label>
                <input
                  type="time"
                  value={formData?.time || ''}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData?.endDate || ''}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={formData?.endTime || ''}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Timezone
              </label>
              <select
                value={formData?.timezone || 'UTC-5 (EST)'}
                onChange={(e) => handleInputChange('timezone', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {timezones?.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Registration Deadline
              </label>
              <input
                type="date"
                value={formData?.registrationDeadline || ''}
                onChange={(e) => handleInputChange('registrationDeadline', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-6">Location</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Venue Name *
              </label>
              <input
                type="text"
                value={formData?.venue || ''}
                onChange={(e) => handleInputChange('venue', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter venue name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Address
              </label>
              <textarea
                value={formData?.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter full address"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="virtual-event"
                checked={formData?.isVirtual || false}
                onChange={(e) => handleInputChange('isVirtual', e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary"
              />
              <label htmlFor="virtual-event" className="text-sm text-text-primary">
                This is a virtual event
              </label>
            </div>

            {formData?.isVirtual && (
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Meeting Link
                </label>
                <input
                  type="url"
                  value={formData?.meetingLink || ''}
                  onChange={(e) => handleInputChange('meetingLink', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://zoom.us/j/..."
                />
              </div>
            )}
          </div>
        </div>

        <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-6">Event Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-text-primary">Public Event Page</label>
                <p className="text-xs text-text-secondary">Allow public access to event information</p>
              </div>
              <input
                type="checkbox"
                checked={formData?.publicPage || false}
                onChange={(e) => handleInputChange('publicPage', e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-text-primary">Require Approval</label>
                <p className="text-xs text-text-secondary">Manually approve registrations</p>
              </div>
              <input
                type="checkbox"
                checked={formData?.requireApproval || false}
                onChange={(e) => handleInputChange('requireApproval', e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-text-primary">Allow Waitlist</label>
                <p className="text-xs text-text-secondary">Enable waitlist when capacity is full</p>
              </div>
              <input
                type="checkbox"
                checked={formData?.allowWaitlist || false}
                onChange={(e) => handleInputChange('allowWaitlist', e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-text-primary">Email Reminders</label>
                <p className="text-xs text-text-secondary">Send automatic reminder emails</p>
              </div>
              <input
                type="checkbox"
                checked={formData?.emailReminders || false}
                onChange={(e) => handleInputChange('emailReminders', e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-6">Categories & Tags</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Categories
              </label>
              <input
                type="text"
                value={formData?.categories?.join(', ') || ''}
                onChange={(e) => handleArrayInputChange('categories', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Technology, Innovation, Networking"
              />
              <p className="text-xs text-text-secondary mt-1">Separate multiple categories with commas</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Tags
              </label>
              <input
                type="text"
                value={formData?.tags?.join(', ') || ''}
                onChange={(e) => handleArrayInputChange('tags', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="conference, tech, networking"
              />
              <p className="text-xs text-text-secondary mt-1">Separate multiple tags with commas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="space-y-6">
        <div className="bg-surface rounded-lg shadow-elevation-2 border border-border overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-text-primary">Live Preview</h2>
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth ${
                previewMode 
                  ? 'bg-primary text-white' :'bg-secondary-100 text-secondary hover:bg-secondary-200'
              }`}
            >
              <Icon name={previewMode ? 'Monitor' : 'Smartphone'} size={14} />
              <span>{previewMode ? 'Desktop' : 'Mobile'}</span>
            </button>
          </div>
          
          <div className={`${previewMode ? 'p-6' : 'p-3'}`}>
            <div className={`${previewMode ? 'max-w-full' : 'max-w-sm mx-auto'} bg-white border border-border rounded-lg overflow-hidden`}>
              {/* Event Header */}
              <div className="relative h-48 bg-gradient-to-br from-primary to-primary-700">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-bold text-white mb-1">{formData?.name || 'Event Name'}</h3>
                  <div className="flex items-center space-x-4 text-white text-sm">
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={14} color="white" />
                      <span>{formData?.date ? new Date(formData.date).toLocaleDateString() : 'TBD'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} color="white" />
                      <span>{formData?.time || 'TBD'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="MapPin" size={16} color="#64748B" />
                  <span className="text-sm text-text-secondary">{formData?.venue || 'Venue TBD'}</span>
                </div>
                
                <p className="text-text-primary text-sm mb-4">
                  {formData?.description || 'Event description will appear here...'}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} color="#64748B" />
                    <span className="text-sm text-text-secondary">Capacity: {formData?.capacity || 'TBD'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-xs text-success font-medium">
                      {formData?.status === 'active' ? 'Registration Open' : 'Draft'}
                    </span>
                  </div>
                </div>

                {formData?.categories && formData.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {formData.categories.map((category, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}

                <button className="w-full bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-smooth">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Configuration Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Basic Information</span>
              <div className="flex items-center space-x-2">
                {formData?.name && formData?.description ? (
                  <Icon name="CheckCircle" size={16} color="#059669" />
                ) : (
                  <Icon name="AlertCircle" size={16} color="#D97706" />
                )}
                <span className={`text-xs font-medium ${
                  formData?.name && formData?.description ? 'text-success' : 'text-warning'
                }`}>
                  {formData?.name && formData?.description ? 'Complete' : 'Incomplete'}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Date & Time</span>
              <div className="flex items-center space-x-2">
                {formData?.date && formData?.time ? (
                  <Icon name="CheckCircle" size={16} color="#059669" />
                ) : (
                  <Icon name="AlertCircle" size={16} color="#D97706" />
                )}
                <span className={`text-xs font-medium ${
                  formData?.date && formData?.time ? 'text-success' : 'text-warning'
                }`}>
                  {formData?.date && formData?.time ? 'Complete' : 'Incomplete'}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Location</span>
              <div className="flex items-center space-x-2">
                {formData?.venue ? (
                  <Icon name="CheckCircle" size={16} color="#059669" />
                ) : (
                  <Icon name="AlertCircle" size={16} color="#D97706" />
                )}
                <span className={`text-xs font-medium ${
                  formData?.venue ? 'text-success' : 'text-warning'
                }`}>
                  {formData?.venue ? 'Complete' : 'Incomplete'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsTab;
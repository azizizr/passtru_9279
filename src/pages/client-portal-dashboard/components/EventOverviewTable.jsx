import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const EventOverviewTable = ({ events }) => {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('asc');

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success-100 text-success border-success-200';
      case 'draft':
        return 'bg-warning-100 text-warning border-warning-200';
      case 'completed':
        return 'bg-secondary-100 text-secondary border-secondary-200';
      case 'cancelled':
        return 'bg-error-100 text-error border-error-200';
      default:
        return 'bg-secondary-100 text-secondary border-secondary-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'conference':
        return 'Users';
      case 'webinar':
        return 'Video';
      case 'workshop':
        return 'Wrench';
      case 'summit':
        return 'Mountain';
      case 'meetup':
        return 'Coffee';
      default:
        return 'Calendar';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCheckInProgress = (checkedIn, total) => {
    if (total === 0) return 0;
    return Math.round((checkedIn / total) * 100);
  };

  const handleSelectEvent = (eventId) => {
    setSelectedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleSelectAll = () => {
    if (selectedEvents.length === events.length) {
      setSelectedEvents([]);
    } else {
      setSelectedEvents(events.map(event => event.id));
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedEvents = [...events].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (sortField === 'date') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleEventAction = (action, eventId) => {
    console.log(`${action} event:`, eventId);
  };

  return (
    <div className="bg-surface rounded-lg shadow-elevation-2 border border-border overflow-hidden">
      {/* Table Header Actions */}
      {selectedEvents.length > 0 && (
        <div className="bg-primary-50 border-b border-border p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary">
              {selectedEvents.length} event{selectedEvents.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-white text-text-secondary border border-border rounded hover:bg-secondary-50 transition-smooth">
                Export
              </button>
              <button className="px-3 py-1 text-sm bg-white text-text-secondary border border-border rounded hover:bg-secondary-50 transition-smooth">
                Archive
              </button>
              <button className="px-3 py-1 text-sm bg-error text-white rounded hover:bg-error-500 transition-smooth">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedEvents.length === events.length && events.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border focus:ring-primary"
                />
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  <span>Event Name</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  <span>Date & Time</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  <span>Status</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <span className="text-sm font-medium text-text-secondary">Attendees</span>
              </th>
              <th className="text-left px-4 py-3">
                <span className="text-sm font-medium text-text-secondary">Check-in Progress</span>
              </th>
              <th className="text-right px-4 py-3">
                <span className="text-sm font-medium text-text-secondary">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedEvents.map((event) => (
              <tr key={event.id} className="hover:bg-secondary-50 transition-smooth">
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedEvents.includes(event.id)}
                    onChange={() => handleSelectEvent(event.id)}
                    className="rounded border-border focus:ring-primary"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                      <Icon name={getTypeIcon(event.type)} size={16} color="#2563EB" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{event.name}</p>
                      <p className="text-xs text-text-secondary">{event.venue}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{formatDate(event.date)}</p>
                    <p className="text-xs text-text-secondary">{event.time}</p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(event.status)}`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{event.attendeeCount}</p>
                    <p className="text-xs text-text-secondary">of {event.capacity}</p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-text-secondary">
                        {event.checkedIn}/{event.attendeeCount}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {getCheckInProgress(event.checkedIn, event.attendeeCount)}%
                      </span>
                    </div>
                    <div className="w-full bg-secondary-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getCheckInProgress(event.checkedIn, event.attendeeCount)}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => handleEventAction('edit', event.id)}
                      className="p-1 text-text-secondary hover:text-primary hover:bg-primary-50 rounded transition-smooth"
                      title="Edit event"
                    >
                      <Icon name="Edit" size={16} />
                    </button>
                    <button
                      onClick={() => handleEventAction('duplicate', event.id)}
                      className="p-1 text-text-secondary hover:text-accent hover:bg-accent-50 rounded transition-smooth"
                      title="Duplicate event"
                    >
                      <Icon name="Copy" size={16} />
                    </button>
                    <button
                      onClick={() => handleEventAction('analytics', event.id)}
                      className="p-1 text-text-secondary hover:text-success hover:bg-success-50 rounded transition-smooth"
                      title="View analytics"
                    >
                      <Icon name="BarChart3" size={16} />
                    </button>
                    <button
                      onClick={() => handleEventAction('more', event.id)}
                      className="p-1 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded transition-smooth"
                      title="More options"
                    >
                      <Icon name="MoreHorizontal" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="lg:hidden divide-y divide-border">
        {sortedEvents.map((event) => (
          <div key={event.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedEvents.includes(event.id)}
                  onChange={() => handleSelectEvent(event.id)}
                  className="rounded border-border focus:ring-primary mt-1"
                />
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                  <Icon name={getTypeIcon(event.type)} size={18} color="#2563EB" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-text-primary">{event.name}</h3>
                  <p className="text-xs text-text-secondary">{event.venue}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(event.status)}`}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-xs text-text-secondary">Date & Time</p>
                <p className="text-sm font-medium text-text-primary">{formatDate(event.date)}</p>
                <p className="text-xs text-text-secondary">{event.time}</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary">Attendees</p>
                <p className="text-sm font-medium text-text-primary">{event.attendeeCount} of {event.capacity}</p>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-text-secondary">Check-in Progress</span>
                <span className="text-xs text-text-secondary">
                  {getCheckInProgress(event.checkedIn, event.attendeeCount)}%
                </span>
              </div>
              <div className="w-full bg-secondary-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getCheckInProgress(event.checkedIn, event.attendeeCount)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-2">
              <button
                onClick={() => handleEventAction('edit', event.id)}
                className="flex items-center space-x-1 px-3 py-1 text-xs bg-primary-50 text-primary rounded hover:bg-primary-100 transition-smooth"
              >
                <Icon name="Edit" size={14} />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleEventAction('analytics', event.id)}
                className="flex items-center space-x-1 px-3 py-1 text-xs bg-success-50 text-success rounded hover:bg-success-100 transition-smooth"
              >
                <Icon name="BarChart3" size={14} />
                <span>Analytics</span>
              </button>
              <button
                onClick={() => handleEventAction('more', event.id)}
                className="p-1 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded transition-smooth"
              >
                <Icon name="MoreHorizontal" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {events.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Calendar" size={48} color="#CBD5E1" />
          <h3 className="text-lg font-medium text-text-primary mt-4">No events found</h3>
          <p className="text-text-secondary mt-2">Create your first event to get started</p>
          <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth">
            Create Event
          </button>
        </div>
      )}
    </div>
  );
};

export default EventOverviewTable;
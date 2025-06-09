import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const AttendeeCard = ({ attendee, showSuccess, onContinue, eventData }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getTicketTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'vip':
        return 'bg-accent text-white';
      case 'standard':
        return 'bg-primary text-white';
      case 'student':
        return 'bg-success text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-secondary-900">
      <div className="w-full max-w-md">
        {/* Success Animation */}
        {showSuccess && (
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Icon name="Check" size={40} color="white" />
            </div>
            <h2 className="text-2xl font-bold text-success mb-2">Check-in Successful!</h2>
            <p className="text-secondary-300">Welcome to {eventData.name}</p>
          </div>
        )}

        {/* Attendee Information Card */}
        <div className="bg-surface rounded-xl shadow-elevation-4 overflow-hidden">
          {/* Header */}
          <div className="bg-primary p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Attendee Checked In</h3>
                <p className="text-primary-100 text-sm">{formatTime(attendee.checkInTime)}</p>
              </div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Icon name="UserCheck" size={24} color="white" />
              </div>
            </div>
          </div>

          {/* Attendee Details */}
          <div className="p-6">
            <div className="flex items-start space-x-4 mb-6">
              {/* Profile Photo */}
              <div className="w-16 h-16 rounded-full overflow-hidden bg-secondary-100 flex-shrink-0">
                {attendee.photo ? (
                  <Image
                    src={attendee.photo}
                    alt={attendee.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary-200 flex items-center justify-center">
                    <Icon name="User" size={24} color="#64748B" />
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-text-primary mb-1">{attendee.name}</h4>
                <p className="text-text-secondary mb-2">{attendee.email}</p>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTicketTypeColor(attendee.ticketType)}`}>
                    {attendee.ticketType}
                  </span>
                  <span className="text-xs text-text-muted">ID: {attendee.id}</span>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
                <Icon name="Building2" size={16} color="#64748B" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Organization</p>
                  <p className="text-sm text-text-secondary">{attendee.organization}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
                <Icon name="Calendar" size={16} color="#64748B" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Registration Date</p>
                  <p className="text-sm text-text-secondary">
                    {new Date(attendee.registrationDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-success-50 rounded-lg">
                <Icon name="Clock" size={16} color="#059669" />
                <div>
                  <p className="text-sm font-medium text-success">Check-in Time</p>
                  <p className="text-sm text-success">
                    {new Date(attendee.checkInTime).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Event Information */}
            <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
              <h5 className="text-sm font-semibold text-primary mb-2">Event Details</h5>
              <div className="space-y-1">
                <p className="text-sm text-text-primary font-medium">{eventData.name}</p>
                <p className="text-sm text-text-secondary">{eventData.venue}</p>
                <p className="text-sm text-text-secondary">
                  {new Date(eventData.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-border bg-secondary-50">
            <div className="flex space-x-3">
              <button
                onClick={onContinue}
                className="flex-1 bg-primary text-white px-4 py-3 rounded-lg font-medium hover:bg-primary-700 transition-smooth flex items-center justify-center space-x-2"
              >
                <Icon name="Scan" size={16} color="white" />
                <span>Continue Scanning</span>
              </button>
              
              <button
                onClick={() => window.location.href = '/live-check-in-dashboard'}
                className="px-4 py-3 bg-secondary-200 text-secondary rounded-lg font-medium hover:bg-secondary-300 transition-smooth"
              >
                <Icon name="BarChart3" size={16} color="#64748B" />
              </button>
            </div>

            <div className="mt-3 text-center">
              <p className="text-xs text-text-muted">
                Scan next QR code or return to dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-surface p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-primary">{eventData.checkedIn + 1}</p>
            <p className="text-sm text-text-secondary">Checked In</p>
          </div>
          <div className="bg-surface p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-text-primary">{eventData.totalRegistrations}</p>
            <p className="text-sm text-text-secondary">Total Registered</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendeeCard;
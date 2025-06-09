import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RecentActivity = ({ checkIns }) => {
  const [filter, setFilter] = useState('all');

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getMethodIcon = (method) => {
    return method === 'QR Code' ? 'QrCode' : 'CreditCard';
  };

  const getMethodColor = (method) => {
    return method === 'QR Code' ? '#2563EB' : '#059669';
  };

  const filteredCheckIns = checkIns.filter(checkIn => {
    if (filter === 'all') return true;
    if (filter === 'qr') return checkIn.method === 'QR Code';
    if (filter === 'manual') return checkIn.method === 'Manual ID';
    return true;
  });

  return (
    <div className="bg-surface rounded-lg border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Recent Check-ins</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-text-secondary">Live</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-2">
          {[
            { key: 'all', label: 'All Methods' },
            { key: 'qr', label: 'QR Code' },
            { key: 'manual', label: 'Manual ID' }
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`px-3 py-1 text-sm font-medium rounded-full transition-smooth ${
                filter === filterOption.key
                  ? 'bg-primary text-white' :'bg-secondary-100 text-secondary hover:bg-secondary-200'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activity List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredCheckIns.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <Icon name="UserCheck" size={48} color="#CBD5E1" />
            <p className="text-text-secondary mt-2">No check-ins found</p>
            <p className="text-text-muted text-sm">Check-ins will appear here in real-time</p>
          </div>
        ) : (
          <div className="divide-y divide-border-light">
            {filteredCheckIns.map((checkIn, index) => (
              <div
                key={checkIn.id}
                className="p-4 hover:bg-secondary-50 transition-smooth animate-slide-down"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-3">
                  {/* Avatar */}
                  <div className="relative">
                    <Image
                      src={checkIn.avatar}
                      alt={checkIn.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-surface flex items-center justify-center">
                      <Icon name="Check" size={8} color="white" />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {checkIn.name}
                      </p>
                      <span className="text-xs text-text-muted">
                        {formatTime(checkIn.checkInTime)}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary truncate">
                      {checkIn.email}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Icon 
                        name={getMethodIcon(checkIn.method)} 
                        size={12} 
                        color={getMethodColor(checkIn.method)} 
                      />
                      <span className="text-xs text-text-muted">
                        {checkIn.method}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-1">
                    <button className="p-2 text-text-muted hover:text-text-secondary hover:bg-secondary-100 rounded-lg transition-smooth">
                      <Icon name="MoreVertical" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <button className="w-full text-center text-sm text-accent hover:text-accent-600 font-medium py-2">
          View all check-ins ({checkIns.length})
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;
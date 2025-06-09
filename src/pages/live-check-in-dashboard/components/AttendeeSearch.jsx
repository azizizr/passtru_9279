import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const AttendeeSearch = ({ onCheckIn }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedAttendee, setSelectedAttendee] = useState(null);

  // Mock attendee data
  const mockAttendees = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@company.com",
      company: "Tech Solutions Inc",
      registrationId: "REG001",
      status: "pending",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria.garcia@startup.io",
      company: "Innovation Labs",
      registrationId: "REG002",
      status: "pending",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      id: 3,
      name: "Robert Chen",
      email: "robert.chen@enterprise.com",
      company: "Global Enterprise",
      registrationId: "REG003",
      status: "checked-in",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah.w@consulting.com",
      company: "Strategic Consulting",
      registrationId: "REG004",
      status: "pending",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    {
      id: 5,
      name: "David Thompson",
      email: "david.t@techcorp.com",
      company: "TechCorp Solutions",
      registrationId: "REG005",
      status: "pending",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg"
    }
  ];

  // Search functionality with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        setIsSearching(true);
        
        // Simulate API call delay
        setTimeout(() => {
          const filtered = mockAttendees.filter(attendee =>
            attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            attendee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            attendee.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            attendee.registrationId.toLowerCase().includes(searchQuery.toLowerCase())
          );
          
          setSearchResults(filtered);
          setIsSearching(false);
        }, 300);
      } else {
        setSearchResults([]);
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleCheckIn = (attendee) => {
    if (attendee.status === 'checked-in') {
      alert('This attendee is already checked in!');
      return;
    }

    setSelectedAttendee(attendee);
    
    // Simulate check-in process
    setTimeout(() => {
      alert(`${attendee.name} has been successfully checked in!`);
      setSelectedAttendee(null);
      setSearchQuery('');
      setSearchResults([]);
      onCheckIn();
    }, 1000);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'checked-in':
        return 'bg-success-100 text-success border-success-200';
      case 'pending':
        return 'bg-warning-100 text-warning border-warning-200';
      default:
        return 'bg-secondary-100 text-secondary border-secondary-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'checked-in':
        return 'Checked In';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon name="Search" size={20} color="#64748B" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, email, company, or registration ID..."
          className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
        />
        {isSearching && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <Icon name="Loader2" size={20} color="#64748B" className="animate-spin" />
          </div>
        )}
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {isSearching ? (
            <div className="flex items-center justify-center p-4">
              <div className="animate-pulse-gentle">
                <Icon name="Loader2" size={24} color="#64748B" className="animate-spin" />
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center p-4">
              <Icon name="UserX" size={48} color="#CBD5E1" />
              <p className="text-text-secondary mt-2">No attendees found</p>
              <p className="text-text-muted text-sm">Try adjusting your search terms</p>
            </div>
          ) : (
            searchResults.map((attendee) => (
              <div
                key={attendee.id}
                className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-secondary-50 transition-smooth"
              >
                <Image
                  src={attendee.avatar}
                  alt={attendee.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {attendee.name}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusBadge(attendee.status)}`}>
                      {getStatusText(attendee.status)}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary truncate">{attendee.email}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-text-muted">{attendee.company}</span>
                    <span className="text-xs text-text-muted">ID: {attendee.registrationId}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleCheckIn(attendee)}
                  disabled={attendee.status === 'checked-in' || selectedAttendee?.id === attendee.id}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-smooth ${
                    attendee.status === 'checked-in' ?'bg-secondary-100 text-secondary cursor-not-allowed'
                      : selectedAttendee?.id === attendee.id
                      ? 'bg-primary-100 text-primary cursor-wait' :'bg-success text-white hover:bg-success-500'
                  }`}
                >
                  {selectedAttendee?.id === attendee.id ? (
                    <div className="flex items-center space-x-2">
                      <Icon name="Loader2" size={16} color="currentColor" className="animate-spin" />
                      <span>Checking in...</span>
                    </div>
                  ) : attendee.status === 'checked-in' ? (
                    <div className="flex items-center space-x-2">
                      <Icon name="Check" size={16} />
                      <span>Checked In</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Icon name="UserPlus" size={16} />
                      <span>Check In</span>
                    </div>
                  )}
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Instructions */}
      {!searchQuery && (
        <div className="text-center p-6 bg-secondary-50 rounded-lg">
          <Icon name="Search" size={48} color="#CBD5E1" />
          <p className="text-text-secondary mt-2">Start typing to search for attendees</p>
          <p className="text-text-muted text-sm">You can search by name, email, company, or registration ID</p>
        </div>
      )}
    </div>
  );
};

export default AttendeeSearch;
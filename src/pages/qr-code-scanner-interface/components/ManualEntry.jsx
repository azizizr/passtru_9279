import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ManualEntry = ({ onSubmit, onBack, eventData }) => {
  const [qrCode, setQrCode] = useState('');
  const [attendeeId, setAttendeeId] = useState('');
  const [searchMode, setSearchMode] = useState('qr'); // 'qr' or 'id'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!qrCode.trim() && !attendeeId.trim()) return;

    setIsSubmitting(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const code = searchMode === 'qr' ? qrCode : `QR_${attendeeId.toUpperCase()}_TECH2024`;
      onSubmit(code);
      setIsSubmitting(false);
      setQrCode('');
      setAttendeeId('');
    }, 1000);
  };

  const quickCodes = [
    { code: 'QR_ATT001_TECH2024', label: 'Sarah Johnson (VIP)' },
    { code: 'QR_ATT002_TECH2024', label: 'Michael Chen (Standard)' },
    { code: 'QR_ATT003_TECH2024', label: 'Emily Rodriguez (Student)' }
  ];

  return (
    <div className="flex-1 p-6 bg-secondary-900">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Keyboard" size={32} color="white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Manual Entry</h2>
          <p className="text-secondary-300">Enter QR code or attendee ID manually</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-secondary-800 rounded-lg p-1 mb-6">
          <button
            onClick={() => setSearchMode('qr')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-smooth ${
              searchMode === 'qr' ?'bg-accent text-white' :'text-secondary-300 hover:text-white'
            }`}
          >
            QR Code
          </button>
          <button
            onClick={() => setSearchMode('id')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-smooth ${
              searchMode === 'id' ?'bg-accent text-white' :'text-secondary-300 hover:text-white'
            }`}
          >
            Attendee ID
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {searchMode === 'qr' ? (
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                QR Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={qrCode}
                  onChange={(e) => setQrCode(e.target.value)}
                  placeholder="Enter QR code (e.g., QR_ATT001_TECH2024)"
                  className="w-full px-4 py-3 bg-secondary-800 border border-secondary-700 rounded-lg text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  autoFocus
                />
                <div className="absolute right-3 top-3">
                  <Icon name="QrCode" size={20} color="#64748B" />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Attendee ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={attendeeId}
                  onChange={(e) => setAttendeeId(e.target.value)}
                  placeholder="Enter attendee ID (e.g., ATT001)"
                  className="w-full px-4 py-3 bg-secondary-800 border border-secondary-700 rounded-lg text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  autoFocus
                />
                <div className="absolute right-3 top-3">
                  <Icon name="User" size={20} color="#64748B" />
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || (!qrCode.trim() && !attendeeId.trim())}
            className="w-full bg-accent text-white px-4 py-3 rounded-lg font-medium hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <Icon name="Loader2" size={16} color="white" className="animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Icon name="Search" size={16} color="white" />
                <span>Check In</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Access Codes */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-white mb-4">Quick Access (Demo)</h3>
          <div className="space-y-2">
            {quickCodes.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  if (searchMode === 'qr') {
                    setQrCode(item.code);
                  } else {
                    setAttendeeId(item.code.split('_')[1]);
                  }
                }}
                className="w-full text-left p-3 bg-secondary-800 hover:bg-secondary-700 rounded-lg transition-smooth border border-secondary-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <p className="text-xs text-secondary-400">{item.code}</p>
                  </div>
                  <Icon name="ChevronRight" size={16} color="#64748B" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Event Info */}
        <div className="mt-8 p-4 bg-secondary-800 rounded-lg border border-secondary-700">
          <h4 className="text-sm font-medium text-white mb-2">Current Event</h4>
          <div className="space-y-1">
            <p className="text-sm text-secondary-300">{eventData.name}</p>
            <p className="text-xs text-secondary-400">{eventData.venue}</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="text-center">
                <p className="text-lg font-bold text-accent">{eventData.checkedIn}</p>
                <p className="text-xs text-secondary-400">Checked In</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-white">{eventData.totalRegistrations}</p>
                <p className="text-xs text-secondary-400">Total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-full mt-6 bg-secondary-700 text-white px-4 py-3 rounded-lg font-medium hover:bg-secondary-600 transition-smooth flex items-center justify-center space-x-2"
        >
          <Icon name="Camera" size={16} color="white" />
          <span>Back to Camera</span>
        </button>
      </div>
    </div>
  );
};

export default ManualEntry;
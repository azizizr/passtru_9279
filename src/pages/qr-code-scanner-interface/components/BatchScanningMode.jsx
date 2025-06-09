import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const BatchScanningMode = ({ onScan, onBack, scanCount, eventData }) => {
  const [batchScans, setBatchScans] = useState([]);
  const [isScanning, setIsScanning] = useState(true);
  const [scanRate, setScanRate] = useState(0);
  const [sessionStartTime] = useState(new Date());

  // Mock batch scanning simulation
  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        simulateBatchScan();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isScanning]);

  const simulateBatchScan = () => {
    const mockAttendees = [
      { id: 'ATT001', name: 'Sarah Johnson', qr: 'QR_ATT001_TECH2024' },
      { id: 'ATT002', name: 'Michael Chen', qr: 'QR_ATT002_TECH2024' },
      { id: 'ATT003', name: 'Emily Rodriguez', qr: 'QR_ATT003_TECH2024' },
      { id: 'ATT004', name: 'David Kim', qr: 'QR_ATT004_TECH2024' },
      { id: 'ATT005', name: 'Lisa Wang', qr: 'QR_ATT005_TECH2024' }
    ];

    const randomAttendee = mockAttendees[Math.floor(Math.random() * mockAttendees.length)];
    const scanTime = new Date();
    
    const newScan = {
      id: Date.now(),
      attendeeId: randomAttendee.id,
      name: randomAttendee.name,
      qrCode: randomAttendee.qr,
      timestamp: scanTime,
      status: Math.random() > 0.1 ? 'success' : 'duplicate' // 90% success rate
    };

    setBatchScans(prev => [newScan, ...prev.slice(0, 19)]); // Keep last 20 scans
    
    if (newScan.status === 'success') {
      onScan(randomAttendee.qr);
    }

    // Update scan rate
    const sessionDuration = (scanTime - sessionStartTime) / 1000 / 60; // minutes
    setScanRate(Math.round((scanCount + 1) / sessionDuration));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-success bg-success-50 border-success-200';
      case 'duplicate':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'error':
        return 'text-error bg-error-50 border-error-200';
      default:
        return 'text-secondary bg-secondary-50 border-secondary-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return 'CheckCircle';
      case 'duplicate':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      default:
        return 'Clock';
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const sessionDuration = Math.floor((new Date() - sessionStartTime) / 1000 / 60);

  return (
    <div className="flex-1 bg-secondary-900 text-white">
      {/* Header Stats */}
      <div className="p-4 bg-secondary-800 border-b border-secondary-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">{scanCount}</p>
            <p className="text-xs text-secondary-300">Total Scans</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">{batchScans.filter(s => s.status === 'success').length}</p>
            <p className="text-xs text-secondary-300">Successful</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-warning">{batchScans.filter(s => s.status === 'duplicate').length}</p>
            <p className="text-xs text-secondary-300">Duplicates</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{scanRate}</p>
            <p className="text-xs text-secondary-300">Scans/Min</p>
          </div>
        </div>
      </div>

      {/* Scanning Status */}
      <div className="p-4 bg-secondary-800 border-b border-secondary-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${isScanning ? 'bg-success animate-pulse' : 'bg-secondary-500'}`}></div>
            <span className="text-sm font-medium">
              {isScanning ? 'Batch Scanning Active' : 'Scanning Paused'}
            </span>
          </div>
          <div className="text-sm text-secondary-300">
            Session: {sessionDuration}m
          </div>
        </div>
      </div>

      {/* Scan Results */}
      <div className="flex-1 overflow-y-auto">
        {batchScans.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Icon name="Scan" size={32} color="white" />
              </div>
              <p className="text-secondary-300">Waiting for QR codes...</p>
              <p className="text-sm text-secondary-400 mt-1">Position multiple codes in view</p>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {batchScans.map((scan) => (
              <div
                key={scan.id}
                className="bg-secondary-800 rounded-lg p-3 border border-secondary-700 hover:bg-secondary-700 transition-smooth"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${getStatusColor(scan.status)}`}>
                      <Icon name={getStatusIcon(scan.status)} size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{scan.name}</p>
                      <p className="text-xs text-secondary-400">{scan.attendeeId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-secondary-300">{formatTime(scan.timestamp)}</p>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(scan.status)}`}>
                      {scan.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-4 bg-secondary-800 border-t border-secondary-700">
        <div className="flex items-center justify-between space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-4 py-2 bg-secondary-700 text-white rounded-lg hover:bg-secondary-600 transition-smooth"
          >
            <Icon name="ArrowLeft" size={16} color="white" />
            <span className="text-sm font-medium">Single Mode</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsScanning(!isScanning)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-smooth ${
                isScanning
                  ? 'bg-warning text-white hover:bg-warning-600' :'bg-success text-white hover:bg-success-600'
              }`}
            >
              <Icon name={isScanning ? "Pause" : "Play"} size={16} color="white" />
              <span className="text-sm">{isScanning ? 'Pause' : 'Resume'}</span>
            </button>

            <button
              onClick={() => setBatchScans([])}
              className="flex items-center space-x-2 px-4 py-2 bg-error text-white rounded-lg hover:bg-error-600 transition-smooth"
            >
              <Icon name="Trash2" size={16} color="white" />
              <span className="text-sm font-medium">Clear</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-4 p-3 bg-secondary-700 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-secondary-300">Event Progress:</span>
            <span className="text-white font-medium">
              {eventData.checkedIn} / {eventData.totalRegistrations} 
              ({Math.round((eventData.checkedIn / eventData.totalRegistrations) * 100)}%)
            </span>
          </div>
          <div className="mt-2 w-full bg-secondary-600 rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${(eventData.checkedIn / eventData.totalRegistrations) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchScanningMode;
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import ScannerCamera from './components/ScannerCamera';
import AttendeeCard from './components/AttendeeCard';
import ManualEntry from './components/ManualEntry';
import BatchScanningMode from './components/BatchScanningMode';

const QRCodeScannerInterface = () => {
  const navigate = useNavigate();
  const [scannerMode, setScannerMode] = useState('camera'); // 'camera', 'manual', 'batch'
  const [isScanning, setIsScanning] = useState(true);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [cameraFacing, setCameraFacing] = useState('environment'); // 'user' for front, 'environment' for back
  const [scannedAttendee, setScannedAttendee] = useState(null);
  const [scanCount, setScanCount] = useState(0);
  const [isOffline, setIsOffline] = useState(false);
  const [pendingScans, setPendingScans] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Mock event data
  const eventData = {
    id: 'tech-conf-2024',
    name: 'Tech Conference 2024',
    date: '2024-12-15',
    venue: 'Convention Center Hall A',
    totalRegistrations: 1250,
    checkedIn: 847
  };

  // Mock attendee database
  const attendeeDatabase = [
    {
      id: 'ATT001',
      qrCode: 'QR_ATT001_TECH2024',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com',
      organization: 'TechCorp Solutions',
      ticketType: 'VIP',
      registrationDate: '2024-11-15',
      checkedIn: false,
      checkInTime: null,
      photo: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    {
      id: 'ATT002',
      qrCode: 'QR_ATT002_TECH2024',
      name: 'Michael Chen',
      email: 'michael.chen@innovate.com',
      organization: 'Innovate Labs',
      ticketType: 'Standard',
      registrationDate: '2024-11-20',
      checkedIn: true,
      checkInTime: '2024-12-15T09:30:00Z',
      photo: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    {
      id: 'ATT003',
      qrCode: 'QR_ATT003_TECH2024',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@startup.io',
      organization: 'StartupIO',
      ticketType: 'Student',
      registrationDate: '2024-11-25',
      checkedIn: false,
      checkInTime: null,
      photo: 'https://randomuser.me/api/portraits/women/28.jpg'
    }
  ];

  useEffect(() => {
    // Check online status
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleQRCodeScan = (qrData) => {
    const attendee = attendeeDatabase.find(att => att.qrCode === qrData);
    
    if (!attendee) {
      setErrorMessage('Invalid QR code. Please check and try again.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    if (attendee.checkedIn) {
      setErrorMessage(`${attendee.name} is already checked in at ${new Date(attendee.checkInTime).toLocaleTimeString()}`);
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    // Simulate check-in process
    attendee.checkedIn = true;
    attendee.checkInTime = new Date().toISOString();
    
    setScannedAttendee(attendee);
    setShowSuccess(true);
    setScanCount(prev => prev + 1);

    // Vibration feedback (if supported)
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }

    // Audio feedback
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
    audio.play().catch(() => {}); // Ignore audio errors

    if (isOffline) {
      setPendingScans(prev => [...prev, attendee]);
    }

    setTimeout(() => {
      setShowSuccess(false);
      setScannedAttendee(null);
      setIsScanning(true);
    }, 3000);
  };

  const handleManualEntry = (code) => {
    handleQRCodeScan(code);
  };

  const toggleFlashlight = () => {
    setFlashlightOn(!flashlightOn);
  };

  const switchCamera = () => {
    setCameraFacing(prev => prev === 'user' ? 'environment' : 'user');
  };

  const handleBackToScanner = () => {
    setScannedAttendee(null);
    setShowSuccess(false);
    setIsScanning(true);
    setScannerMode('camera');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-secondary-900 text-white overflow-hidden">
      {/* Header - Minimal for mobile */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-secondary-800/90 backdrop-blur-sm border-b border-secondary-700">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => handleNavigation('/live-check-in-dashboard')}
            className="flex items-center space-x-2 text-white hover:text-accent transition-smooth"
          >
            <Icon name="ArrowLeft" size={20} color="white" />
            <span className="text-sm font-medium">Back</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-sm font-semibold text-white">{eventData.name}</h1>
            <p className="text-xs text-secondary-300">QR Scanner</p>
          </div>

          <div className="flex items-center space-x-2">
            {isOffline && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-warning-500 rounded-full">
                <Icon name="WifiOff" size={12} color="white" />
                <span className="text-xs font-medium">Offline</span>
              </div>
            )}
            <div className="text-right">
              <p className="text-xs text-secondary-300">Scanned</p>
              <p className="text-sm font-semibold text-accent">{scanCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16 h-screen">
        {scannerMode === 'camera' && !scannedAttendee && (
          <ScannerCamera
            isScanning={isScanning}
            onScan={handleQRCodeScan}
            flashlightOn={flashlightOn}
            cameraFacing={cameraFacing}
            onToggleFlashlight={toggleFlashlight}
            onSwitchCamera={switchCamera}
            onSwitchToManual={() => setScannerMode('manual')}
            onSwitchToBatch={() => setScannerMode('batch')}
            errorMessage={errorMessage}
          />
        )}

        {scannerMode === 'manual' && (
          <ManualEntry
            onSubmit={handleManualEntry}
            onBack={handleBackToScanner}
            eventData={eventData}
          />
        )}

        {scannerMode === 'batch' && (
          <BatchScanningMode
            onScan={handleQRCodeScan}
            onBack={handleBackToScanner}
            scanCount={scanCount}
            eventData={eventData}
          />
        )}

        {scannedAttendee && (
          <AttendeeCard
            attendee={scannedAttendee}
            showSuccess={showSuccess}
            onContinue={handleBackToScanner}
            eventData={eventData}
          />
        )}
      </div>

      {/* Offline Status Banner */}
      {isOffline && pendingScans.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 bg-warning-500 text-white p-3 rounded-lg shadow-elevation-4 z-50">
          <div className="flex items-center space-x-2">
            <Icon name="WifiOff" size={16} color="white" />
            <span className="text-sm font-medium">
              {pendingScans.length} scans pending sync
            </span>
          </div>
        </div>
      )}

      {/* Quick Navigation - Desktop Only */}
      <div className="hidden lg:block fixed bottom-6 left-6 z-50">
        <div className="bg-surface rounded-lg shadow-elevation-4 border border-border p-4">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-text-secondary">Quick Nav:</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleNavigation('/live-check-in-dashboard')}
                className="flex items-center space-x-2 px-3 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary-700 transition-smooth"
              >
                <Icon name="Activity" size={16} color="white" />
                <span>Live Dashboard</span>
              </button>
              <button
                onClick={() => handleNavigation('/event-management-interface')}
                className="flex items-center space-x-2 px-3 py-2 bg-secondary-100 text-secondary rounded-lg font-medium text-sm hover:bg-secondary-200 transition-smooth"
              >
                <Icon name="Settings" size={16} color="#64748B" />
                <span>Event Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeScannerInterface;
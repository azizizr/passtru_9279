import React, { useEffect, useRef, useState } from 'react';
import Icon from 'components/AppIcon';

const ScannerCamera = ({
  isScanning,
  onScan,
  flashlightOn,
  cameraFacing,
  onToggleFlashlight,
  onSwitchCamera,
  onSwitchToManual,
  onSwitchToBatch,
  errorMessage
}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraPermission, setCameraPermission] = useState('prompt');
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    if (isScanning) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => stopCamera();
  }, [isScanning, cameraFacing]);

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: cameraFacing,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      setCameraPermission('granted');

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }

      // Start QR detection simulation
      setTimeout(() => {
        if (isScanning) {
          simulateQRDetection();
        }
      }, 2000);

    } catch (error) {
      console.error('Camera access error:', error);
      setCameraPermission('denied');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const simulateQRDetection = () => {
    // Simulate QR code detection for demo purposes
    const mockQRCodes = [
      'QR_ATT001_TECH2024',
      'QR_ATT002_TECH2024',
      'QR_ATT003_TECH2024'
    ];

    // Randomly trigger detection after 3-8 seconds
    const detectionTime = Math.random() * 5000 + 3000;
    
    setTimeout(() => {
      if (isScanning) {
        const randomQR = mockQRCodes[Math.floor(Math.random() * mockQRCodes.length)];
        setIsDetecting(true);
        
        setTimeout(() => {
          setIsDetecting(false);
          onScan(randomQR);
        }, 500);
      }
    }, detectionTime);
  };

  const handleManualScan = () => {
    // Simulate manual QR trigger for demo
    const mockQR = 'QR_ATT001_TECH2024';
    setIsDetecting(true);
    
    setTimeout(() => {
      setIsDetecting(false);
      onScan(mockQR);
    }, 500);
  };

  if (cameraPermission === 'denied') {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-error-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Camera" size={32} color="white" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Camera Access Required</h3>
          <p className="text-secondary-300 mb-6">
            Please allow camera access to scan QR codes. Check your browser settings and refresh the page.
          </p>
          <div className="space-y-3">
            <button
              onClick={startCamera}
              className="w-full bg-primary text-white px-4 py-3 rounded-lg font-medium hover:bg-primary-700 transition-smooth"
            >
              Try Again
            </button>
            <button
              onClick={onSwitchToManual}
              className="w-full bg-secondary-700 text-white px-4 py-3 rounded-lg font-medium hover:bg-secondary-600 transition-smooth"
            >
              Enter Code Manually
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 relative">
      {/* Camera Viewport */}
      <div className="relative h-full bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
        />
        
        {/* Scanning Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40">
          {/* Scanning Reticle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`relative w-64 h-64 border-2 rounded-lg transition-all duration-300 ${
              isDetecting ? 'border-success scale-105' : 'border-white'
            }`}>
              {/* Corner indicators */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-accent rounded-tl-lg"></div>
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-accent rounded-tr-lg"></div>
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-accent rounded-bl-lg"></div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-accent rounded-br-lg"></div>
              
              {/* Scanning line animation */}
              <div className={`absolute inset-x-0 h-0.5 bg-accent transition-all duration-1000 ${
                isScanning ? 'animate-pulse' : ''
              }`} style={{ top: '50%' }}></div>
              
              {/* Detection indicator */}
              {isDetecting && (
                <div className="absolute inset-0 bg-success bg-opacity-20 rounded-lg flex items-center justify-center">
                  <div className="bg-success text-white px-3 py-1 rounded-full text-sm font-medium">
                    QR Code Detected
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="absolute top-20 left-0 right-0 text-center px-6">
            <h2 className="text-xl font-semibold text-white mb-2">Scan QR Code</h2>
            <p className="text-secondary-300">
              Position the QR code within the frame to check in attendees
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="absolute top-32 left-4 right-4 bg-error-500 text-white p-3 rounded-lg shadow-elevation-4">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} color="white" />
                <span className="text-sm font-medium">{errorMessage}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Camera Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
        <div className="flex items-center justify-between">
          {/* Left Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleFlashlight}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-smooth ${
                flashlightOn ? 'bg-accent text-white' : 'bg-white bg-opacity-20 text-white'
              }`}
            >
              <Icon name={flashlightOn ? "FlashlightOff" : "Flashlight"} size={20} />
            </button>
            
            <button
              onClick={onSwitchCamera}
              className="w-12 h-12 bg-white bg-opacity-20 text-white rounded-full flex items-center justify-center hover:bg-opacity-30 transition-smooth"
            >
              <Icon name="RotateCcw" size={20} color="white" />
            </button>
          </div>

          {/* Center - Manual Scan Button */}
          <button
            onClick={handleManualScan}
            className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center shadow-elevation-4 hover:bg-accent-600 transition-smooth"
          >
            <Icon name="Scan" size={24} color="white" />
          </button>

          {/* Right Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onSwitchToBatch}
              className="w-12 h-12 bg-white bg-opacity-20 text-white rounded-full flex items-center justify-center hover:bg-opacity-30 transition-smooth"
            >
              <Icon name="Users" size={20} color="white" />
            </button>
          </div>
        </div>

        {/* Alternative Actions */}
        <div className="flex items-center justify-center space-x-4 mt-4">
          <button
            onClick={onSwitchToManual}
            className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-smooth"
          >
            <Icon name="Keyboard" size={16} color="white" />
            <span className="text-sm font-medium">Enter Manually</span>
          </button>
          
          <button
            onClick={() => window.location.href = '/live-check-in-dashboard'}
            className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-smooth"
          >
            <Icon name="Search" size={16} color="white" />
            <span className="text-sm font-medium">Search by ID</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScannerCamera;
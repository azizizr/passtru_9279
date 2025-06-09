import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const BrandingPanel = ({ isOpen, onClose, clientData }) => {
  const [formData, setFormData] = useState({
    organizationName: clientData.organization,
    domain: clientData.domain,
    primaryColor: clientData.primaryColor,
    secondaryColor: clientData.secondaryColor,
    logo: clientData.logo,
    favicon: '',
    emailSignature: `Best regards,
${clientData.organization} Team`,
    customCSS: '',
    footerText: `© ${new Date().getFullYear()} ${clientData.organization}. All rights reserved.`
  });

  const [activeTab, setActiveTab] = useState('general');
  const [logoPreview, setLogoPreview] = useState(clientData.logo);

  const colorPresets = [
    { name: 'Professional Blue', primary: '#2563EB', secondary: '#64748B' },
    { name: 'Success Green', primary: '#059669', secondary: '#6B7280' },
    { name: 'Vibrant Orange', primary: '#EA580C', secondary: '#6B7280' },
    { name: 'Purple', primary: '#7C3AED', secondary: '#6B7280' },
    { name: 'Teal', primary: '#0D9488', secondary: '#6B7280' },
    { name: 'Rose', primary: '#E11D48', secondary: '#6B7280' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        setLogoPreview(result);
        handleInputChange('logo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorPreset = (preset) => {
    handleInputChange('primaryColor', preset.primary);
    handleInputChange('secondaryColor', preset.secondary);
  };

  const handleSave = () => {
    console.log('Saving branding configuration:', formData);
    onClose();
  };

  const handleReset = () => {
    setFormData({
      organizationName: clientData.organization,
      domain: clientData.domain,
      primaryColor: clientData.primaryColor,
      secondaryColor: clientData.secondaryColor,
      logo: clientData.logo,
      favicon: '',
      emailSignature: `Best regards,
${clientData.organization} Team`,
      customCSS: '',
      footerText: `© ${new Date().getFullYear()} ${clientData.organization}. All rights reserved.`
    });
    setLogoPreview(clientData.logo);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1003 overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-surface shadow-elevation-4 animate-slide-left">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Branding Configuration</h2>
            <p className="text-sm text-text-secondary">Customize your organization's appearance</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'general', label: 'General', icon: 'Settings' },
              { id: 'colors', label: 'Colors & Theme', icon: 'Palette' },
              { id: 'assets', label: 'Assets', icon: 'Image' },
              { id: 'preview', label: 'Preview', icon: 'Eye' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-smooth ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={formData.organizationName}
                  onChange={(e) => handleInputChange('organizationName', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Custom Domain
                </label>
                <input
                  type="text"
                  value={formData.domain}
                  onChange={(e) => handleInputChange('domain', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-text-secondary mt-1">
                  Your events will be accessible at this domain
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email Signature
                </label>
                <textarea
                  value={formData.emailSignature}
                  onChange={(e) => handleInputChange('emailSignature', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Footer Text
                </label>
                <input
                  type="text"
                  value={formData.footerText}
                  onChange={(e) => handleInputChange('footerText', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          )}

          {activeTab === 'colors' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-4">Color Presets</h3>
                <div className="grid grid-cols-2 gap-3">
                  {colorPresets.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => handleColorPreset(preset)}
                      className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-secondary-50 transition-smooth"
                    >
                      <div className="flex space-x-1">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: preset.primary }}
                        ></div>
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: preset.secondary }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-text-primary">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      className="w-12 h-10 border border-border rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Secondary Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={formData.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      className="w-12 h-10 border border-border rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Custom CSS
                </label>
                <textarea
                  value={formData.customCSS}
                  onChange={(e) => handleInputChange('customCSS', e.target.value)}
                  rows={6}
                  placeholder="/* Add your custom CSS here */"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                />
              </div>
            </div>
          )}

          {activeTab === 'assets' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Organization Logo
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 border-2 border-dashed border-border rounded-lg flex items-center justify-center overflow-hidden">
                    {logoPreview ? (
                      <Image 
                        src={logoPreview} 
                        alt="Logo preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Icon name="Image" size={24} color="#CBD5E1" />
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 cursor-pointer transition-smooth"
                    >
                      <Icon name="Upload" size={16} color="white" />
                      <span>Upload Logo</span>
                    </label>
                    <p className="text-xs text-text-secondary mt-2">
                      Recommended: 200x200px, PNG or SVG format
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Favicon
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 border-2 border-dashed border-border rounded flex items-center justify-center">
                    <Icon name="Globe" size={16} color="#CBD5E1" />
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="favicon-upload"
                    />
                    <label
                      htmlFor="favicon-upload"
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-secondary-100 text-secondary rounded-lg hover:bg-secondary-200 cursor-pointer transition-smooth"
                    >
                      <Icon name="Upload" size={16} />
                      <span>Upload Favicon</span>
                    </label>
                    <p className="text-xs text-text-secondary mt-2">
                      Recommended: 32x32px, ICO or PNG format
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-4">Live Preview</h3>
                <div className="border border-border rounded-lg overflow-hidden">
                  {/* Preview Header */}
                  <div 
                    className="p-4 text-white"
                    style={{ backgroundColor: formData.primaryColor }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center overflow-hidden">
                        {logoPreview ? (
                          <Image 
                            src={logoPreview} 
                            alt="Logo preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Icon name="Building2" size={20} color="white" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold">{formData.organizationName}</h4>
                        <p className="text-sm opacity-80">{formData.domain}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Preview Content */}
                  <div className="p-4 bg-white">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: formData.primaryColor }}
                        ></div>
                        <span className="text-sm font-medium">Primary Color</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: formData.secondaryColor }}
                        ></div>
                        <span className="text-sm font-medium">Secondary Color</span>
                      </div>
                      <div className="pt-4 border-t border-border">
                        <p className="text-xs text-text-secondary">{formData.footerText}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6">
          <div className="flex items-center justify-between">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth"
            >
              Reset to Default
            </button>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingPanel;
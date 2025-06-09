// src/pages/event-management-interface/components/AttendeeManagementTab.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const AttendeeManagementTab = ({ eventData, eventStats, setEventStats }) => {
  const [activeView, setActiveView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCustomFields, setShowCustomFields] = useState(false);
  const [customFields, setCustomFields] = useState([
    { id: 1, name: 'Company', type: 'text', required: false },
    { id: 2, name: 'Job Title', type: 'text', required: false },
    { id: 3, name: 'Phone Number', type: 'tel', required: true }
  ]);

  // Mock attendee data
  const [attendees, setAttendees] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      status: 'confirmed',
      registrationDate: '2024-02-15',
      checkInTime: null,
      company: 'Tech Corp',
      jobTitle: 'Software Engineer',
      phone: '+1-555-0123',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      status: 'pending',
      registrationDate: '2024-02-16',
      checkInTime: null,
      company: 'Innovation Labs',
      jobTitle: 'Product Manager',
      phone: '+1-555-0124',
      avatar: 'https://images.pixabay.com/photo/2017/06/26/02/47/man-2442565_1280.jpg?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike.davis@email.com',
      status: 'confirmed',
      registrationDate: '2024-02-14',
      checkInTime: '2024-03-15T09:15:00',
      company: 'StartupXYZ',
      jobTitle: 'CTO',
      phone: '+1-555-0125',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 4,
      name: 'Emily Chen',
      email: 'emily.chen@email.com',
      status: 'waitlisted',
      registrationDate: '2024-02-17',
      checkInTime: null,
      company: 'Design Studio',
      jobTitle: 'UX Designer',
      phone: '+1-555-0126',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop&crop=center'
    }
  ]);

  const filteredAttendees = attendees?.filter(attendee => {
    const matchesSearch = attendee?.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
                         attendee?.email?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
                         attendee?.company?.toLowerCase().includes(searchTerm?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || attendee?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (attendeeId, newStatus) => {
    setAttendees(prev => prev?.map(attendee => 
      attendee?.id === attendeeId ? { ...attendee, status: newStatus } : attendee
    ));
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action}`);
  };

  const handleAddCustomField = () => {
    if (customFields?.length < 6) {
      const newField = {
        id: Date.now(),
        name: 'New Field',
        type: 'text',
        required: false
      };
      setCustomFields([...customFields, newField]);
    }
  };

  const handleRemoveCustomField = (fieldId) => {
    setCustomFields(prev => prev?.filter(field => field?.id !== fieldId));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success text-white';
      case 'pending':
        return 'bg-warning text-white';
      case 'waitlisted':
        return 'bg-accent text-white';
      case 'cancelled':
        return 'bg-error text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'waitlisted':
        return 'Users';
      case 'cancelled':
        return 'XCircle';
      default:
        return 'HelpCircle';
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex bg-secondary-100 rounded-lg p-1">
              <button
                onClick={() => setActiveView('list')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-smooth ${
                  activeView === 'list' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name="List" size={16} className="inline mr-1" />
                List View
              </button>
              <button
                onClick={() => setActiveView('upload')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-smooth ${
                  activeView === 'upload' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name="Upload" size={16} className="inline mr-1" />
                Bulk Upload
              </button>
              <button
                onClick={() => setActiveView('fields')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-smooth ${
                  activeView === 'fields' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name="Settings" size={16} className="inline mr-1" />
                Custom Fields
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleBulkAction('export')}
              className="flex items-center space-x-2 px-4 py-2 bg-secondary-50 text-secondary hover:bg-secondary-100 rounded-lg font-medium transition-smooth"
            >
              <Icon name="Download" size={16} />
              <span>Export</span>
            </button>
            <button
              onClick={() => handleBulkAction('invite')}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white hover:bg-primary-700 rounded-lg font-medium transition-smooth"
            >
              <Icon name="UserPlus" size={16} color="white" />
              <span>Add Attendee</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content based on active view */}
      {activeView === 'list' && (
        <div className="space-y-6">
          {/* Filters and Search */}
          <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search attendees..."
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="waitlisted">Waitlisted</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                
                <div className="text-sm text-text-secondary">
                  {filteredAttendees?.length} of {attendees?.length} attendees
                </div>
              </div>
            </div>
          </div>

          {/* Attendees Table */}
          <div className="bg-surface rounded-lg shadow-elevation-2 border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary-50 border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-text-primary text-sm">
                      <input type="checkbox" className="rounded border-border" />
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-text-primary text-sm">Attendee</th>
                    <th className="text-left py-3 px-4 font-medium text-text-primary text-sm">Company</th>
                    <th className="text-left py-3 px-4 font-medium text-text-primary text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-text-primary text-sm">Registration Date</th>
                    <th className="text-left py-3 px-4 font-medium text-text-primary text-sm">Check-in</th>
                    <th className="text-left py-3 px-4 font-medium text-text-primary text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredAttendees?.map((attendee) => (
                    <tr key={attendee?.id} className="hover:bg-secondary-50 transition-smooth">
                      <td className="py-3 px-4">
                        <input type="checkbox" className="rounded border-border" />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary-100 flex items-center justify-center">
                            {attendee?.avatar ? (
                              <Image 
                                src={attendee.avatar} 
                                alt={attendee.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Icon name="User" size={20} color="#64748B" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-text-primary">{attendee?.name}</p>
                            <p className="text-sm text-text-secondary">{attendee?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm font-medium text-text-primary">{attendee?.company}</p>
                          <p className="text-xs text-text-secondary">{attendee?.jobTitle}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(attendee?.status)}`}>
                          <Icon name={getStatusIcon(attendee?.status)} size={12} color="white" />
                          <span className="capitalize">{attendee?.status}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-text-secondary">
                        {new Date(attendee?.registrationDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-text-secondary">
                        {attendee?.checkInTime ? (
                          <div className="flex items-center space-x-1 text-success">
                            <Icon name="CheckCircle" size={14} color="#059669" />
                            <span>{new Date(attendee.checkInTime).toLocaleTimeString()}</span>
                          </div>
                        ) : (
                          <span className="text-text-muted">Not checked in</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-1.5 text-text-secondary hover:text-primary hover:bg-primary-50 rounded transition-smooth">
                            <Icon name="Edit2" size={14} />
                          </button>
                          <button className="p-1.5 text-text-secondary hover:text-accent hover:bg-accent-50 rounded transition-smooth">
                            <Icon name="Mail" size={14} />
                          </button>
                          <button className="p-1.5 text-text-secondary hover:text-error hover:bg-error-50 rounded transition-smooth">
                            <Icon name="Trash2" size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeView === 'upload' && (
        <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-6">Bulk Upload Attendees</h3>
          
          <div className="space-y-6">
            <div className="border-2 border-dashed border-border rounded-lg p-8">
              <div className="text-center">
                <Icon name="Upload" size={48} color="#CBD5E1" className="mx-auto mb-4" />
                <h4 className="text-lg font-medium text-text-primary mb-2">Upload attendee data</h4>
                <p className="text-text-secondary mb-4">Drop your CSV or XLSX file here, or click to browse</p>
                <input type="file" accept=".csv,.xlsx,.xls" className="hidden" id="file-upload" />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 cursor-pointer transition-smooth"
                >
                  <Icon name="Upload" size={16} color="white" />
                  <span>Choose File</span>
                </label>
              </div>
            </div>

            <div className="bg-secondary-50 rounded-lg p-4">
              <h5 className="font-medium text-text-primary mb-2">File Requirements:</h5>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Supported formats: CSV, XLSX, XLS</li>
                <li>• Maximum file size: 10MB</li>
                <li>• Required columns: Name, Email</li>
                <li>• Optional columns: Company, Job Title, Phone Number</li>
              </ul>
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 text-secondary hover:bg-secondary-200 rounded-lg font-medium transition-smooth">
                <Icon name="Download" size={16} />
                <span>Download Template</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-accent-100 text-accent hover:bg-accent-200 rounded-lg font-medium transition-smooth">
                <Icon name="FileText" size={16} />
                <span>View Sample</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeView === 'fields' && (
        <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Custom Registration Fields</h3>
              <p className="text-sm text-text-secondary">Configure additional fields for attendee registration (max 6 fields)</p>
            </div>
            <button
              onClick={handleAddCustomField}
              disabled={customFields?.length >= 6}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white hover:bg-primary-700 disabled:bg-secondary disabled:text-text-muted rounded-lg font-medium transition-smooth"
            >
              <Icon name="Plus" size={16} color="white" />
              <span>Add Field</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {customFields?.map((field, index) => (
              <div key={field?.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <input
                      type="text"
                      value={field?.name}
                      onChange={(e) => {
                        const updatedFields = [...customFields];
                        updatedFields[index] = { ...field, name: e.target.value };
                        setCustomFields(updatedFields);
                      }}
                      placeholder="Field name"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <select
                      value={field?.type}
                      onChange={(e) => {
                        const updatedFields = [...customFields];
                        updatedFields[index] = { ...field, type: e.target.value };
                        setCustomFields(updatedFields);
                      }}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="text">Text</option>
                      <option value="email">Email</option>
                      <option value="tel">Phone</option>
                      <option value="number">Number</option>
                      <option value="date">Date</option>
                      <option value="select">Dropdown</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={field?.required}
                        onChange={(e) => {
                          const updatedFields = [...customFields];
                          updatedFields[index] = { ...field, required: e.target.checked };
                          setCustomFields(updatedFields);
                        }}
                        className="rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-text-secondary">Required</span>
                    </label>
                    <button
                      onClick={() => handleRemoveCustomField(field?.id)}
                      className="p-1.5 text-error hover:bg-error-50 rounded transition-smooth"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {customFields?.length === 0 && (
              <div className="text-center py-8">
                <Icon name="Settings" size={48} color="#CBD5E1" className="mx-auto mb-4" />
                <p className="text-text-secondary">No custom fields configured</p>
                <p className="text-sm text-text-muted">Add custom fields to collect additional attendee information</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendeeManagementTab;
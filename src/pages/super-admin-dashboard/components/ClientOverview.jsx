import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ClientOverview = () => {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const clients = [
    {
      id: 1,
      name: 'TechCorp Solutions',
      plan: 'Enterprise',
      status: 'active',
      eventsCount: 12,
      totalCheckins: 15420,
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
      joinDate: new Date('2023-01-15'),
      region: 'North America',
      contactEmail: 'admin@techcorp.com',
      usage: 78
    },
    {
      id: 2,
      name: 'GlobalEvents Inc',
      plan: 'Professional',
      status: 'active',
      eventsCount: 8,
      totalCheckins: 9850,
      lastActivity: new Date(Date.now() - 30 * 60 * 1000),
      joinDate: new Date('2023-03-22'),
      region: 'Europe',
      contactEmail: 'contact@globalevents.com',
      usage: 92
    },
    {
      id: 3,
      name: 'University of Excellence',
      plan: 'Education',
      status: 'active',
      eventsCount: 25,
      totalCheckins: 32100,
      lastActivity: new Date(Date.now() - 45 * 60 * 1000),
      joinDate: new Date('2022-08-10'),
      region: 'North America',
      contactEmail: 'events@university.edu',
      usage: 45
    },
    {
      id: 4,
      name: 'EventPro Ltd',
      plan: 'Professional',
      status: 'suspended',
      eventsCount: 5,
      totalCheckins: 2340,
      lastActivity: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      joinDate: new Date('2023-06-05'),
      region: 'Asia Pacific',
      contactEmail: 'support@eventpro.com',
      usage: 15
    },
    {
      id: 5,
      name: 'Corporate Training Co',
      plan: 'Enterprise',
      status: 'active',
      eventsCount: 18,
      totalCheckins: 28750,
      lastActivity: new Date(Date.now() - 15 * 60 * 1000),
      joinDate: new Date('2022-11-30'),
      region: 'Europe',
      contactEmail: 'admin@corptraining.com',
      usage: 67
    },
    {
      id: 6,
      name: 'StartupHub Events',
      plan: 'Starter',
      status: 'trial',
      eventsCount: 2,
      totalCheckins: 450,
      lastActivity: new Date(Date.now() - 3 * 60 * 60 * 1000),
      joinDate: new Date('2024-01-08'),
      region: 'North America',
      contactEmail: 'hello@startuphub.com',
      usage: 23
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success-100 text-success border-success-200';
      case 'suspended':
        return 'bg-error-100 text-error border-error-200';
      case 'trial':
        return 'bg-warning-100 text-warning border-warning-200';
      default:
        return 'bg-secondary-100 text-secondary border-secondary-200';
    }
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'Enterprise':
        return 'bg-primary-100 text-primary border-primary-200';
      case 'Professional':
        return 'bg-accent-100 text-accent border-accent-200';
      case 'Education':
        return 'bg-success-100 text-success border-success-200';
      case 'Starter':
        return 'bg-secondary-100 text-secondary border-secondary-200';
      default:
        return 'bg-secondary-100 text-secondary border-secondary-200';
    }
  };

  const getUsageColor = (usage) => {
    if (usage >= 90) return 'text-error';
    if (usage >= 70) return 'text-warning';
    return 'text-success';
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatLastActivity = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const sortedClients = [...clients].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (sortBy === 'lastActivity' || sortBy === 'joinDate') {
      aValue = aValue.getTime();
      bValue = bValue.getTime();
    }

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const filteredClients = sortedClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contactEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClientAction = (action, clientId) => {
    console.log(`${action} action for client ${clientId}`);
  };

  return (
    <div>
      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <h3 className="text-lg font-semibold text-text-primary">Client Management</h3>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              color="var(--color-text-muted)" 
              className="absolute left-3 top-1/2 transform -translate-y-1/2" 
            />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth">
            <Icon name="Plus" size={16} color="white" />
            <span className="text-sm font-medium">Add Client</span>
          </button>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-surface rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50 border-b border-border">
              <tr>
                {[
                  { key: 'name', label: 'Client Name' },
                  { key: 'plan', label: 'Plan' },
                  { key: 'status', label: 'Status' },
                  { key: 'eventsCount', label: 'Events' },
                  { key: 'totalCheckins', label: 'Check-ins' },
                  { key: 'usage', label: 'Usage' },
                  { key: 'lastActivity', label: 'Last Activity' },
                  { key: 'actions', label: 'Actions' }
                ].map((column) => (
                  <th
                    key={column.key}
                    className={`px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider ${
                      column.key !== 'actions' ? 'cursor-pointer hover:bg-secondary-100' : ''
                    }`}
                    onClick={() => column.key !== 'actions' && handleSort(column.key)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.label}</span>
                      {column.key !== 'actions' && sortBy === column.key && (
                        <Icon 
                          name={sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                          size={14} 
                          color="var(--color-text-secondary)" 
                        />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-secondary-50 transition-smooth">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-text-primary">{client.name}</div>
                      <div className="text-sm text-text-muted">{client.contactEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getPlanColor(client.plan)}`}>
                      {client.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(client.status)}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-primary">{client.eventsCount}</td>
                  <td className="px-6 py-4 text-sm text-text-primary">{client.totalCheckins.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-secondary-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            client.usage >= 90 ? 'bg-error' :
                            client.usage >= 70 ? 'bg-warning' : 'bg-success'
                          }`}
                          style={{ width: `${client.usage}%` }}
                        ></div>
                      </div>
                      <span className={`text-xs font-medium ${getUsageColor(client.usage)}`}>
                        {client.usage}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">
                    {formatLastActivity(client.lastActivity)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleClientAction('view', client.id)}
                        className="p-1 text-text-muted hover:text-accent hover:bg-accent-50 rounded transition-smooth"
                        title="View Details"
                      >
                        <Icon name="Eye" size={16} />
                      </button>
                      <button
                        onClick={() => handleClientAction('edit', client.id)}
                        className="p-1 text-text-muted hover:text-primary hover:bg-primary-50 rounded transition-smooth"
                        title="Edit Client"
                      >
                        <Icon name="Edit" size={16} />
                      </button>
                      <button
                        onClick={() => handleClientAction('suspend', client.id)}
                        className="p-1 text-text-muted hover:text-warning hover:bg-warning-50 rounded transition-smooth"
                        title="Suspend Client"
                      >
                        <Icon name="Pause" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {filteredClients.map((client) => (
          <div key={client.id} className="bg-surface rounded-lg border border-border p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-sm font-semibold text-text-primary">{client.name}</h4>
                <p className="text-xs text-text-muted">{client.contactEmail}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getPlanColor(client.plan)}`}>
                  {client.plan}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(client.status)}`}>
                  {client.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
              <div>
                <span className="text-text-muted">Events:</span>
                <span className="text-text-primary font-medium ml-1">{client.eventsCount}</span>
              </div>
              <div>
                <span className="text-text-muted">Check-ins:</span>
                <span className="text-text-primary font-medium ml-1">{client.totalCheckins.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 flex-1">
                <span className="text-xs text-text-muted">Usage:</span>
                <div className="flex-1 bg-secondary-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      client.usage >= 90 ? 'bg-error' :
                      client.usage >= 70 ? 'bg-warning' : 'bg-success'
                    }`}
                    style={{ width: `${client.usage}%` }}
                  ></div>
                </div>
                <span className={`text-xs font-medium ${getUsageColor(client.usage)}`}>
                  {client.usage}%
                </span>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => handleClientAction('view', client.id)}
                  className="p-1 text-text-muted hover:text-accent hover:bg-accent-50 rounded transition-smooth"
                >
                  <Icon name="Eye" size={16} />
                </button>
                <button
                  onClick={() => handleClientAction('edit', client.id)}
                  className="p-1 text-text-muted hover:text-primary hover:bg-primary-50 rounded transition-smooth"
                >
                  <Icon name="Edit" size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-text-secondary">
          Showing {filteredClients.length} of {clients.length} clients
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm text-text-secondary hover:text-text-primary border border-border rounded hover:bg-secondary-50 transition-smooth">
            Previous
          </button>
          <button className="px-3 py-1 text-sm bg-primary text-white rounded">1</button>
          <button className="px-3 py-1 text-sm text-text-secondary hover:text-text-primary border border-border rounded hover:bg-secondary-50 transition-smooth">
            2
          </button>
          <button className="px-3 py-1 text-sm text-text-secondary hover:text-text-primary border border-border rounded hover:bg-secondary-50 transition-smooth">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientOverview;
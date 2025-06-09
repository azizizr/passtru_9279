import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const PendingApprovals = () => {
  const [approvals] = useState([
    {
      id: 1,
      type: 'client_registration',
      title: 'New Client Registration',
      description: 'StartupHub Events requesting Enterprise plan access',
      requester: 'Sarah Wilson',
      email: 'sarah@startuphub.com',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      priority: 'high',
      details: {
        company: 'StartupHub Events',
        plan: 'Enterprise',
        expectedEvents: 50,
        region: 'North America'
      }
    },
    {
      id: 2,
      type: 'plan_upgrade',
      title: 'Plan Upgrade Request',
      description: 'EventPro Ltd requesting upgrade from Professional to Enterprise',
      requester: 'Michael Chen',
      email: 'michael@eventpro.com',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      priority: 'medium',
      details: {
        currentPlan: 'Professional',
        requestedPlan: 'Enterprise',
        reason: 'Increased event volume',
        client: 'EventPro Ltd'
      }
    },
    {
      id: 3,
      type: 'feature_request',
      title: 'Custom Feature Request',
      description: 'University of Excellence requesting custom branding features',
      requester: 'Dr. Amanda Foster',
      email: 'amanda.foster@university.edu',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      priority: 'low',
      details: {
        feature: 'Custom Email Templates',
        justification: 'University branding requirements',
        client: 'University of Excellence'
      }
    },
    {
      id: 4,
      type: 'data_export',
      title: 'Bulk Data Export Request',
      description: 'TechCorp Solutions requesting historical data export',
      requester: 'James Rodriguez',
      email: 'james@techcorp.com',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      priority: 'medium',
      details: {
        dataRange: 'Last 2 years',
        format: 'CSV + PDF Reports',
        purpose: 'Compliance audit',
        client: 'TechCorp Solutions'
      }
    }
  ]);

  const getApprovalIcon = (type) => {
    switch (type) {
      case 'client_registration':
        return 'UserPlus';
      case 'plan_upgrade':
        return 'ArrowUp';
      case 'feature_request':
        return 'Zap';
      case 'data_export':
        return 'Download';
      default:
        return 'Clock';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error-50 border-error-200';
      case 'medium':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'low':
        return 'text-success bg-success-50 border-success-200';
      default:
        return 'text-secondary bg-secondary-50 border-secondary-200';
    }
  };

  const getIconColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'var(--color-error)';
      case 'medium':
        return 'var(--color-warning)';
      case 'low':
        return 'var(--color-success)';
      default:
        return 'var(--color-secondary)';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleApproval = (id, action) => {
    console.log(`${action} approval ${id}`);
  };

  return (
    <div className="bg-surface rounded-lg shadow-elevation-2 border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-text-primary">Pending Approvals</h3>
          <span className="bg-warning text-white text-xs rounded-full px-2 py-1 font-medium">
            {approvals.length}
          </span>
        </div>
        <button className="text-sm text-accent hover:text-accent-600 font-medium">
          View All
        </button>
      </div>

      {/* Approvals List */}
      <div className="max-h-80 overflow-y-auto">
        {approvals.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <Icon name="CheckCircle" size={48} color="var(--color-success)" />
            <p className="text-text-secondary mt-2">No pending approvals</p>
            <p className="text-text-muted text-sm">All requests have been processed</p>
          </div>
        ) : (
          <div className="divide-y divide-border-light">
            {approvals.map((approval) => (
              <div key={approval.id} className="p-4 hover:bg-secondary-50 transition-smooth">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getPriorityColor(approval.priority)}`}>
                    <Icon 
                      name={getApprovalIcon(approval.type)} 
                      size={18} 
                      color={getIconColor(approval.priority)} 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-semibold text-text-primary">
                            {approval.title}
                          </h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityColor(approval.priority)}`}>
                            {approval.priority}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary mt-1">
                          {approval.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-text-muted mt-2">
                          <span>By: {approval.requester}</span>
                          <span>{formatTimestamp(approval.timestamp)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Approval Details */}
                    <div className="bg-secondary-50 rounded p-3 mb-3">
                      <div className="grid grid-cols-1 gap-1 text-xs">
                        {Object.entries(approval.details).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-text-muted capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span className="text-text-primary font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleApproval(approval.id, 'approve')}
                        className="flex items-center space-x-1 px-3 py-1 bg-success text-white text-xs font-medium rounded hover:bg-success-500 transition-smooth"
                      >
                        <Icon name="Check" size={12} color="white" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleApproval(approval.id, 'reject')}
                        className="flex items-center space-x-1 px-3 py-1 bg-error text-white text-xs font-medium rounded hover:bg-error-500 transition-smooth"
                      >
                        <Icon name="X" size={12} color="white" />
                        <span>Reject</span>
                      </button>
                      <button
                        onClick={() => handleApproval(approval.id, 'review')}
                        className="flex items-center space-x-1 px-3 py-1 bg-secondary-100 text-secondary text-xs font-medium rounded hover:bg-secondary-200 transition-smooth"
                      >
                        <Icon name="Eye" size={12} />
                        <span>Review</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="border-t border-border p-3">
        <div className="flex items-center justify-between">
          <button className="text-sm text-success hover:text-success-500 font-medium">
            Approve All
          </button>
          <button className="text-sm text-accent hover:text-accent-600 font-medium">
            Bulk Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingApprovals;
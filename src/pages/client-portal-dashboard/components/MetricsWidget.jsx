import React from 'react';
import Icon from 'components/AppIcon';

const MetricsWidget = ({ metric }) => {
  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getChangeIcon = (changeType) => {
    switch (changeType) {
      case 'positive':
        return 'TrendingUp';
      case 'negative':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  const getIconColor = (iconName) => {
    switch (iconName) {
      case 'Calendar':
        return '#2563EB';
      case 'Users':
        return '#059669';
      case 'UserCheck':
        return '#0EA5E9';
      case 'TrendingUp':
        return '#D97706';
      default:
        return '#64748B';
    }
  };

  const getBackgroundColor = (iconName) => {
    switch (iconName) {
      case 'Calendar':
        return 'bg-primary-50';
      case 'Users':
        return 'bg-success-50';
      case 'UserCheck':
        return 'bg-accent-50';
      case 'TrendingUp':
        return 'bg-warning-50';
      default:
        return 'bg-secondary-50';
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6 hover:shadow-elevation-3 transition-smooth">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getBackgroundColor(metric.icon)}`}>
          <Icon 
            name={metric.icon} 
            size={24} 
            color={getIconColor(metric.icon)} 
          />
        </div>
        <div className={`flex items-center space-x-1 ${getChangeColor(metric.changeType)}`}>
          <Icon 
            name={getChangeIcon(metric.changeType)} 
            size={16} 
          />
          <span className="text-sm font-medium">{metric.change}</span>
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-text-primary mb-1">{metric.value}</h3>
        <p className="text-sm font-medium text-text-primary mb-1">{metric.title}</p>
        <p className="text-xs text-text-secondary">{metric.description}</p>
      </div>
    </div>
  );
};

export default MetricsWidget;
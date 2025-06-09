import React from 'react';
import Icon from 'components/AppIcon';

const MetricsCard = ({ metric }) => {
  const getCardClasses = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary-50 border-primary-200';
      case 'success':
        return 'bg-success-50 border-success-200';
      case 'accent':
        return 'bg-accent-50 border-accent-200';
      case 'warning':
        return 'bg-warning-50 border-warning-200';
      case 'error':
        return 'bg-error-50 border-error-200';
      default:
        return 'bg-secondary-50 border-secondary-200';
    }
  };

  const getIconColor = (color) => {
    switch (color) {
      case 'primary':
        return 'var(--color-primary)';
      case 'success':
        return 'var(--color-success)';
      case 'accent':
        return 'var(--color-accent)';
      case 'warning':
        return 'var(--color-warning)';
      case 'error':
        return 'var(--color-error)';
      default:
        return 'var(--color-secondary)';
    }
  };

  const getChangeColor = (changeType) => {
    return changeType === 'increase' ? 'text-success' : 'text-error';
  };

  const getChangeIcon = (changeType) => {
    return changeType === 'increase' ? 'TrendingUp' : 'TrendingDown';
  };

  return (
    <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6 hover:shadow-elevation-3 transition-smooth">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getCardClasses(metric.color)}`}>
          <Icon name={metric.icon} size={24} color={getIconColor(metric.color)} />
        </div>
        <div className={`flex items-center space-x-1 ${getChangeColor(metric.changeType)}`}>
          <Icon name={getChangeIcon(metric.changeType)} size={16} />
          <span className="text-sm font-medium">{metric.change}</span>
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-text-primary mb-1">{metric.value}</h3>
        <p className="text-sm text-text-secondary">{metric.title}</p>
      </div>
    </div>
  );
};

export default MetricsCard;
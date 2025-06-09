import React from 'react';
import Icon from 'components/AppIcon';

const MetricCard = ({ title, value, icon, color = 'secondary', trend, progress }) => {
  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-primary-50',
          icon: '#2563EB',
          text: 'text-primary'
        };
      case 'success':
        return {
          bg: 'bg-success-50',
          icon: '#059669',
          text: 'text-success'
        };
      case 'warning':
        return {
          bg: 'bg-warning-50',
          icon: '#D97706',
          text: 'text-warning'
        };
      case 'error':
        return {
          bg: 'bg-error-50',
          icon: '#DC2626',
          text: 'text-error'
        };
      default:
        return {
          bg: 'bg-secondary-50',
          icon: '#64748B',
          text: 'text-secondary'
        };
    }
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className="bg-surface rounded-lg p-4 border border-border hover:shadow-elevation-2 transition-smooth">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 ${colorClasses.bg} rounded-lg flex items-center justify-center`}>
          <Icon name={icon} size={20} color={colorClasses.icon} />
        </div>
        {trend && (
          <div className="flex items-center space-x-1">
            <Icon name="TrendingUp" size={14} color="#059669" />
            <span className="text-xs font-medium text-success">{trend}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <div className="text-2xl font-bold text-text-primary">{value}</div>
        <div className="text-sm text-text-secondary">{title}</div>
        
        {progress !== undefined && (
          <div className="mt-2">
            <div className="w-full bg-secondary-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  color === 'primary' ? 'bg-primary' :
                  color === 'success' ? 'bg-success' :
                  color === 'warning' ? 'bg-warning' :
                  color === 'error'? 'bg-error' : 'bg-secondary'
                }`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
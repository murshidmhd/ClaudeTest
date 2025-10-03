// src/components/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`flex items-center justify-center ${className}`} role="status" aria-label="Loading">
      <div 
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-primary-600 rounded-full loading-spinner`}
        aria-hidden="true"
      ></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
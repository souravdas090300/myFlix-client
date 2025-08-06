import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

/**
 * PerformanceDashboard component for development performance monitoring
 */
export const PerformanceDashboard = ({ 
  onToggleVirtualization, 
  useVirtualization, 
  movieCount = 0 
}) => {
  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div 
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex: 1050,
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '12px',
        fontFamily: 'monospace'
      }}
    >
      <div className="mb-2">
        <strong>Performance Dashboard</strong>
      </div>
      
      <div className="mb-2">
        Movies: <Badge bg="info">{movieCount}</Badge>
      </div>
      
      <div className="mb-2">
        Virtualization: {' '}
        <Badge bg={useVirtualization ? 'success' : 'secondary'}>
          {useVirtualization ? 'ON' : 'OFF'}
        </Badge>
      </div>
      
      <Button 
        size="sm" 
        variant="outline-light" 
        onClick={onToggleVirtualization}
        style={{ fontSize: '10px' }}
      >
        Toggle Virtualization
      </Button>
    </div>
  );
};

PerformanceDashboard.propTypes = {
  onToggleVirtualization: PropTypes.func.isRequired,
  useVirtualization: PropTypes.bool.isRequired,
  movieCount: PropTypes.number
};

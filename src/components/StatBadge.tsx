import React from 'react';
import { Badge } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/types';
import { IconType } from 'react-icons';

interface StatBadgeProps {
  variant: Variant;
  Icon: IconType;
  value?: number | string;
  size?: number;
}

const StatBadge: React.FC<StatBadgeProps> = ({ variant, Icon, value, size }) => {
  return (
    <Badge bg={variant} className="d-flex align-items-center">
      <Icon size={size || 18} className="me-1" />
      {value}
    </Badge>
  );
};

export default StatBadge;
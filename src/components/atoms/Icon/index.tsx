import React from 'react';
import styles from './styles.module.scss';

interface IconProps {
  onClick?: () => void,
  className?: string
}

const Icon: React.FC<IconProps> = ({ onClick, children, className }) => (
  <i onClick={onClick} className={`${className}`} />
);

Icon.defaultProps = {
  className: '',
};

export default Icon;

import React from 'react';
import styles from './styles.module.scss';
interface HeaderProps {
  htmlFor?: string
}

const Header: React.FC<HeaderProps> = ({ children }) => (
   <header className={styles.header}> {children}</header>
);

export default Header;

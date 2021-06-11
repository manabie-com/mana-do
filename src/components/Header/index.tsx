import React from 'react';

import styles from './index.module.scss';
import DisplayText from '../DisplayText';
import Avatar from '../Avatar';

const Header = () => {
  return (
    <div className={styles.Header}>
      <DisplayText className={styles.Brand}>Todo List</DisplayText>
      <div className={styles.Spacing} />
      <DisplayText className={styles.UserInfo}>Thang Pham</DisplayText>
      <Avatar src="/images/avatar.png" />
    </div>
  );
};

export default Header;

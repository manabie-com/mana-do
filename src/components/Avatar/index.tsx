import React from 'react';

import styles from './index.module.scss';

export interface AvatarProps {
  src: string;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <div>
      <img className={styles.Avatar} src={src} alt="avatar" />
    </div>
  );
};

export default Avatar;

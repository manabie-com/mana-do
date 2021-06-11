import React, { ReactNode } from 'react';

import styles from './index.module.scss';
import classNames from 'classnames';

const SVG: Record<Name, ReactNode> = {
  delete: (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 4h3a1 1 0 0 1 1 1v1H2V5a1 1 0 0 1 1-1h3V1.5A1.5 1.5 0 0 1 7.5 0h5A1.5 1.5 0 0 1 14 1.5V4zM8 2v2h4V2H8zM3 8h14v10.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 18.5V8zm4 3H5v6h2v-6zm4 0H9v6h2v-6zm2 0h2v6h-2v-6z" />
    </svg>
  ),
  checkMark: (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.315 13.859l-3.182-3.417a.506.506 0 0 1 0-.684l.643-.683a.437.437 0 0 1 .642 0l2.22 2.393 4.942-5.327a.436.436 0 0 1 .643 0l.643.684a.504.504 0 0 1 0 .683l-5.91 6.35a.437.437 0 0 1-.642 0" />
    </svg>
  ),
};

type Color = 'default' | 'primary' | 'secondary' | 'white' | 'danger';
type Name = 'delete' | 'checkMark';

interface IconProps {
  name: Name;
  color?: Color;
}

const Icon = ({ name, color = 'default' }: IconProps) => {
  return <span className={classNames(styles.Icon, styles[color])}>{SVG[name]}</span>;
};

export default Icon;

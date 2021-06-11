import React from 'react';
import classNames from 'classnames';
import { PropsWithChildren } from 'react';

import styles from './index.module.scss';

type Size = 'small' | 'medium' | 'large' | 'extraLarge';
type HeadingTagName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p';

export interface DisplayTextProps {
  className?: string;
  element?: HeadingTagName;
  size?: Size;
  testId?: string;
}

const DisplayText = ({
  className,
  element: Element = 'p',
  children,
  size = 'medium',
  testId = 'display-text',
}: PropsWithChildren<DisplayTextProps>) => {
  return (
    <Element data-testid={testId} className={classNames(className, styles.DisplayText, styles[size])}>
      {children}
    </Element>
  );
};

export default DisplayText;

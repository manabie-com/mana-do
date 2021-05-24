import React, {useCallback} from 'react';
import Classes from './TodoCell.module.scss';

export interface ICellProps {
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  grow?: number;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onDoubleClick?: () => void;
  center?: boolean;
}

const TodoCell = (props: ICellProps) => {
  const {
    width,
    minWidth,
    maxWidth,
    grow,
    children,
    className,
    onDoubleClick,
    center,
  } = props;
  const handleDbClick = useCallback(() => {
    if (onDoubleClick) {
      onDoubleClick();
    }
  }, [onDoubleClick])
  const style: any = {};
  if (width) {
    style.width = width;
  }
  if (minWidth) {
    style.minWidth = minWidth;
  }
  if (maxWidth) {
    style.maxWidth = maxWidth;
  }
  if (grow) {
    style.flexGrow = grow;
  }
  if (center) {
    style.justifyContent = 'center';
  }
  return (
    <div onDoubleClick={handleDbClick} className={`${Classes.TodoCell} ${className}`} style={style}>
      {children}
    </div>
  );
};

export default TodoCell;

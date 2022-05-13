import { IconButton, Tooltip } from '@mui/material';
import { Fragment, memo } from 'react';

export interface ImageButtonProps {
  instruction?: string;
  IconComponent: any;
  defaultColor?: string;
  activeColor?: string;
  active?: boolean;
  onPress?: () => void;
}

export const ImageButton = memo((props: ImageButtonProps) => {
  const {
    instruction,
    IconComponent,
    defaultColor = '#707070',
    activeColor = '#707070',
    active,
    onPress = () => {},
  } = props;
  const Component = !!instruction ? Tooltip : Fragment;
  return (
    <Component title={instruction || ''}>
      <IconButton onClick={onPress}>
        <IconComponent style={{ color: active ? activeColor : defaultColor }} />
      </IconButton>
    </Component>
  );
});


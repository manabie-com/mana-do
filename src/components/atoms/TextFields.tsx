import React from 'react';

import {
  InputBase,
  InputBaseProps,
  FormControl,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  form: {
    padding: '0 20px',
    height: '43px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    '& + &': {
      marginTop: 36,
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#fff',
    border: '0',
    fontSize: 16,
  },
}));

type IProps = InputBaseProps & {
  icon?: React.ReactNode;
};

const TextFields = ({ icon, ...rest }: IProps) => {
  const classes = useStyles();

  return (
    <FormControl fullWidth className={classes.form}>
      {icon}
      <InputBase fullWidth className={classes.input} {...rest} />
    </FormControl>
  );
};

export default TextFields;
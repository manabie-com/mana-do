
import React,{useState} from 'react';
import { useHistory } from 'react-router-dom';

import {useDispatch} from 'react-redux'
import {actLoginSuccess,actLoginFail} from '../../store/authActions'

// material UI
import { Grid } from '@material-ui/core';

// material icon
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';

// atoms
import TextFields from '../../components/atoms/TextFields';
import ButtonBase from '../../components/atoms/ButtonBase';

// styles
import useStyles from './styles';

import Service from '../../service'

const Login: React.FunctionComponent = () => {
  const classes = useStyles();

  const [form, setForm] = useState({
    userId: '',
    password: ''
  });
  const history = useHistory();
  const dispatch = useDispatch()
  const signIn = async () => {
    try {
      const resp = await Service.signIn(form.userId, form.password)
      if(resp){
        localStorage.setItem('token', "true")
        dispatch(actLoginSuccess())
      }
    } catch (er) {
      dispatch(actLoginFail())
    }
  }

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setForm(prev=>({
        ...prev,
        [e.target.name]: e.target.value
    }))
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="stretch"
      alignContent="center"
      className={classes.loginContainer}
    >
      <h1>Login</h1>
      <Grid container className={classes.content}>
        <Grid container>
          <TextFields
            type="text"
            name="userId"
            placeholder="Username"
            onChange={onChangeField}
            icon={<PersonIcon />}
          />
          <TextFields
            type="password"
            name="password"
            placeholder="Password"
            onChange={onChangeField}
            icon={<LockIcon />}
          />
        </Grid>
        <Grid container>
          <ButtonBase
            fullWidth={true}
            variant="contained"
            type="button"
            text="Login"
            handleSubmit={signIn}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
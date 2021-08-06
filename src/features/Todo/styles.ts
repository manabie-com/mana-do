// material
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  loginContainer: {
    position: 'relative',
    minHeight: '100vh',
    padding: 15,
  },
  zIndexOne: {
    zIndex: 1,
  },
  textForget: {
    margin: '25px 0',
    textDecoration: 'underline',
  },
  content: {
    zIndex: 1,
    width: 292,
    margin: '20px auto 0',
  },
  spaceBoth: {
    margin: '25px 0',
  },
  fabFace: {
    backgroundColor: '#083871',
    '& svg': {
      color: '#fff',
    },
  },
  fabMail: {
    backgroundColor: '#ab2020',
    '& svg': {
      color: '#fff',
    },
    '&:hover': {
      backgroundColor: '#e83131',
    },
  },
}));

export default useStyles;
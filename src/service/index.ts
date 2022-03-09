import { IAPI } from './types';

console.log('rocess.env.REACT_APP_WHOAMI', process.env.REACT_APP_WHOAMI);
let Service: IAPI = require(`./api-${process.env.REACT_APP_WHOAMI}`)
  .default as IAPI;

export default Service;

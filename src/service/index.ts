import {IAPI} from './types';

let Service: IAPI;

if (process.env.REACT_APP_WHOAMI === 'frontend') {
  Service = require('./api-frontend.service').default as IAPI;
} else {
  Service = require('./api-fullstack.service').default as IAPI;
}

export default Service;

import { IAPI, IAPIFE } from './types';

let Service: IAPI;
let ServiceFE: IAPIFE;
if (process.env.REACT_APP_WHOAMI === 'frontend') {
  ServiceFE = require('./api-frontend').default as IAPIFE;
} else {
  Service = require('./api-fullstack').default as IAPI;
}

export { Service, ServiceFE };

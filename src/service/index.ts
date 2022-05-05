import { IAPI } from './types';

let Service: IAPI;
if (process.env.REACT_APP_WHOAMI === 'frontend') {
    Service = require('./api-frontend').default
} else {
    Service = require('./api-fullstack').default
}

export default Service
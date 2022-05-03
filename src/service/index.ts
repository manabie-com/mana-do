import { IAPI } from './types';

let Service: IAPI;
if (process.env.REACT_APP_WHOAMI === 'frontend') {
    console.log(process, 'PROCESS')
    Service = require('./api-frontend').default as IAPI
} else {
    Service = require('./api-fullstack').default as IAPI
}

export default Service
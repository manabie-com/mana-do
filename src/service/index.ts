import { IAPI } from './types';
import ApiFrontend from './api-frontend';
import ApiFullstack from './api-fullstack';

let Service: IAPI;
if (process.env.REACT_APP_WHOAMI === 'frontend') {
  Service = ApiFrontend as IAPI;
} else {
  Service = ApiFullstack as IAPI;
}

export default Service;

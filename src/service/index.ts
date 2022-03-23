import {IAPI} from './types';

let Service : IAPI;
Service = require('./api-frontend').default as IAPI

export default Service
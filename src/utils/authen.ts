import {getTokenStorage} from './storeageUtils';

export const isAuthenticated = () => Boolean(getTokenStorage());

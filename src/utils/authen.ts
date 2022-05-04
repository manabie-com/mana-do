import {getTokenStorage} from './storageUtils';

export const isAuthenticated = () => Boolean(getTokenStorage());

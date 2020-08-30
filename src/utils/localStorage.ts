export const getCachedToken = () => localStorage.getItem('token');

export const cacheToken = (value: string) => localStorage.setItem('token', value);

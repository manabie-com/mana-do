export const checkAuth = () => {
  return !!localStorage.getItem('token');
}
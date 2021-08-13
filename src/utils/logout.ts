export const logout = () => {
  localStorage.removeItem("token");
  window.location.replace("/login");
};

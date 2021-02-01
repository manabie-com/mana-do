export const checkLogin = () => {
    const user = localStorage.getItem("token");
    if (user) {
        return true;
      } else {
        return false;
      }
}
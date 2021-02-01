const Auth = {
  isAuthenticated: false,

  authenticate(cb: any) {
    console.log('Sign in');
    this.isAuthenticated = true;
  },

  signout(cb: any) {
    this.isAuthenticated = false;
  }
};

export default Auth;

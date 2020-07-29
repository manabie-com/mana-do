import {signIn, signUp} from './sdk';

/** @typedef {import("./typing").SignInRequest} SignInRequest */

/** @typedef {import("./typing").SignUpRequest} SignUpRequest */

/**
 * @param {SignInRequest} request
 *  */
async function testSignIn(request) {
  // const {email, password} = request;

  await signIn(request);
}


/**
 * @param {SignUpRequest} request
 *  */
async function testSignUp(request) {
  // const {
  //   firstName,
  //   lastName,
  //   gender,
  //   email,
  //   password
  // } = request;

  await signUp(request);
}

// The comment part in each function will show you the params you need to pass in to the corresponding function in the sdk
// Only in case you cant read my typing file
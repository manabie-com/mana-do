//THIENNGUYEN: User model


export enum LoginStatus {
    LOGGING = 'LOGGING-IN', //User is signing to the system
    LOGINFAILED = 'LOGIN-FAILED', //User failed to signing-in
    LOGGINSUCCESS = 'LOGIN-SUCCEED' //User successfully logged-in
  }
  
  export interface User {
    user_id: string
    username: string
    firstName: string
    lastName:string
    status?: LoginStatus
    created_date?: string
    password: string
  }
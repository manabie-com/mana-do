import { User } from "./user";

//THIENNGUYEN: Authentication model
  export interface Auth {
    token?: string
    currentUser?: User
  }
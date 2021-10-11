export interface Account {
  id?: string;
  username: string;
  password: string;
  gmail: string;
  repassword?: string;
  status?: number;
  name: string;
}
export interface PropsFormSignin {
  usernameSignin: string;
  passwordSignin: string;
}
export interface Signin {
  username: string;
  password: string;
  usernameSignin?: string;
  passwordSignin?: string;
}
export interface PropsForm {
  status: number;
  onFinishSignup: (data: Account) => void;
  onFinish: (data: PropsFormSignin) => void;
  form: any;
}

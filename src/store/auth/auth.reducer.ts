import { SignIn } from './types';

export const initState = {
  isLogin: false
};

const authReducer = (state = {...initState}, { type, payload }: { type: string, payload: object} ) => {
  switch(type) {
    case SignIn: {
      return { ...state, isLogin: true };
    }
    default: {
      return state;
    }
  }
}

export default authReducer;
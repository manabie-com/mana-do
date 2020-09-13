import { SignIn } from './types';

const initState = {
  isLogin: false
};

const authReducer = (state = {...initState}, { type, payload }: { type: string, payload: object} ) => {
  switch(type) {
    case SignIn: {
      console.log('CHẠY D')
      return { ...state, isLogin: true };
    }
    default: {
      return state;
    }
  }
}

export default authReducer;
import { useDispatch } from 'react-redux';
import AuthAPI from '../api-service/auth.service';
import { signInSucess } from '../store/auth/auth.action';

const useCheckToken = () => {
  const dispatch = useDispatch();
  const verifyToken = async () => {
    try {
      await AuthAPI.verifyToken();
      dispatch(signInSucess());
    } catch (error) {
      console.log(error);
    }
  }
  return { verifyToken };
};

export default useCheckToken;
import useCheckToken from './useCheckToken';

const useAppInit = () => {
  const { verifyToken } = useCheckToken();
  const initAppDidMount = () => {
    // All thing for start app. Check login, etc...
    verifyToken();
  }
  return { initAppDidMount };
};

export default useAppInit;
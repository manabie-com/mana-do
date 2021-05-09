import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';

import GlobalStyled from 'styles/GlobalStyled';
import { AppWrapper } from 'AppStyled';

import Loading from 'components/Loading';
import PrivateRoute from 'components/Router/PrivateRoute';
import PublicRoute from 'components/Router/PublicRoute';
import useLocalStorage from 'hooks/useLocalStorage';
import { setLogin, clearLogin } from 'store/modules/auth/slice';

const SignInPage = lazy(() => import('./pages/SignInPage/SignInPage'));
const ToDoPage = lazy(() => import('./pages/TodoPage/ToDoPage'));

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });
  const [token] = useLocalStorage('token', '');
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(setLogin());
    } else {
      dispatch(clearLogin());
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyled />
      <Loading />
      <AppWrapper className='App'>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Switch>
              <PublicRoute path='/' exact component={SignInPage} />
              <PrivateRoute path='/todo' component={ToDoPage} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </AppWrapper>
    </QueryClientProvider>
  );
}

export default App;

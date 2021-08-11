// test-utils.jsx
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
// Import your own reducer
import todoReducer from './redux/slices/todoSlice';
import authReducer from './redux/slices/authSlice';

function render(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: {  todo: todoReducer.reducer,  auth: authReducer.reducer }, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
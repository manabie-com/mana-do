import React from 'react'
import App from './App'
import {render} from 'enzyme'

it('renders todo app without crashing', () => {
  render(<App />);
});
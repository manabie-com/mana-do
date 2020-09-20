import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

describe("App", () => {
  it('render App', () => {
    const { container } = render(<App />);

    const div = container.querySelector("div");

    const className = div?.className;

    expect(className).toBe("App");
  });
});

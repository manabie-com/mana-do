import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import App from "../App";

describe("render header correctly", () => {
  it("should render title of header", () => {
    render(<App />);
    expect(screen.getByText(/Mana-do/)).toBeInTheDocument();
  });
});

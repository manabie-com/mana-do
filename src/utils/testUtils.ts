import { screen } from "@testing-library/react";

export function getElementByTestId(name: string): HTMLElement {
  return screen.getByTestId(name);
}

export function getAllElementByTestId(name: string): HTMLElement[] {
  return screen.getAllByTestId(name);
}

export function getElementByRole(role: string): HTMLElement {
  return screen.getByRole(role);
}

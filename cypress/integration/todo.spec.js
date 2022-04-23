/// <reference types="cypress" />

describe("Todo app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should displays todo app", () => {
    cy.get(".ToDo__container").should("be.visible");
  });

  it("should displays empty input", () => {
    cy.get(".Todo__input")
      .should("be.empty")
      .invoke("attr", "placeholder")
      .should("be.equal", "What need to be done?");
  });
});

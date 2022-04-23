/// <reference types="cypress" />

const main = '[data-cy="main"]';
const mainInput = '[data-cy="input"]';
const todoItem = '[data-cy="todo-item"]';
const count = '[data-cy="todo-count"]';
const btnCompleted = '[data-cy="completed"]';
const todoCheckbox = '[data-cy="todo-checkbox"]';
const btnDelete = '[data-cy="delete"]';
const clearAll = '[data-cy="clear-all"]';

describe("Todo app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should displays todo app", () => {
    cy.get(main).should("be.visible");
  });

  it("should displays empty input", () => {
    cy.get(mainInput)
      .should("be.empty")
      .invoke("attr", "placeholder")
      .should("be.equal", "What need to be done?");
  });

  it("should displays empty input", () => {
    cy.get(mainInput)
      .should("be.empty")
      .invoke("attr", "placeholder")
      .should("be.equal", "What need to be done?");
  });

  it("should add a new todo successfully", () => {
    cy.get(mainInput).type("Learn Cypress").type("{enter}");

    cy.get(mainInput).should("be.empty");
    cy.get(todoItem)
      .should("have.length", 1)
      .should("contain.text", "Learn Cypress");
    cy.get(count).should("contain.text", "1 item left");
  });

  it("should add a new mutil todos successfully", () => {
    cy.get(mainInput).type("Learn Cypress").type("{enter}");
    cy.get(mainInput).type("Learn Golang").type("{enter}");

    cy.get(mainInput).should("be.empty");
    cy.get(todoItem)
      .should("have.length", 2)
      .should("contain.text", "Learn Golang");
    cy.get(count).should("contain.text", "2 items left");
  });

  it("should show todo with right status", () => {
    cy.get(mainInput).type("Learn Cypress").type("{enter}");
    cy.get(mainInput).type("Learn Golang").type("{enter}");
    cy.get(todoCheckbox).first().click();
    cy.get(btnCompleted).click();

    cy.get(todoItem).should("have.length", 1);
    cy.get(count).should("contain.text", "1 item left");
  });

  it("should able delete todo", () => {
    cy.get(mainInput).type("Learn Cypress").type("{enter}");
    cy.get(mainInput).type("Learn Golang").type("{enter}");
    cy.get(todoItem).get(btnDelete).last().invoke("show").click();

    cy.get(todoItem).should("have.length", 1);
    cy.get(count).should("contain.text", "1 item left");
  });

  it("should able clear all todo", () => {
    cy.get(mainInput).type("Learn Cypress").type("{enter}");
    cy.get(mainInput).type("Learn Golang").type("{enter}");
    cy.get(clearAll).click();

    cy.get(todoItem).should("have.length", 0);
    cy.get(count).should("contain.text", "0 item left");
  });
});

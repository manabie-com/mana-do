describe("Testing TodoPage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get(".Todo__creation_input")
      .should("be.visible")
      .type("my todo list item{enter}");
    cy.get(".Todo__item").should("contain", "my todo list item");
  });

  it("User can see App", () => {
    cy.get(".App").should("be.visible");
  });

  it("User can input todo", () => {
    cy.get(".Todo__item").should("contain", "my todo list item");
  });

  it("User can complete todo item", () => {
    cy.get(".Todo__item_checkbox").should("be.visible").click();
    cy.get("#filter-active").should("be.visible").click();
    cy.get(".Todo__item").should("not.be.visible");
    cy.get("#filter-complete").should("be.visible").click();
    cy.get(".Todo__item").should("contain", "my todo list item");
  });

  it("User can uncomplete todo item", () => {
    cy.get(".Todo__item_checkbox").should("be.visible").click();
    cy.get("#filter-active").should("be.visible").click();
    cy.get(".Todo__item").should("not.be.visible");
    cy.get("#filter-complete").should("be.visible").click();
    cy.get(".Todo__item").should("contain", "my todo list item");
    cy.get(".Todo__item_checkbox").click();
    cy.get(".Todo__item").should("not.be.visible");
  });

  it("User can remove todo item", () => {
    cy.get(".Todo__item_button--delete").should("be.visible").click();
    cy.get(".Todo__item").should("not.be.visible");
  });

  it("User can remove all todo items", () => {
    cy.get(".Todo__creation_input").type("my todo list item number 2{enter}");
    cy.get(".Todo__creation_input").type("my todo list item number 3{enter}");
    cy.get(".Todo__item_input").should("have.length", 3);
    cy.get(".Todo__toolbar_button--delete").should("be.visible").click();
    cy.get(".Todo__item_input").should("have.length", 0);
    cy.get(".Todo__item").should("not.be.visible");
  });

  it("User can edit todo item content", () => {
    cy.get(".Todo__item").dblclick();
    cy.get(".Todo__item_input--modify")
      .should("be.visible")
      .type("my todo list item after editing{enter}");
    cy.get(".Todo__item").should("contain", "my todo list item after edit");
  });

  it("User can cancel editing todo item content", () => {
    cy.get(".Todo__item").dblclick();
    cy.get(".Todo__item_input--modify")
      .should("be.visible")
      .type("editing")
      .blur();
    cy.get(".Todo__item").should("contain", "my todo list item");
  });
});

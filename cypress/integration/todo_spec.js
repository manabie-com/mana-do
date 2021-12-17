describe("TODO App > ", () => {
  // Visit site
  beforeEach(() => {
    cy.visit("/");
  });

  it("user can create a todo list", () => {
    // Check if there is no todo when first loading
    cy.findByTestId("todo-list").children().should("have.length", 0);

    // Create a todo
    cy.createTODO("Check emails");
    cy.findByTestId("todo-list").children().should("have.length", 1);

    // Create 3 more todos
    cy.createTODO("Go shopping");
    cy.createTODO("Do homework");
    cy.createTODO("Meet friends");
    cy.findByTestId("todo-list").children().should("have.length", 4);

    // Check if todos are still there after reload the page
    cy.reload();
    cy.findByTestId("todo-list").children().should("have.length", 4);

    // Mark the second todo done. Check if there's a line-through when todo is done.
    cy.get(':nth-child(2) > [data-testid="todo-checkbox"]').click();
    cy.findByText("Go shopping").should("have.class", "todo-item-active");

    // Toggle todo status. Uncheck the second todo.
    cy.get(':nth-child(2) > [data-testid="todo-checkbox"]').click();
    cy.findByTestId("todo-list").children().should("have.length", 4);

    // Mark the 1st and 4th todo done.
    cy.get(':nth-child(1) > [data-testid="todo-checkbox"]').click();
    cy.get(':nth-child(4) > [data-testid="todo-checkbox"]').click();
    cy.findByText("Check emails").should("have.class", "todo-item-active");
    cy.findByText("Meet friends").should("have.class", "todo-item-active");

    // Check Active todos
    cy.findByRole("button", { name: /Active/i }).click();
    cy.findByTestId("todo-list").children().should("have.length", 2);

    // Check Completed todos
    cy.findByRole("button", { name: /Completed/i }).click();
    cy.findByTestId("todo-list").children().should("have.length", 2);

    // Toggle all todos so they are completed.
    cy.findByRole("button", { name: "All" }).click();
    cy.get('[data-testid="todo-toolbar"] > input').click();
    cy.findAllByTestId("todo-content").should("have.class", "todo-item-active");

    // Check the Completed tab
    cy.findByRole("button", { name: /Completed/i }).click();
    cy.findByTestId("todo-list").children().should("have.length", 4);

    // Toggle all todos so they are active
    cy.get('[data-testid="todo-toolbar"] > input').click();
    cy.findByTestId("todo-list").children().should("have.length", 0);

    // Check the Active tab
    cy.findByRole("button", { name: /Active/i }).click();
    cy.findByTestId("todo-list").children().should("have.length", 4);

    // Delete all todos
    cy.findByRole("button", { name: /Clear all todos/i }).click();
    cy.findByTestId("todo-list").children().should("have.length", 0);
  });
});

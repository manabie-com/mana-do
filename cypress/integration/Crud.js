/* eslint-disable no-undef */
describe('CRUD feature', () => {
    it('Create todo', () => {
        const newTodo = 'new todo';
        cy.visit('localhost:3000/todo');
        cy.findByRole('textbox').type(`${newTodo}{enter}`);

        let newElement = cy.get('.ToDo__list').findByText(newTodo);
        newElement.then((element) => {
            expect(newTodo).to.equal(element.text());
        });
    });

    it('Delete todo', () => {
        const newTodo = 'test delete';
        cy.visit('localhost:3000/todo');
        cy.findByRole('textbox').type(`${newTodo}{enter}`);

        let newElement = cy.get('.ToDo__list').findByText(newTodo);
        newElement.then((element) => {
            expect(newTodo).to.equal(element.text());
        });
        newElement.get('.Todo__delete').click();
        cy.findByText(newTodo).should('not.exist');
    });

    it('Update todo', () => {
        const newTodo = 'new todo';
        cy.visit('localhost:3000/todo');
        cy.findByRole('textbox').type(`${newTodo}{enter}`);

        // Cancle update if click outside of element
        const newElement = cy.get('.ToDo__list').findByText(newTodo);
        newElement.dblclick();
        const textAdded = 'some text';
        cy.get('input[type="text"]').type(`${textAdded}`);
        cy.get('.ToDo__container').click();

        cy.get('.ToDo__list').findByText(newTodo).should('exist');

        // Update field if press enter
        newElement.dblclick();
        cy.get('input[type="text"]').type(`${textAdded}{enter}`);
        cy.get('.ToDo__list')
            .findByText(newTodo + textAdded)
            .should('exist');
    });

    it('Delete all', () => {
        cy.visit('localhost:3000/todo');
        const newTodos = ['new A', 'new B', 'new C'];
        newTodos.forEach((todo) => {
            cy.findByRole('textbox').type(`${todo}{enter}`);
        });
        cy.findByRole('button', { name: /clear all todos/i }).click();
        cy.get('.ToDo__list').then(($text) => {
            expect($text.text()).to.equal('');
        });
    });
});

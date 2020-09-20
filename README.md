## Welcome to Manabie coding challenge

_Hello!_
_We're excited that you're interested in joining the Manabie. Below are the requirements and explanations for the challenge._

### Notes:

- Our challenge codebase is based on create-react-app with typescript.
- All provided codes are in this repository. Please fork, complete your challenge, and create a PR for us.
- We judge your codes:
  - Easy to understand.
  - Well organized.
  - Performant.
  - Test cases.

### Simple app diagram

![App diagram](diagram.png)

### Requirements

#### Common (required in both position)

- Our code base has some strange bugs adn anti-patterns, please help us find and fix these (please comment the reason why you change it).
- Write some tests to persuade us that your code is correct.

#### Front-end engineer

- For front-end side only, you can use local state instead of remote state.
- We provided you a simple UI for todo app, please enhance it with your creative mind (We prefer not using any CSS framework as we want to see your CSS skill).
- Please split the huge line of codes in App.tsx into reusable UI components.
- Please help us implement a completed todo list by:
  - Implement the persistent feature. After refreshing, our created todos will be disappeared, that's annoying for our users.
  - Implement the edit functionality. Currently, users cannot edit the created todo, please help them (user double-click the todo to edit, press enter to apply the changes, or click outside to discard)

#### Fullstack engineer

- You have to make sure your code satisfy the back-end requirements in https://github.com/manabie-com/togo.
- We do not require you to enhance the UI, but it is preferable.
- Done the common requirements above.

### How to run this code

- Run `yarn` or `npm install` if this is the first time you clone this repo.
- Run `yarn start:fullstack` in case you are doing a fullstack test, else run `yarn start:frontend` to start this project in development mode.
- Sign in using username: `firstUser`, password: `example`

### Documentation - Khuong Notes

# Components Container: Components wrapper page

- StoreProvider:

* Use React Context to store entire state for the application.
* The purpose is to store the authen variable in the store to check the security of the app.

* Router:

- Is the place to manage the entire route of the app.
  It is based on the authen variable stored in the store to handle render routes.
- Use React Suspense, React.lazy to code splitting and handle cases
  where the component runs too long will have the screen wait.

* Auth:

- This is where Authentication is handled for the app.
- If the page reloads after the token is lost due to expiration or deleted, it will be returned to the homepage.

# Components Content: Components from page level down

- Use Atomic Design Pattern to separate the components.
  Components are divided into folders from simple to complex Levels: Atoms, Molecules, Organisms, Templates, Pages.

- The templates here are used to store components that split layouts for the app.
  Pages, Organisms, Molecules and Atoms will contain the components that make up the content.

- Pages are components that will contain all of the logic. Organisms, Molecules, and Atoms that will prove the components act as view components.

# Bugs

- The first is that React Strict Mode is used to test and issue warnings about finding problems by components.
  Usually React Strict Mode will check the purity of the hooks by calling it twice. It's only called in the development environment.

- An error has occurred in the reducer. The reason for this is to have made direct changes to the state.
  That change will happen in both the previous version of the state and the next version.
  Strict mode React will call the reducer twice to check for side effects and that is causes the error.

- To handle errors just make a copy of the object state and make changes on it. This will not affect the state reference.

# Testing

- Due to inexperienced about testing. Should only write a few basic cases for small components: Button, Input, Label

## Welcome to Manabie coding challenge

_Hello!_
_We're excited that you're interested in joining Manabie. Below are the requirements and explanations for the challenge._

### Change:

- Live URL: https://mana-do.vercel.app/
- Github: https://github.com/hoanghai1212/mana-do
- Source structure:

  - Src level folder contains all code that is reusable across the whole application. For instance, I use the components/ folder only for reusable components, hooks/ folder for reusable logic,...
    - Every other component should move to a domain centred folder - here is app/ folder. For example, here we have only 1 Todo domain, but in the future we can have more and more other domain so we want to stick everything to relate to that domain in 1 place so we can easy manage them (personal opinion base on previous project).
  - App component will only handle things like provider, auth,... Things that affect global.

- State management:
  - I choose Zustand (https://github.com/pmndrs/zustand) to manage state of this project for some reason:
    - Zustand is a small, fast and scaleable bearbones state-management solution.
    - Store is a hook! We can put anything in it: primitives, objects, functions.
    - I dont need to define action, action type, bla bla... Less code less bugs 😁
    - As the store is a hook this style is new members friendly as almost React dev have to known about hook.
    - The last thing is this library new for me so I can answer your question - **How do you approach new technologies?**
  - I apply facade pattern to add a layer of abstraction between the consumer of some code and the implementation of that code. In this case is TodoStore and Todo's components, so no matter I use Zustand or Redux or ContextAPI to manage my state. I always know that I have only one place to fix it.
- Testing:
  - As source structure I choose, I put test file in the same component folder instead put on `__`test`__`/ folder. For now, it looked redundant but this way will shine when the project scale up
  - In individual component I write test case to test if component render correct or not.
  - In domain container component - Todo - I test if everything works well together
- Features:
  - Persist to-do list with localStorage. So user can keep their list after refreshing the app.
  - Create a new to-do when user input something and press Enter. This does not work if provided nothing to the input.
  - Change to-do status by clicking on the checkbox at the left of the to-do item to change status from Active to Completed and vice versa.
  - Toggle all to-do status by clicking on the check box at the bottom toolbar to change all todo status from Active to Completed and vice versa.
  - Change to-do content by double click to-do item. You can only change if that item status is Active (nobody change completed work, right?).
  - Delete to-do item by clicking on the remove icon at the right of the to-do item to remove a single item or clicking on Delete All button at the bottom toolbar to remove all items.
  - Filter to view only status user wants to view like All, Active, Completed by clicking on the button with the status label at the bottom toolbar.

### Notes:

- Our challenge codebase is bootstrapped by create-react-app with typescript.
- All provided codes are in this repository. Please **fork**, complete your challenge, and create a PR to this repository.
- We judge your codes by:
  - Easy to read and understand.
  - Well organized and consistent.
  - Test cases.
  - How do you approach new technologies?
- Don't worry if you can't complete the challenge in time. Just do your best in a mindful way.
- If you can't fully complete the challenge, please note the completed features.
- We'd like too see some descriptions about your PR.
- Typescript is a plus point. So we hope you can spend your time on this

### Requirements

#### Common (required for both positions)

- Our code base has some strange bugs and anti-patterns, please help us to find and fix these (please comments the reasons and your solutions).
- We, Manabian, believe that engineers themselves should take care of the quality of their products. Please somehow convince us that your changes are correct, we'd prefer to have a few tests for important changes that you had **ADDED** or **FIXED** (unit test or integration test)

#### Front-end engineer

- For front-end engineer, you can use localStorage instead of calling remote APIs.
- We provided a simple UI for todo app, please enhance it with your creative mind.
- Please help us to add some features to the application:
  - The persistent feature. After refreshing, our todos will be disappeared, that's annoying for our users, let's use localStorage (or API calls for fullstack engineer) to keep them.
  - The edit feature. Currently, users cannot edit the todos, please help them (user double-clicks the todo to edit, presses enter to apply the changes, or clicks outside to discard).
  - The active/complete todo feature. Allows users to click on checkbox items they have completed

#### Fullstack engineer

- You have to make sure your code satisfy the back-end requirements in https://github.com/manabie-com/togo.
- Keep the existing features in sync with backend. (create/toggle status/toggle all/delete).
- We do not require you to enhance the UI, but it is preferable (have some small changes but meaningful are great).
- Done the common requirements above.

### How to run this code

- Run `yarn` or `npm install` if this is the first time you clone this repo (`master` branch).
- Run `yarn start:fullstack` in case you are doing a fullstack test, else run `yarn start:frontend` to start this project in development mode.
- Sign in using username: `firstUser`, password: `example`

Last updated: 2022/01/13

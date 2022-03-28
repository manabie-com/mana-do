## Recent Changes

_Features Included_

1. Add ToDo
2. Edit ToDo
    - Double click ToDo to _edit_, then click outside of ToDo to save/cancel.
3. Delete ToDo
    - Click trashcan found inline to delete a single ToDo.
4. Clear All ToDo
    - Click _Clear All todos_ to delete all current ToDo.
5. Show All ToDo
    - Click _All_ to show all ToDo regardless of status.
6. Show All Active ToDo
    - Click _Active_ to show active ToDo (unchecked) only.
7. Show All Completed ToDo
    - Click _Completed_ to show completed ToDo (checked) only.
8. Persistent ToDo
    - Upon refresh ToDos are loaded from localStorage, should also retain current status.
9. Fixed issue on double adding of ToDo
10. Added Test Cases for components added

## Welcome to Manabie coding challenge

_Hello!_
_We're excited that you're interested in joining Manabie. Below are the requirements and explanations for the challenge._

### Notes:

-   Our challenge codebase is bootstrapped by create-react-app with typescript.
-   All provided codes are in this repository. Please **fork**, complete your challenge, and create a PR to this repository.
-   We judge your codes by:
    -   Easy to read and understand.
    -   Well organized and consistent.
    -   Test cases.
    -   How do you approach new technologies?
-   Don't worry if you can't complete the challenge in time. Just do your best in a mindful way.
-   If you can't fully complete the challenge, please note the completed features.
-   We'd like too see some descriptions about your PR.
-   Typescript is a plus point. So we hope you can spend your time on this

### Requirements

#### Common (required for both positions)

-   Our code base has some strange bugs and anti-patterns, please help us to find and fix these (please comments the reasons and your solutions).
-   We, Manabian, believe that engineers themselves should take care of the quality of their products. Please somehow convince us that your changes are correct, we'd prefer to have a few tests for important changes that you had **ADDED** or **FIXED** (unit test or integration test)

#### Front-end engineer

-   For front-end engineer, you can use localStorage instead of calling remote APIs.
-   We provided a simple UI for todo app, please enhance it with your creative mind.
-   Please help us to add some features to the application:
    -   The persistent feature. After refreshing, our todos will be disappeared, that's annoying for our users, let's use localStorage (or API calls for fullstack engineer) to keep them.
    -   The edit feature. Currently, users cannot edit the todos, please help them (user double-clicks the todo to edit, presses enter to apply the changes, or clicks outside to discard).
    -   The active/complete todo feature. Allows users to click on checkbox items they have completed

#### Fullstack engineer

-   You have to make sure your code satisfy the back-end requirements in https://github.com/manabie-com/togo.
-   Keep the existing features in sync with backend. (create/toggle status/toggle all/delete).
-   We do not require you to enhance the UI, but it is preferable (have some small changes but meaningful are great).
-   Done the common requirements above.

### How to run this code

-   Run `yarn` or `npm install` if this is the first time you clone this repo (`master` branch).
-   Run `yarn start:fullstack` in case you are doing a fullstack test, else run `yarn start:frontend` to start this project in development mode.
-   Sign in using username: `firstUser`, password: `example`

Last updated: 2022/01/13

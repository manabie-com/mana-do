## How to run
 - Run `yarn` or `npm install` to install all the dependancies
 - To start the program, run `yarn start:frontend`
 - To test the app, run `yarn test`
 
Note: If you ran into any problem with conflicted jest versions, add` SKIP_PREFLIGHT_CHECK=true` to your .env file.

## Problems with the code base
- No function SET_TODO in the reducer. I added this function in order to get the data from localstorage.
- Toggle all todos change all todos despite the app is only showing completed/active todos. I added a field to check the filter status and change only todos with the selected filter's status.
- Function DELETE_TODO mutating the state directly. This is not recommended so I changed to another method.
- Use index instead of todo id for key when rendering.
- Pass in index instead of todo id for update functions
- `onClick={()=>setShowing(TodoStatus.COMPLETED)}`. Should create another function and pass it in. This will improve the performance of the app as the previous function will always be recreated everytime React rerender.

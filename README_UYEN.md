#### How to run the code locally:

    Start BE: `sh start-be.sh`
    Start FE: `sh start-fe.sh`

Note: before you run backeend, make sure you have ts-node installed

To install ts-node: `sudo npm i -g ts-node`

#### Some sample curls

// get users
`curl -v http://localhost:5050/users`

// get todo
`curl -v http://localhost:5050/tasks?userId=goqy_1Vrz`

// create todo
`curl -d 'userId=goqy_1Vrz&content=do exercise' http://localhost:5050/tasks`

#### Write unit/integration tests

I have not implemented tests

#### What do you love about your solution?

I don't particularly love my solution, but I found my code easy to understand and well structured

If I have more time, I will implement "limit the number of to-dos per day per user" and unit tests

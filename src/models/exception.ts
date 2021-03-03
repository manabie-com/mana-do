export class UnauthorizedError extends Error {
    constructor() {
        super('Unauthorized')
    }
}

export class TodoExeceededError extends Error {
    constructor() {
        super('Todo Exceeded')
    }
}
import shortid from 'shortid';

const CHANCE_TO_SUCCESS = 0.8;

const randomFromTo = (from, to) => {
  return Math.floor(Math.random() * to) + from;
}

const getAPICallState = () => {
  return randomFromTo(0, 1) > CHANCE_TO_SUCCESS;
};

const isTodoValid = (todo, withId) => {
  return todo.content
};

const fakePromiseWithPossibility = (fn, delay, shouldFail) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = fn();
      if (shouldFail) {
        return reject(result);
      }
      resolve(result);
    }, delay);
  });
};

export const signIn = async (data) => {
  return fakePromiseWithPossibility(
    () => ({
      token: shortid.generate(),
      ...data,
      createdAt: Date.now(),
    }),
    randomFromTo(250, 1500),
    getAPICallState()
  )
}

export const signUp = async (data) => {
  return fakePromiseWithPossibility(
    () => data,
    randomFromTo(250, 1500),
    getAPICallState()
  )
}
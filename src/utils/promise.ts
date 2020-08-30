export const delay = (time: number) => {
  const timer = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });

  return timer;
};

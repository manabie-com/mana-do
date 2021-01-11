export default function getLogger(env = "LIVE") {
  const logBefore = (currentState, payload, type) =>
    env === "DEV" &&
    console.log(`==> Action On ${type}`, { currentState, payload });

  const logAfter = (NewState, type) =>
    env === "DEV" && console.log(`==> Action On ${type}: newState`, NewState);

  return { logBefore, logAfter };
}

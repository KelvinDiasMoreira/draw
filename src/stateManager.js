const StateManager = (function () {
  const state = {};

  function getState(key) {
    return state[key];
  }

  function setState(key, value) {
    state[key] = value;
  }

  return {
    getState,
    setState,
  };
})();

export default StateManager;

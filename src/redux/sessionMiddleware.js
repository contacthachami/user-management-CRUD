export const sessionMiddleware = (store) => (next) => (action) => {
    const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutes en millisecondes
    const state = store.getState();
    const currentTime = Date.now();
  
    if (
      state.session.isSessionActive &&
      currentTime - state.session.lastActivity > SESSION_TIMEOUT
    ) {
      store.dispatch({ type: 'session/endSession' });
    }
  
    return next(action);
  };
  
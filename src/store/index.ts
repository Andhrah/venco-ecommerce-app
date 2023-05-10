import { configureStore } from '@reduxjs/toolkit';
import { loginReducer } from '../reducers/auth/login';

/**
 * The Redux store configuration.
 */
const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

// Export the RootState and AppDispatch types for use throughout the application
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;

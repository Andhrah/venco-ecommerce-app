import { configureStore } from '@reduxjs/toolkit';
import { loginReducer } from '../reducers/auth/login';
import { profileReducer } from '../reducers/account/profile';


/**
 * The Redux store configuration.
 */
const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),

  reducer: {
    login: loginReducer,
    profile: profileReducer,
  },
});

// Export the RootState and AppDispatch types for use throughout the application
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;

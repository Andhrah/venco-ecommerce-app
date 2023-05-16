import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Login from '../../../src/components/auth/Login';
import { loginUser } from '../../../src/actions/auth/login'; // Import the login actions


const mockStore = configureStore([]);


// Mock the react-native-responsive-screen module
jest.mock('react-native-responsive-screen', () => ({
  heightPercentageToDP: jest.fn(),
  widthPercentageToDP: jest.fn(),
}));

jest.mock('@sentry/react-native', () => ({
  init: jest.fn(),
  captureException: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage');

jest.mock('react-native-remix-icon', () => ({
  __esModule: true,
  default: () => {
    return null;
  },
}));

describe('Login component', () => {
  let store: any;
  let component: any;

  beforeEach(() => {
    store = mockStore({
      login: {
        loading: false,
        data: null,
        error: null,
        firstName: '',
        lastName: '',
        email: '',
      },
    });

    component = (
      <Provider store={store}>
        <Login />
      </Provider>
    );
  });

  it('should render email and password inputs', () => {
    const { getByTestId } = render(component);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');

    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
  });

  // it('should show error message if email and password are not entered', () => {
  //   const { getByTestId, getByText } = render(component);
  //   const signInButton = getByTestId('sign-in-button');

  //   fireEvent.press(signInButton);

  //   const errorText = getByText('Please enter email and password');
  //   expect(errorText).toBeDefined();
  // });

  it('should dispatch loginUser action on successful login', async () => {
    const responseData = { token: 'token', profile: { firstName: 'John', lastName: 'Doe', email: 'john@example.com' } };
    store.dispatch = jest.fn().mockResolvedValueOnce(responseData);

    const { getByTestId } = render(component);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const signInButton = getByTestId('sign-in-button');

    fireEvent.changeText(emailInput, 'john@example.com');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(loginUser({ username: 'john@example.com', password: 'password' }));
      expect(store.getActions()).toHaveLength(3); // loginLoading, loginUser.pending, loginSuccess
    });

    // You can also assert any navigation changes or UI updates after successful login
  });

  it('should show error message on login failure', async () => {
    const error = 'Invalid credentials';
    store.dispatch = jest.fn().mockRejectedValueOnce(error);

    const { getByTestId, getByText } = render(component);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const signInButton = getByTestId('sign-in-button');

    fireEvent.changeText(emailInput, 'john@example.com');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(loginUser({ username: 'john@example.com', password: 'password' }));
      expect(store.getActions()).toHaveLength(3); // loginLoading, loginUser.pending, loginFailure
    });

    const errorText = getByText(error);
    expect(errorText).toBeDefined();
  });
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import request from '../../utils/request';

/**
 * Async action creator for logging in a user and populating the store.
 *
 * @param {Object} userData - The user data to be sent to the API.
 * @returns {Promise<Object>} A promise that resolves to the response data.
 */
export const loginUser = createAsyncThunk(
  'login/loginUser',
  /**
   * @param {Object} userData - The user data to be sent to the API.
   * @returns {Promise<Object>} A promise that resolves to the response data.
   */
  async (userData: object) => {
    try {
      const response = await request({
        route: 'auth/login',
        method: 'post',
        payload: userData,
      });

      const data = response.data;

      await AsyncStorage.setItem('token', data.token);
      const profile = await AsyncStorage.getItem('profile');
      if (!profile) {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem('profile', jsonValue);
      }

      return data;
    } catch (err: any) {
      throw err.response.data; // Rethrow the error to be caught by the rejection handler
    }
  }
);

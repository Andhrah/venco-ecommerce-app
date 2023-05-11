import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import request from '../../utils/request';

export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Unauthorize, please log in');
      }

      const response = await request({
        route: 'profile',
        method: 'get',
      });

      const data = response.data;
      return data;
    } catch (err: any) {
      throw err.response.data;
    }
  }
);

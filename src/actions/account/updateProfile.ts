import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import request from '../../utils/request';

interface ProfileData {
  name: string;
  email: string;
}

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData: ProfileData) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Unauthorize, please log in');
      }

      const response = await request({
        route: 'profile',
        method: 'put',
        payload: profileData,
      });

      const data = response.data;
      return data;
    } catch (err: any) {
      throw err.response.data;
    }
  }
);

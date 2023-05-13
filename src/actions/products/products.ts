import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import request from '../../utils/request';

/**
 * Async thunk action creator to fetch products from the backend API.
 * @returns {Promise<Product[]>} A promise that resolves to an array of products.
 * @throws {Error} If the user is unauthorized or if there is an error in the API response.
 */
export const getProducts = createAsyncThunk('products/getProducts', async (url?: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('Unauthorized, please log in');
    }

    const response = await request({
      route: url ? `products/${url}` : 'products',
      method: 'get',
    });

    const data = response.data;
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
});

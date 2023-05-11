import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';

import { checkNetworkConnectivity } from './networkConnection';
import { getProfileLocally } from './profileLocalStore';
import { updateProfile, ProfileData } from '../actions/account/updateProfile';

const PROFILE_STORAGE_KEY = 'profile';

/**
 * Syncs the profile data with the backend API when there is an internet connection.
 * If the profile data exists locally, it dispatches the action to update the profile data on the backend.
 * After a successful sync, it removes the locally stored profile data.
 *
 * @returns {Promise<void>} A Promise that resolves when the sync process is completed.
 */
export const syncProfileData = async (): Promise<void> => {
  try {
    const isConnected = await checkNetworkConnectivity();
    if (isConnected) {
      /**
       * @type {ProfileData | null} profileData - The locally stored profile data.
       */
      const profileData: ProfileData | null = await getProfileLocally();
      if (profileData !== null) {
        // Dispatch the action to update the profile data on the backend API
        await updateProfile(profileData);
        // Clear the locally stored profile data after successful sync
        await AsyncStorage.removeItem(PROFILE_STORAGE_KEY);
      }
    }
  } catch (err) {
    Sentry.captureException(err);
    throw err;
  }
};

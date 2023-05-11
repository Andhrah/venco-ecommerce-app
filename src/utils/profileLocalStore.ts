import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';

const PROFILE_STORAGE_KEY = 'profile';

export type ProfileData = {
  firstName: string;
  lastName: string;
  email: string;
}

export const saveProfileLocally = async (profileData: ProfileData): Promise<void> => {
  try {
    await AsyncStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileData));
  } catch (error) {
    console.error('Failed to save profile data locally:', error);
    throw error;
  }
};

export const getProfileLocally = async (): Promise<ProfileData | null> => {
  try {
    const profileDataString = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
    return profileDataString ? JSON.parse(profileDataString) : null;
  } catch (err) {
    Sentry.captureException(err);
    throw err;
  }
};

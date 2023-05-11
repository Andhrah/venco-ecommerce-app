import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, View, Text, StyleSheet, Platform } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { updateProfile } from '../../actions/account/updateProfile';
// import { useAppDispatch } from '../../store/hooks';

import { BackButton, Button, Input, Spinner } from '../shared';


const EditProfile = (props: any):JSX.Element => {

  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  // const dispatch = useAppDispatch();

  useEffect(() => {
    getProfileLocally();
  },[]);

  /**
   * Function for geting login user data from local storage
   */
  const getProfileLocally = async () => {
    const profileInfo = await AsyncStorage.getItem('profile');
    if (profileInfo) {
      const data = JSON.parse(profileInfo);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
    }
  };

  /**
   * This function calls the onsubmit event. It triggers validation and sends data to the API
  */
  const renderButton = () => {
    if (loading) {
      return (
        <Spinner
          color="#016aec"
          size="large"
        />
      );
    } else {
      return (
        <Button onPress={handleSaveProfile}>Save</Button>
      );
    }
  };

  const handleSaveProfile = async () => {
    const updatedProfile = { firstName, lastName, email };
    const jsonValue = JSON.stringify(updatedProfile);
    await AsyncStorage.setItem('profile', jsonValue);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      props.navigation.goBack();
    },1000);
    // dispatch(updateProfile(updatedProfile));
  };

  const { container, viewStyle, closeBtnContainer, headerText, labelText } = styles;

  return (
    <SafeAreaView style={container}>
      <StatusBar
        backgroundColor="#016aec"
        hidden={false} translucent={false}
        barStyle="light-content"
      />

      <View style={viewStyle}>
        <View style={closeBtnContainer}>
          <View />
          <Text style={headerText}>Edit Profile</Text>
          <BackButton onPress={() => props.navigation.goBack()} name="close-line" />
        </View>

        <Text style={labelText}>Firstname</Text>
        <Input
          startIconName="user-line"
          value={firstName}
          onChangeText={text => {
            setFirstName(text);
          }}
        />

        <Text style={labelText}>Lastname</Text>
        <Input
          startIconName="user-line"
          value={lastName}
          onChangeText={text => {
            setLastName(text);
          }}
        />

        {renderButton()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: '#FFFFFF',
  },
  viewStyle: {
    padding: 20,
  },
  closeBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: hp(2.8),
    color: '#172B4E',
    fontWeight: '600',
    marginBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  labelText: {
    fontSize: hp(1.5),
    color: '#172B4E',
    fontWeight: '600',
    marginBottom: Platform.OS === 'ios' ? 20 : 10,
  },
});

export default EditProfile;

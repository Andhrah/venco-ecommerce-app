import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, View, Text, StyleSheet, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-remix-icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../store/hooks';
import { getProfile } from '../../actions/account/getProfile';
import { updateProfile } from '../../actions/account/updateProfile';
import { LoginState } from '../../reducers/auth/login';
import { RootState } from '../../store';
import { Spinner } from '../shared';


const Profile = ():JSX.Element => {

  const [localProfile, setLocalProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const profile: LoginState = useSelector((state: RootState) => state.login);

  const [firstname, setFirstname] = useState(profile.firstName);
  const [lastname, setLastname] = useState(profile.lastName);
  const [mail, setMail] = useState(profile.email);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useAppDispatch();
  const profileLoading = useSelector((state: RootState) => state.profile.loading);
  const profileError = useSelector((state: RootState) => state.profile.error);

  // get profile info from backend server
  useEffect(() => {
    // dispatch(getProfile());
  },);

  useEffect(() => {
    // getProfileLocally();
    getProfileFromReduxState();
  },);

  /**
   * Function for geting login user data from local storage
   */
  const getProfileLocally = async () => {
    const profileInfo = await AsyncStorage.getItem('profile');
    if (profileInfo) {
      const data = JSON.parse(profileInfo);
      setLocalProfile(data);
    }
  };

  /**
   * Function for geting login user data from redux store
   */
  const getProfileFromReduxState = () => {
    const { firstName, lastName, email} = profile.data;
    setFirstname(firstName);
    setLastname(lastName);
    setMail(email);
  };

  const handleSaveProfile = () => {
    const updatedProfile = { name, email };
    dispatch(updateProfile(updatedProfile));
  };

  const { container, editIcon, viewStyle, displayImgContainer, nameText, profileContainer, iconContainer, contactText, infoText, infoContainer, displayImg, logoutContainer, logoutText } = styles;

  return (
    <SafeAreaView style={container}>
      <StatusBar
        backgroundColor="#016aec"
        hidden={false} translucent={false}
        barStyle="light-content"
      />

      {profileLoading ? (
        <Spinner
          color="#016aec"
          size="large"
        />
      ) : (
        <ScrollView>
          <View>
            <TouchableOpacity style={editIcon}>
              <Icon name="edit-fill" color="#016aec" size={30} />
            </TouchableOpacity>

            <View style={viewStyle}>
              <View style={displayImgContainer}>
                <Text style={displayImg}>👩🏽‍🦱</Text>
              </View>
              <Text style={nameText}>{firstname} {lastname}</Text>
            </View>

            <View style={profileContainer}>
              <View style={iconContainer}>
                <Icon name="phone-line" color="#016aec" size={20} />
                <Text style={contactText}>+2348130003935</Text>
              </View>
              <View style={iconContainer}>
                <Icon name="mail-line" color="#016aec" size={20} />
                <Text style={contactText}>{mail}</Text>
              </View>
            </View>

            {/* Profile Info */}

            <View style={profileContainer}>
              <View style={[iconContainer, infoContainer]}>
                <Icon name="heart-fill" color="#016aec" size={20} />
                <TouchableOpacity>
                  <Text style={[contactText, infoText]}>Your Favourite</Text>
                </TouchableOpacity>
              </View>

              <View style={[iconContainer, infoContainer]}>
                <Icon name="wallet-3-fill" color="#016aec" size={20} />
                <TouchableOpacity>
                  <Text style={[contactText, infoText]}>Payment</Text>
                </TouchableOpacity>
              </View>

              <View style={[iconContainer, infoContainer]}>
                <Icon name="shopping-cart-fill" color="#016aec" size={20} />
                <TouchableOpacity>
                  <Text style={[contactText, infoText]}>Orders</Text>
                </TouchableOpacity>
              </View>

              <View style={[iconContainer, infoContainer]}>
                <Icon name="group-fill" color="#016aec" size={20} />
                <TouchableOpacity>
                  <Text style={[contactText, infoText]}>Tell Your Friend</Text>
                </TouchableOpacity>
              </View>

              <View style={[iconContainer, infoContainer]}>
                <Icon name="settings-2-fill" color="#016aec" size={20} />
                <TouchableOpacity>
                  <Text style={[contactText, infoText]}>Settings</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Logout */}

            <View style={[iconContainer, infoContainer, logoutContainer]}>
              <Icon name="logout-box-line" color="#FF3F53" size={23} />
              <TouchableOpacity>
                <Text style={[contactText, logoutText]}>Log out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
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
  editIcon: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 20,
  },
  viewStyle: {
    paddingHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayImgContainer: {
    backgroundColor: '#E5ECF3',
    height: hp('10%'),
    width: Platform.OS === 'ios' ? wp('22%') : wp('20%'),
    borderRadius: 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    marginRight: 20,
  },
  displayImg: {
    fontSize: hp(6.1),
  },
  nameText: {
    color: '#172B4E',
    fontSize: hp(3.4),
    fontWeight: '700',
  },
  profileContainer: {
    padding: 30,
    borderBottomWidth: 0.5,
    borderColor: '#A3ADBA',
  },
  iconContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  contactText: {
    fontSize: hp(1.8),
    fontWeight: '600',
    color: '#A3ADBA',
    marginLeft: 20,
  },
  infoText: {
    color: '#172B4E',
  },
  infoContainer: {
    marginBottom: Platform.OS === 'ios' ? 40 : 30,
  },
  signupText: {
    textAlign: 'center',
    fontSize: hp(1.8),
    fontWeight: '700',
    color: '#7D899C',
    marginTop: 30,
  },
  logoutText: {
    color: '#FF3F53',
    fontSize: hp(2.2),
  },
  logoutContainer: {
    padding: 30,
  },
});

export default Profile;

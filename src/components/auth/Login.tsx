import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, View, Text, Image, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import * as Sentry from '@sentry/react-native';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { loginLoading, loginFailure } from '../../reducers/auth/login';
import { loginUser } from '../../actions/auth/login';
import { RootState } from '../../store';
import { useAppDispatch } from '../../store/hooks';

import { Button, IconButton, Input, Spinner } from '../shared';

/**
 * Login Component.
 *
 * @component
 *
 * @param {LoginProps} props - Navigation object for handling navigation actions.
 *
 * @returns {JSX.Element} Login component.
 */
const Login = (props: any):JSX.Element => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const dispatch = useAppDispatch();
  const loading = useSelector((state: RootState) => state.login.loading);
  const error = useSelector((state: RootState) => state.login.error);

  useEffect(() => {}, [error]);

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
        <Button onPress={handleLogin}>Sign in</Button>
      );
    }
  };

  /**
   * Function to handle user login.
   */
  const handleLogin = async () => {
    dispatch(loginLoading(true));
    try {
      if (!password && !email) {
        dispatch(loginFailure('Please enter email and password'));
        return;
      }
      const userData = {
        username: email,
        password,
      };

      const responseData = await dispatch(loginUser(userData));

      if (loginUser.fulfilled.match(responseData)) {
        const jsonValue = JSON.stringify(responseData.payload);
        await AsyncStorage.setItem('profile', jsonValue);

        props.navigation.navigate('Tab');
      }
    } catch (err) {
      dispatch(loginFailure(err));
      Sentry.captureException(err);
    } finally {
      dispatch(loginLoading(false));
    }
  };

  const { container, viewStyle, displayImg, loginText, forgotPassText, orText, socialIconContainer, signupText, signupTextSpan, errorText } = styles;

  return (
    <SafeAreaView style={container}>
      <StatusBar
        backgroundColor="#016aec"
        hidden={false} translucent={false}
        barStyle="light-content"
      />

      <Image
        source={require('../../../assets/images/login_img.png')}
        style={displayImg}
      />

      <View style={viewStyle}>
        <Text style={loginText}>Login</Text>

        {error && <Text style={errorText}>{error}</Text>}

        <Input
          startIconName="at-line"
          placeholder="Email ID"
          onChangeText={text => {
            setEmail(text);
            dispatch(loginFailure(null));
          }}
        />
        <Input
          startIconName="lock-line"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => {
            setPassword(text);
            dispatch(loginFailure(null));
          }}
        >
          <Text style={forgotPassText}>Forgot Password?</Text>
        </Input>

        {renderButton()}

        <Text style={orText}>Or, login with...</Text>

        <View style={socialIconContainer}>
          <IconButton imgSrc={require('../../../assets/images/google_icon.png')} />
          <IconButton imgSrc={require('../../../assets/images/fb_icon.png')} />
          <IconButton imgSrc={require('../../../assets/images/apple_icon.png')} />
        </View>

        <TouchableOpacity>
          <Text style={signupText}>New to Venco? <Text style={signupTextSpan}>Sign up</Text></Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    marginTop: -20,
  },
  displayImg: {
    height: hp('35%'),
    width: wp('100%'),
    resizeMode: 'contain',
  },
  loginText: {
    color: '#172B4E',
    fontSize: hp(5.0),
    fontWeight: '700',
    marginBottom: Platform.OS === 'ios' ? 40 : 27,
  },
  forgotPassText: {
    fontSize: hp(1.8),
    fontWeight: '700',
    color: '#016aec',
  },
  orText: {
    marginTop: 30,
    fontSize: hp(1.8),
    color: '#A3ADBA',
    textAlign: 'center',
  },
  socialIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  signupText: {
    textAlign: 'center',
    fontSize: hp(1.8),
    fontWeight: '700',
    color: '#7D899C',
    marginTop: 30,
  },
  signupTextSpan: {
    color: '#016aec',
  },
  errorText: {
    textAlign:
    'center',
    color: '#FF276A',
    marginBottom: Platform.OS === 'ios' ? 20 : 5,
  },
});

export default Login;


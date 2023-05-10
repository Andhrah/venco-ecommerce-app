import React from 'react';
import { SafeAreaView, StatusBar, View, Text, Image, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import * as Sentry from '@sentry/react-native';

import { Button, IconButton, Input } from '../shared';

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

  /**
   * Function to handle user login.
   */
  const handleLogin = () => {
    try {
      props.navigation.navigate('Tab');
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  const { container, viewStyle, displayImg, loginText, forgotPassText, orText, socialIconContainer, signupText, signupTextSpan } = styles;

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

        <Input
          startIconName="at-line"
          placeholder="Email ID"
        />
        <Input
          startIconName="lock-line"
          placeholder="Password"
        >
          <Text style={forgotPassText}>Forgot Password?</Text>
        </Input>

        <Button onPress={handleLogin}>Sign in</Button>

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
    marginBottom: Platform.OS === 'ios' ? 45 : 30,
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
});

export default Login;


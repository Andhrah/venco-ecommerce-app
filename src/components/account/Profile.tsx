import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Profile = ():JSX.Element => {
  const { container, text } = styles;
  return (
    <View style={container}>
      <Text style={text}>Coming Soon...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: hp(4.4),
    fontWeight: '700',
    color: '#172B4E',
  },
});

export default Profile;

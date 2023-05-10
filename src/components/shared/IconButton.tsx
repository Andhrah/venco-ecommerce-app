import React from 'react';
import { StyleSheet, TouchableOpacity, Image, ImageProps } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

/**
 * Props for the IconButton component.
 *
 * @typedef {Object} IconButtonProps
 *
 * @property {ImageProps['source']} imgSrc - The image source for the IconButton.
 */
type IconButtonProps = {
  imgSrc: ImageProps['source'];
};

/**
 * IconButton Component
 * @component
 *
 * @param {Object} props - The component props.
 * @param {ImageProps['source']} props.imgSrc - The image source for the IconButton.
 *
 * @returns {JSX.Element} IconButton component.
 */
const IconButton = ({ imgSrc }: IconButtonProps): JSX.Element => {
  // Style definitions
  const { container, img } = styles;

  return (
    <TouchableOpacity style={container}>
      <Image source={imgSrc} style={img} />
    </TouchableOpacity>
  );
};

/**
 * Styles for IconButton component.
 */
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#E7E8EC',
    height: hp('6.5%'),
    width: wp('23%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: hp('4%'),
    width: wp('8%'),
    resizeMode: 'cover',
  },
});

export { IconButton };

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageProps, GestureResponderEvent } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-remix-icon';

import { Button } from './Button';
import truncateStr from '../../utils/truncateStr';

/**
 * CardProps - Props for the Card component.
 *
 * @typedef {Object} CardProps
 * @property {ImageProps['source']} imgSrc - The image source for the card.
 * @property {string} [title] - The title of the card.
 * @property {string} [price] - The price of the card.
 * @property {() => void} [onPress] - The function that will be called when the button is pressed.

 */
type CardProps = {
  imgSrc: ImageProps['source'];
  title?: string
  price?: string
  description?: string
  onPress?: (event: GestureResponderEvent) => void;
  onPressAddToCart?: (event: GestureResponderEvent) => void;
}

/**
 * Card Component
 * @component
 *
 * @param {CardProps} props - The component props.
 *
 * @returns {JSX.Element} Card component.
 */
const Card = ({imgSrc, title, price, description, onPress, onPressAddToCart}:CardProps): JSX.Element => {
  const { container, iconStyle, img, textStyle, btn, btnText, priceText } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={container}>
      <TouchableOpacity>
        <Icon name="heart-3-line" color="#A3ADBA" style={iconStyle} />
      </TouchableOpacity>
     <Image source={imgSrc} style={img} />
      <Text style={textStyle}>{title}</Text>
      <Text style={[textStyle, priceText]}>₦{price}</Text>
      <Text style={textStyle}>{truncateStr(description!)}...</Text>

      <View>
        <Button
          style={btn}
          color="#FFFFFF"
          endIconName="shopping-cart-fill"
          btnTextStyle={btnText}
          onPress={onPressAddToCart}
          iconSize={16}
        >
          Add
        </Button>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 0.1,
    backgroundColor: '#FFFFFF',
    width: wp('44%'),
    borderRadius: 20,
    paddingVertical: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    marginRight: 15,
  },
  iconStyle: {
    alignSelf: 'flex-end',
  },
  img: {
    height: hp('10%'),
    width: wp('30%'),
    resizeMode: 'contain',
  },
  textStyle: {
    fontSize: hp('1.7'),
    color: '#373C5B',
    marginBottom: 10,
    textAlign: 'center',
  },
  priceText: {
    color: '#016aec',
    fontWeight: '700',
  },
  btn: {
    backgroundColor: '#016aec',
    width: wp('20%'),
    height: 30,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    fontSize: hp(1.5),
    marginRight: 4,
  },
});

export { Card };

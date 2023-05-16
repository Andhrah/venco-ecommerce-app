import React from 'react';
import { TextStyle, TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ViewStyle, StyleProp, Platform } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-remix-icon';

/**
 * @description The properties for the `Button` component.
 *
 * @typedef {object} ButtonProps
 * @property {() => void} [onPress] - The function that will be called when the button is pressed.
 * @property {React.ReactNode} [children] - The children to render inside the button.
 * @property {StyleProp<ViewStyle>} [style] - Style object to pass to the button.
 * @property {StyleProp<ViewStyle>} [btnTextStyle] - Style object to pass to the text inside the button.
 */
type ButtonProps = {
  onPress?: (event: GestureResponderEvent) => void;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  btnTextStyle?: StyleProp<TextStyle>;
  color?: string;
  startIconName?: string;
  endIconName?: string;
  iconSize?: number;
  testID?: string;
};

/**
 * @description A button component.
 *
 * @param {BackButtonProps} props - Properties for the component.
 * @returns {JSX.Element} - A touchable opacity component with an image or Icon inside.
 */
const Button = ({ children, onPress, style, btnTextStyle, color,  startIconName, endIconName, iconSize, testID }: ButtonProps): JSX.Element => {
  const { buttonStyle, textstyle } = styles;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[buttonStyle, style]}
      testID={testID}
      >
     {startIconName && <Icon name={startIconName} color={color} size={iconSize} />}
      <Text style={[textstyle, btnTextStyle]}>{children}</Text>
      {endIconName && <Icon name={endIconName} color={color} size={iconSize} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 15,
    width: wp('80%'),
    height: Platform.OS === 'ios' ? 60 : 55,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
    backgroundColor: '#016aec',
    alignSelf: 'center',
  },
  textstyle: {
    fontSize: hp('2.5%'),
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  buttonViewStyle: {
    paddingVertical: 10,
  },
});

export { Button };

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

/**
 * @description The properties for the `Button` component.
 *
 * @typedef {object} ButtonProps
 * @property {() => void} [onPress] - The function that will be called when the button is pressed.
 * @property {React.ReactNode} [children] - The children to render inside the button.
 * @property {StyleProp<ViewStyle>} [style] - Style object to pass to the button.
 * @property {object} [textStyle] - Style object to pass to the text inside the button.
 */
type CategoryBtnProps = {
  onPress?: (event: GestureResponderEvent) => void;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: object;
};

/**
 * @description A component to render a category button.
 *
 * @param {CategoryBtnProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered component.
 */
const CategoryBtn = ({ children, onPress, style}: CategoryBtnProps): JSX.Element => {
  const { buttonStyle, textstyle } = styles;
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[buttonStyle, style]}
        >
        <Text style={[textstyle, style]}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 45,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
  },
  textstyle: {
    fontSize: hp('1.8%'),
    fontWeight: '500',
    color: '#172B4E',
  },
  buttonViewStyle: {
    paddingVertical: 10,
  },
});

export { CategoryBtn };

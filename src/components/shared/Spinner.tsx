import React from 'react';
import { ActivityIndicator, ViewStyle, StyleProp, } from 'react-native';

/**
 * Props for the Spinner component.
 *
 * @typedef {Object} SpinnerProps
 * @property {'small' | 'large' | number} [size] - The size of the spinner. Can be 'small', 'large', or a custom number.
 * @property {string} [color] - The color of the spinner.
 * @property {StyleProp<ViewStyle>} [style] - Additional style for the spinner container.
 */
type SpinnerProps = {
  size?: 'small' | 'large' | number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Spinner Component.
 *
 * @param {SpinnerProps} props - The component props.
 * @returns {JSX.Element} Spinner component.
 */
const Spinner = ({ size, color, style }:SpinnerProps):JSX.Element => {

  return (
      <ActivityIndicator
        size={size || 'large'}
        color={color}
        style={style}
      />
  );
};


export { Spinner };

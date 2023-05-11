import React from 'react';
import { TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-remix-icon';

/**
 * @description The properties for the `BackButton` component.
 *
 * @typedef {object} BackButtonProps
 * @property {function} onPress - The function to be executed when the back button is pressed.
 * @property {React.ReactNode} [children] - The child elements of the component.
 * @property {string} [name] - The Icon commponent name.
 * @property {color} [color] - The color of the Icon component.
 */
type BackButtonProps = {
  onPress: () => void;
  children?: React.ReactNode; // make the component able to receive children elements
  color?: string;
  name: string;
}

/**
 * @description A back button component to navigate to the previous screen.
 *
 * @param {BackButtonProps} props - Properties for the component.
 * @returns {JSX.Element} - A touchable opacity component with an image inside.
 */
const BackButton = ({onPress, name, color}: BackButtonProps): JSX.Element => {
  const {container} = styles;
  return (
    <TouchableOpacity
      testID="back-button"
      onPress={onPress}
      accessible={true}
      style={[container]}
      // hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >

      <Icon name={name} color={color || '#016aec'} size={40} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginLeft: 30,
  },
  image: {
    height: 35,
    width: 35,
  },
});

export { BackButton };

import React from 'react';
import { StyleSheet, View, TextInput, StyleProp, ViewStyle, NativeSyntheticEvent, TextInputSubmitEditingEventData, Platform } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-remix-icon';

/**
 * InputProps - Props for the Input component.
 *
 * @typedef {Object} InputProps
 * @property {StyleProp<ViewStyle>} [viewStyle] - The additional style for the outer view container.
 * @property {StyleProp<ViewStyle>} [style] - The additional style for the TextInput.
 * @property {string} [placeholder] - The placeholder text for the TextInput.
 * @property {React.ReactNode} [children] - Additional children to render within the Input component.
 * @property {(event: FocusEvent) => void} [onFocus] - Event handler for when the TextInput receives focus.
 * @property {(event: FocusEvent) => void} [onBlur] - Event handler for when the TextInput loses focus.
 * @property {(event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void} [onSubmitEditing] - Event handler for when the TextInput's submit action is triggered.
 * @property {string} [value] - The value of the TextInput.
 * @property {(text: string) => void} [onChangeText] - Event handler for when the TextInput's text changes.
 * @property {*} [ref] - Reference to the TextInput component.
 * @property {string} [focusedInput] - The identifier for the currently focused input.
 * @property {'default' | 'numeric' | 'email-address' | 'phone-pad' | 'number-pad' | 'decimal-pad' | 'url' | 'web-search'} [keyboardType] - The keyboard type to display.
 * @property {string} [placeholderTextColor] - The color of the placeholder text.
 * @property {string} [defaultValue] - The default value of the TextInput.
 * @property {boolean} [secureTextEntry] - Determines whether the TextInput should hide the text entered.
 * @property {number} [maxLength] - The maximum number of characters allowed in the TextInput.
 * @property {number} [numberOfLines] - The maximum number of lines for multiline TextInput.
 * @property {string} [startIconName] - The name of the start icon to display.
 * @property {string} [endIconName] - The name of the end icon to display.
 */
type InputProps = {
  viewStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
  children?:  React.ReactNode;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onSubmitEditing?: (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  value?: string;
  onChangeText?: (text: string) => void;
  ref?: any;
  focusedInput?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad' | 'number-pad' | 'decimal-pad' | 'url' | 'web-search';
  placeholderTextColor?: string;
  defaultValue?: string;
  secureTextEntry?: boolean;
  maxLength?: number;
  numberOfLines?: number;
  startIconName?: string;
  endIconName?: string;
}

/**
 * Input Component
 * @component
 *
 * @param {InputProps} props - The component props.
 *
 * @returns {JSX.Element} Input component.
 */
const Input = ({
  viewStyle,
  style,
  placeholder,
  children,
  onFocus,
  onBlur,
  onSubmitEditing,
  value,
  onChangeText,
  ref,
  keyboardType,
  placeholderTextColor,
  defaultValue,
  secureTextEntry,
  maxLength,
  numberOfLines,
  startIconName,
  endIconName,
}:InputProps):JSX.Element => {
  const { containerStyle, inputStyle } = styles;

  return (
    <View style={[containerStyle, viewStyle]}>
      {startIconName && <Icon name={startIconName} color="#7D899C" />}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || '#A3ADBA'}
        onFocus={onFocus}
        style={[inputStyle, style]}
        onBlur={onBlur}
        defaultValue={defaultValue}
        onSubmitEditing={onSubmitEditing}
        value={value}
        onChangeText={onChangeText}
        ref={ref}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        numberOfLines={numberOfLines}
      />
      {children}
      {endIconName && <Icon name={endIconName} />}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    borderRadius: 5,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#E8EAED',
    marginBottom: Platform.OS === 'ios' ? 45 : 30,
    paddingBottom: Platform.OS === 'ios' ? 10 : 1,
    alignItems: 'center',
  },
  inputStyle: {
    letterSpacing: hp(0.1),
    width: '60%',
    color: '#2033A0',
    paddingLeft: 20,
    fontSize: hp(2.0),
  },
});

export { Input };

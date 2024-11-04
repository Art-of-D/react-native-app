import { TextInput, TextInputProps, StyleProp, TextStyle } from "react-native";
import { useState } from "react";

interface InputProps extends TextInputProps {
  placeholder?: string;
  textContentOption?: TextInputProps["textContentType"];
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  stylesInput?: StyleProp<TextStyle>;
  stylesFocusedInput?: StyleProp<TextStyle>;
}

export default function Input({
  placeholder,
  textContentOption,
  value,
  onChangeText,
  secureTextEntry,
  stylesInput,
  stylesFocusedInput,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      placeholder={placeholder}
      textContentType={textContentOption}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={[stylesInput, isFocused && stylesFocusedInput]}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
}

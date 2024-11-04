import { useState } from "react";
import {
  View,
  TextInput,
  Image,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
  TextInputIOSProps,
} from "react-native";

interface IconInputProps {
  iconSource: ImageSourcePropType;
  placeholder?: string;
  textContentOption?: TextInputIOSProps["textContentType"];
  value?: string;
  onChangeText?: (text: string) => void;
  stylesWrapper?: StyleProp<ViewStyle>;
  stylesIcon?: StyleProp<ImageStyle>;
  stylesInput?: StyleProp<TextStyle>;
  stylesFocusedInput?: StyleProp<ViewStyle | TextStyle>;
}

export default function IconInput({
  iconSource,
  placeholder,
  textContentOption,
  value,
  onChangeText,
  stylesWrapper,
  stylesIcon,
  stylesInput,
  stylesFocusedInput,
}: IconInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[stylesWrapper, isFocused && stylesFocusedInput]}>
      <Image source={iconSource} style={stylesIcon} />
      <TextInput
        placeholder={placeholder}
        textContentType={textContentOption}
        value={value}
        onChangeText={onChangeText}
        style={[stylesInput, isFocused && stylesFocusedInput]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
}

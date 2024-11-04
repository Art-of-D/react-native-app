import {
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

interface ButtonProps {
  text: string;
  onPress: () => void;
  stylesButton?: StyleProp<ViewStyle>;
  stylesText?: StyleProp<TextStyle>;
}

export default function Button({
  text,
  onPress,
  stylesButton,
  stylesText,
}: ButtonProps) {
  return (
    <TouchableOpacity style={stylesButton} onPress={onPress}>
      <Text style={stylesText}>{text}</Text>
    </TouchableOpacity>
  );
}

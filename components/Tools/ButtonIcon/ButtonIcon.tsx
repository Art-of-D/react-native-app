import {
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from "react-native";

interface ButtonIconProps {
  icon: ImageSourcePropType;
  onPress: () => void;
  stylesButton?: StyleProp<ViewStyle>;
  stylesIcon?: StyleProp<ImageStyle>;
}

export default function ButtonIcon({
  icon,
  onPress,
  stylesButton,
  stylesIcon,
}: ButtonIconProps) {
  return (
    <TouchableOpacity style={stylesButton} onPress={onPress}>
      <Image source={icon} style={stylesIcon} />
    </TouchableOpacity>
  );
}

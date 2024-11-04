import {
  Pressable,
  Image,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from "react-native";

interface PressableIconProps {
  onPress: () => void;
  icon: ImageSourcePropType;
  buttonStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ImageStyle>;
}

export default function PressableIcon({
  onPress,
  icon,
  buttonStyle,
  iconStyle,
}: PressableIconProps) {
  return (
    <Pressable onPress={onPress} style={buttonStyle}>
      <Image source={icon} style={iconStyle} />
    </Pressable>
  );
}

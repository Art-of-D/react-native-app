import { useNavigation } from "@react-navigation/native";
import {
  Pressable,
  Image,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from "react-native";
import images from "../../../utils/images";
import styles from "./stylesPressableIcon";

interface PressableIconProps {
  onPress?: () => void;
  icon?: ImageSourcePropType;
  buttonStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ImageStyle>;
}

export default function PressableIcon({
  onPress,
  icon = images.VECTOR,
  buttonStyle,
  iconStyle,
}: PressableIconProps) {
  const navigator = useNavigation();
  const handleComeBack = () => {
    navigator.goBack();
  };

  return (
    <Pressable
      onPress={onPress || handleComeBack}
      style={buttonStyle ? buttonStyle : styles.button}
    >
      <Image source={icon} style={iconStyle ? iconStyle : styles.icon} />
    </Pressable>
  );
}

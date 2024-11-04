import {
  View,
  Image,
  Text,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";

interface IconTextProps {
  iconSource: ImageSourcePropType;
  text: number | string;
  stylesWrapper?: StyleProp<ViewStyle>;
  stylesIcon?: StyleProp<ImageStyle>;
  stylesText?: StyleProp<TextStyle>;
}

export default function IconText({
  iconSource,
  text,
  stylesWrapper,
  stylesIcon,
  stylesText,
}: IconTextProps) {
  return (
    <View style={stylesWrapper}>
      <Image source={iconSource} style={stylesIcon} />
      <Text style={stylesText}>{text}</Text>
    </View>
  );
}

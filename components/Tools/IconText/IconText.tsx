import { View, Image, Text } from "react-native";

export default function IconText(props: any) {
  return (
    <View style={props.classNameWrapper}>
      <Image source={props.iconSource} style={props.classNameIcon} />
      <Text style={props.classNameText}>{props.text}</Text>
    </View>
  );
}

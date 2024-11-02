import { TouchableOpacity, Text } from "react-native";

export default function Button(props: any) {
  return (
    <TouchableOpacity style={props.classNameButton} onPress={props.onPress}>
      <Text style={props.classNameText}>{props.text}</Text>
    </TouchableOpacity>
  );
}

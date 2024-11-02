import { TextInput } from "react-native";
import { useState } from "react";

export default function Input(props: any) {
  const [focusedInput, setFocusedInput] = useState("");

  return (
    <TextInput
      placeholder={props.placeholder}
      textContentType={props.textContentType}
      value={props.value}
      onChangeText={props.onChangeText}
      secureTextEntry={props.secureTextEntry}
      style={[
        props.classNameInput,
        focusedInput === props.name && props.classNameFocusedInput,
      ]}
      onFocus={() => setFocusedInput(props.name)}
      onBlur={() => setFocusedInput("")}
    />
  );
}

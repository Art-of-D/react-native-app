import { useState } from "react";
import { View, Image, Pressable, Text, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function PickedImage(props: any) {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    props.image
  );
  const deleteImageFunc = props.deleteImageFunc && true;
  const pickImage = async () => {
    if (selectedImage && deleteImageFunc) {
      setSelectedImage(undefined);
      props.handleSelectedImage(undefined);
      return;
    }

    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Denied",
        "You need to enable permission to access photos."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      props.handleSelectedImage(uri);
    }
  };

  return (
    <View style={props.stylesImageWrapper}>
      <Image
        key={selectedImage ? selectedImage : "default"}
        source={{ uri: selectedImage }}
        style={props.stylesImage}
      />
      <Pressable style={props.stylesButton} onPress={pickImage}>
        <Image style={props.stylesButtonIcon} source={props.buttonIcon} />
      </Pressable>
    </View>
  );
}

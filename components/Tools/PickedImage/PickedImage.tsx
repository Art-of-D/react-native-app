import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Pressable,
  Alert,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

interface PickedImageProps {
  image: string;
  handleSelectedImage: (uri: string) => void;
  deleteImageFunc: boolean;
  stylesImageWrapper: StyleProp<ViewStyle>;
  stylesImage: StyleProp<ImageStyle>;
  stylesButton: StyleProp<ViewStyle>;
  stylesButtonIcon: StyleProp<ImageStyle>;
  buttonIcon: any;
}

export default function PickedImage({
  image,
  deleteImageFunc = true,
  handleSelectedImage,
  stylesImageWrapper,
  stylesImage,
  stylesButton,
  stylesButtonIcon,
  buttonIcon,
}: PickedImageProps) {
  const [selectedImage, setSelectedImage] = useState<string>(image);

  useEffect(() => {
    setSelectedImage(image);
  }, [image]);

  const pickImage = async (): Promise<void> => {
    if (selectedImage && deleteImageFunc) {
      setSelectedImage("");
      handleSelectedImage("");
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
      handleSelectedImage(uri);
    }
  };

  return (
    <View style={stylesImageWrapper}>
      {selectedImage && (
        <Image
          key={selectedImage ? selectedImage : "default"}
          source={{ uri: selectedImage }}
          style={stylesImage}
        />
      )}
      <Pressable style={stylesButton} onPress={pickImage}>
        <Image style={stylesButtonIcon} source={buttonIcon} />
      </Pressable>
    </View>
  );
}

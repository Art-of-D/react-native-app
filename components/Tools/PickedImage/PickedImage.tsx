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
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Screens } from "../../../utils/enums/routes";

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
  const navigator = useNavigation();

  const handleImage = () => {
    if (selectedImage && deleteImageFunc) {
      deleteImage();
      return;
    }
    showImageOptions();
  };
  const deleteImage = () => {
    if (selectedImage && deleteImageFunc) {
      setSelectedImage("");
      handleSelectedImage("");
    }
  };
  const showImageOptions = () => {
    Alert.alert(
      "Select Image",
      "Choose an option to upload an image",
      [
        {
          text: "Use Camera",
          onPress: () => (navigator as any).navigate(Screens.Camera),
        },
        {
          text: "Choose from Gallery",
          onPress: pickImage,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    setSelectedImage(image);
  }, [image]);

  const setImage = (uri: string) => {
    setSelectedImage(uri);
    handleSelectedImage(uri);
  };

  const pickImage = async (): Promise<void> => {
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
      setImage(result.assets[0].uri);
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
      <Pressable style={stylesButton} onPress={handleImage}>
        <Image style={stylesButtonIcon} source={buttonIcon} />
      </Pressable>
    </View>
  );
}

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
import { Screens } from "../../../utils/enums/routes";
import { pickImage } from "../../../utils/imagePicker";

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

  const deleteImage = () => {
    if (selectedImage && deleteImageFunc) {
      setSelectedImage("");
      handleSelectedImage("");
    }
  };

  const setImage = (uri: string) => {
    setSelectedImage(uri);
    handleSelectedImage(uri);
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
          onPress: pickImageAsync,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const pickImageAsync = async () => {
    const image = await pickImage();
    if (image) {
      setImage(image);
    }
  };

  useEffect(() => {
    setSelectedImage(image);
  }, [image]);

  const handleImage = () => {
    if (selectedImage && deleteImageFunc) {
      deleteImage();
      return;
    }
    showImageOptions();
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

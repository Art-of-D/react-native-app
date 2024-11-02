import { useEffect, useState } from "react";
import { Text, View, ScrollView, ImageBackground } from "react-native";
import { useRoute } from "@react-navigation/native";
import PickedImage from "../../Tools/PickedImage/PickedImage";
import constants from "../../../utils/images";
import styles from "./stylesProfileScreen";
export default function ProfileScreen() {
  const {
    params: { cookies, user },
  } = useRoute();
  const [selectedImageValue, setSelectedImageValue] = useState<
    string | undefined
  >(user.image);

  useEffect(() => {
    if (!selectedImageValue) {
      cookies.set(user.email, { ...user, image: "" });
    } else {
      cookies.set(user.email, { ...user, image: selectedImageValue });
    }
  }, [selectedImageValue]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={constants.IMG}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.regWrapper}>
          <PickedImage
            stylesImageWrapper={styles.avatarWrapper}
            stylesImage={styles.downloadedImage}
            stylesButton={
              selectedImageValue ? styles.deleteButton : styles.addButton
            }
            stylesButtonIcon={
              selectedImageValue ? styles.deleteIcon : styles.addIcon
            }
            buttonIcon={constants.PLUS}
            handleSelectedImage={setSelectedImageValue}
          ></PickedImage>
          <Text style={styles.header2}>{user.name}</Text>
          <ScrollView style={styles.scrollView}></ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

{
  /* <View style={styles.avatarWrapper}>
            <Image
              key={selectedImage ? selectedImage : "default"}
              source={{ uri: selectedImage }}
              style={styles.downloadedImage}
            />
            <Pressable
              style={selectedImage ? styles.deleteButton : styles.addButton}
              onPress={pickImageHandler}
            >
              <Text style={selectedImage ? styles.deleteIcon : styles.addIcon}>
                &#43;
              </Text>
            </Pressable>
          </View> */
}

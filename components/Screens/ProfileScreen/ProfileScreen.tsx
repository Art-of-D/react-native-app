import { useEffect, useState } from "react";
import { Text, View, ScrollView, ImageBackground } from "react-native";
import { useRoute } from "@react-navigation/native";
import PickedImage from "../../Tools/PickedImage/PickedImage";
import constants from "../../../utils/images";
import styles from "./stylesProfileScreen";
export default function ProfileScreen() {
  const { params } = useRoute();
  const { user, posts, dataHandler } = params;
  const [selectedImage, setSelectedImageValue] = useState<string | undefined>(
    user.image
  );

  useEffect(() => {
    const userData = user;
    if (!selectedImage) {
      userData.image = "";
      dataHandler("users", { [user.email]: userData });
    } else {
      userData.image = selectedImage;
      dataHandler("users", { [user.email]: userData });
    }
  }, [selectedImage]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={constants.IMG}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.userWrapper}>
          <PickedImage
            stylesImageWrapper={styles.avatarWrapper}
            stylesImage={styles.downloadedImage}
            stylesButton={
              selectedImage ? styles.deleteButton : styles.addButton
            }
            stylesButtonIcon={
              selectedImage ? styles.deleteIcon : styles.addIcon
            }
            buttonIcon={constants.PLUS}
            image={selectedImage}
            deleteImageFunc={true}
            handleSelectedImage={setSelectedImageValue}
          ></PickedImage>
          <Text style={styles.header2}>{user.name}</Text>
          <ScrollView style={styles.scrollView}></ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

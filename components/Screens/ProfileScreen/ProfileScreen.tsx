import { useContext, useEffect, useState } from "react";
import { Text, View, ScrollView, ImageBackground } from "react-native";
import { useRoute } from "@react-navigation/native";
import PickedImage from "../../Tools/PickedImage/PickedImage";
import constants from "../../../utils/images";
import { PostsContext } from "../../../App";
import Post from "../../Tools/Post/Post";
import PressableIcon from "../../Tools/PressableIcon/PressableIcon";
import images from "../../../utils/images";
import { Screens } from "../../../utils/enums/routes";
import { useNavigation } from "@react-navigation/native";
import styles from "./stylesProfileScreen";
export default function ProfileScreen() {
  const navigator = useNavigation();
  const { params } = useRoute();
  const posts = useContext(PostsContext);
  const { user, dataHandler } = params as any;
  const [selectedImage, setSelectedImageValue] = useState<string>(user.image);

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

  const handleLogout = () => {
    (navigator as any).navigate(Screens.LoginScreen);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={constants.IMG}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.userWrapper}>
          <PressableIcon
            icon={images.LOGOUT}
            iconStyle={styles.logout}
            buttonStyle={styles.logoutButton}
            onPress={handleLogout}
          />
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
          <ScrollView style={styles.postsContainer}>
            {posts &&
              Object.values(posts).map((post: any) => (
                <Post
                  key={post.id}
                  image={post.image}
                  title={post.title}
                  comments={post.comments.length}
                  location={post.location}
                  onPress={() => {}}
                />
              ))}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

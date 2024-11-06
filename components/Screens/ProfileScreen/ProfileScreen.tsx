import { useContext, useEffect, useState } from "react";
import { Text, View, ScrollView, ImageBackground } from "react-native";
import PickedImage from "../../Tools/PickedImage/PickedImage";
import constants from "../../../utils/images";
import {
  CurrentUserContext,
  DataHandlerContext,
  PostsContext,
} from "../../../App";
import Post from "../../Tools/Post/PostComponent";
import PressableIcon from "../../Tools/PressableIcon/PressableIcon";
import images from "../../../utils/images";
import { Screens } from "../../../utils/enums/routes";
import { useNavigation } from "@react-navigation/native";
import styles from "./stylesProfileScreen";
export default function ProfileScreen() {
  const { userdataHandler } = useContext(DataHandlerContext);
  const { currentUser } = useContext(CurrentUserContext);
  const navigator = useNavigation();
  const posts = useContext(PostsContext);
  const [selectedImage, setSelectedImage] = useState<string>(currentUser.image);

  useEffect(() => {
    setSelectedImage(currentUser.image);
  }, [currentUser.image]);

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
            handleSelectedImage={setSelectedImage}
          ></PickedImage>
          <Text style={styles.header2}>{currentUser.name}</Text>
          <ScrollView style={styles.postsContainer}>
            {posts &&
              Object.values(posts).map(
                (post: any) =>
                  post.owner === currentUser.email && (
                    <Post
                      key={post.id}
                      post={post}
                      onPress={(navigator as any).navigate(Screens.Comments, {
                        currentUser,
                        post,
                      })}
                    />
                  )
              )}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, ScrollView, ImageBackground } from "react-native";
import PickedImage from "../../tools/PickedImage/PickedImage";
import constants from "../../../utils/images";
import Post from "../../tools/Post/PostComponent";
import PressableIcon from "../../tools/PressableIcon/PressableIcon";
import images from "../../../utils/images";
import { Screens } from "../../../utils/enums/routes";
import { logoutDB } from "../../../utils/auth";
import { PostType } from "../../../utils/types/post";
import { fetchUserPosts } from "../../../redux/actions/posts";
import { updateAvatar } from "../../../redux/actions/user";
import styles from "./stylesProfileScreen";
export default function ProfileScreen() {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.auth.currentUser);
  const posts = useSelector((state: any) => state.userPosts);
  const [selectedImage, setSelectedImage] = useState<string>(currentUser.image);

  useFocusEffect(
    useCallback(() => {
      fetchUserPosts(currentUser.userId, dispatch);
    }, [navigator])
  );

  const handleImage = () => {
    if (currentUser.image !== selectedImage) {
      updateAvatar(selectedImage, currentUser.userId, dispatch);
    }
  };

  useEffect(() => {
    handleImage();
  }, [selectedImage]);

  const handleLogout = () => {
    logoutDB(dispatch);
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
            {posts?.length > 0 ? (
              posts.map((post: PostType) => (
                <Post
                  key={post.id}
                  post={post}
                  onPress={() => {
                    (navigator as any).navigate(Screens.Comments, {
                      post,
                    });
                  }}
                />
              ))
            ) : (
              <Text>No posts...</Text>
            )}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

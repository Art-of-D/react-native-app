import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, Image, ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Screens } from "../../../utils/enums/routes";
import Post from "../../tools/Post/PostComponent";
import { getPosts } from "../../../utils/firestore";
import { PostType } from "../../../utils/types/post";
import styles from "./stylesPostsScreen";
import { fetchPosts } from "../../../redux/actions/posts";

export default function PostsScreen() {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.auth.currentUser);
  const posts = useSelector((state: any) => state.posts);
  const [selectedImage, setSelectedImage] = useState<string>(currentUser.image);

  useFocusEffect(
    useCallback(() => {
      fetchPosts(dispatch);
    }, [navigator, getPosts])
  );

  useEffect(() => {
    setSelectedImage(currentUser.image);
  }, [currentUser.image]);

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          source={{
            uri: selectedImage,
          }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.textName}>{currentUser.name}</Text>
          <Text style={styles.textEmail}>{currentUser.email}</Text>
        </View>
      </View>
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
  );
}

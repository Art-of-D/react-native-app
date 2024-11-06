import { Text, View, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { CurrentUserContext, PostsContext } from "../../../App";
import { Screens } from "../../../utils/enums/routes";
import Post from "../../Tools/Post/PostComponent";
import styles from "./stylesPostsScreen";
export default function PostsScreen() {
  const navigator = useNavigation();
  const { currentUser } = useContext(CurrentUserContext);
  const posts = useContext(PostsContext);

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          source={{
            uri: currentUser.image,
          }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.textName}>{currentUser.name}</Text>
          <Text style={styles.textEmail}>{currentUser.email}</Text>
        </View>
      </View>
      <ScrollView style={styles.postsContainer}>
        {posts &&
          Object.values(posts).map((post: any) => (
            <Post
              key={post.id}
              post={post}
              onPress={() => {
                (navigator as any).navigate(Screens.Comments, {
                  currentUser,
                  post,
                });
              }}
            />
          ))}
      </ScrollView>
    </View>
  );
}

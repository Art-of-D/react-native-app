import { Text, View, Image, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { PostsContext } from "../../../App";
import { RoutesNames } from "../../../utils/enums/routes";
import Post from "../../Tools/Post/Post";
import styles from "./stylesPostsScreen";
export default function PostsScreen() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { user } = params as any;
  const posts = useContext(PostsContext);

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          source={{
            uri: user.image,
          }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.textName}>{user.name}</Text>
          <Text style={styles.textEmail}>{user.email}</Text>
        </View>
      </View>
      <ScrollView style={styles.postsContainer}>
        {posts &&
          Object.values(posts).map((post: any) => (
            <Post
              key={post.id}
              image={post.image}
              title={post.title}
              comments={Object.values(post.comments).length}
              location={post.location}
              onPress={() => {
                (navigation as any).navigate(RoutesNames.Comments, {
                  user,
                  post,
                });
              }}
            />
          ))}
      </ScrollView>
    </View>
  );
}

import { Text, View, Image, ScrollView } from "react-native";
import Post from "../Post/Post";
import { useRoute } from "@react-navigation/native";
import styles from "./stylesPostsScreen";
import { useContext } from "react";
import { PostsContext } from "../../../App";
export default function PostsScreen() {
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
              comments={post.comments.length}
              location={post.location}
              onPress={() => {}}
            />
          ))}
      </ScrollView>
    </View>
  );
}

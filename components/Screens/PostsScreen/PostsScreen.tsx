import { Text, View, Image, ScrollView } from "react-native";
import Post from "../Post/Post";
import { useRoute } from "@react-navigation/native";
import styles from "./stylesPostsScreen";
export default function PostsScreen() {
  const { params } = useRoute();
  const { user, users, posts, dataHandler } = params;
  console.log(users);
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
      <ScrollView>
        {posts[0].id &&
          posts.map((post: any) => (
            <Post
              key={post.id}
              image={post.image}
              title={post.title}
              comments={post.comments}
              location={post.location}
              onPress={() => {}}
            />
          ))}
      </ScrollView>
    </View>
  );
}

import { Text, View, Image, FlatList } from "react-native";
import IconInput from "../../Tools/IconInput/IconInput";
import images from "../../../utils/images";
import { useContext, useState } from "react";
import { PostsContext, UsersContext } from "../../../App";
import { useRoute } from "@react-navigation/native";
import { PostComment } from "../CreatePostsScreen/CreatePostsScreen";
import styles from "./stylesCommentsScreen";

export default function CommentsScreen() {
  const { params } = useRoute();
  const { postId } = params as any;
  const users = useContext(UsersContext);
  const posts = useContext(PostsContext);
  const [comment, setComment] = useState("");

  const renderComment = ({ item }: { item: PostComment }) => (
    <View style={styles.commentContainer}>
      <Image
        source={
          users && users[item.email]?.image
            ? { uri: users[item.email].image }
            : undefined
        }
        style={styles.image}
      />
      <View style={styles.commentBubble}>
        <Text style={styles.commentText}>{item.text}</Text>
        <Text style={styles.commentDate}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={
          posts && posts[postId]?.image
            ? { uri: posts[postId].image }
            : undefined
        }
        style={styles.image}
      />

      {posts && posts[postId] && (
        <FlatList
          data={
            posts && posts[postId]
              ? Object.values(posts[postId].comments).map((comment) => {
                  const { id, text, date, email } = JSON.parse(comment);
                  return {
                    id,
                    text,
                    date,
                    email,
                  };
                })
              : null
          }
          renderItem={renderComment}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.commentsList}
        />
      )}

      <View style={styles.inputContainer}>
        <IconInput
          iconSource={images.VECTOR}
          placeholder="Місцевість..."
          textContentOption="location"
          value={comment}
          onChangeText={setComment}
          stylesWrapper={styles.commentWrapper}
          stylesInput={styles.textInput}
          stylesFocusedInput={styles.textInputFocused}
          stylesIcon={styles.commentIcon}
        />
      </View>
    </View>
  );
}

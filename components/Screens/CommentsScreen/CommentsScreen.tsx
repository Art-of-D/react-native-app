import {
  View,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import images from "../../../utils/images";
import { useContext, useState } from "react";
import {
  CurrentUserContext,
  DataHandlerContext,
  Post,
  PostsContext,
  UsersContext,
} from "../../../App";
import { useRoute } from "@react-navigation/native";
import { PostComment } from "../CreatePostsScreen/CreatePostsScreen";
import Comment from "../../Tools/Comment/Comment";
import { PostScreenRouteProp } from "../../../utils/interfaces/routeParams";
import styles from "./stylesCommentsScreen";

export default function CommentsScreen() {
  const { updateComments } = useContext(DataHandlerContext);
  const users = useContext(UsersContext);
  const posts = useContext(PostsContext);
  const { currentUser } = useContext(CurrentUserContext);
  const route = useRoute<PostScreenRouteProp>();
  const post = route.params?.post as Post;
  const [comment, setComment] = useState("");

  const handleComment = () => {
    if (comment) {
      const newComment: PostComment = {
        id: Date.now().toString(),
        text: comment,
        date: new Date().toISOString(),
        email: currentUser.email,
      };
      updateComments(post.id, newComment);
      setComment("");
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.select({
          ios: 100,
          android: 0,
        })}
        style={styles.keyboardContainer}
      >
        <View style={styles.container}>
          <Image
            source={post?.image ? { uri: post.image } : undefined}
            style={styles.image}
          />

          <ScrollView contentContainerStyle={styles.commentsList}>
            {posts &&
              posts[post.id].comments &&
              Object.values(posts[post.id].comments).map((commentData) => (
                <Comment
                  key={commentData.id}
                  comment={commentData}
                  userImage={
                    users && users[commentData.email].image
                      ? users[commentData.email]?.image
                      : undefined
                  }
                  stylesComment={
                    commentData.email === post.owner
                      ? styles.commentOwner
                      : styles.commentUser
                  }
                />
              ))}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Коментувати..."
              value={comment}
              onChangeText={setComment}
            />
            <Pressable style={styles.sendButton} onPress={handleComment}>
              <Image source={images.VECTOR} style={styles.sendIcon} />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

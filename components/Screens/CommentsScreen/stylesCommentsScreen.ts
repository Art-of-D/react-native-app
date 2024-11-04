import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 240,
    resizeMode: "cover",
    borderRadius: 8,
  },
  commentsList: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  commentBubble: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    padding: 8,
  },
  commentText: {
    fontSize: 14,
    color: "#333",
  },
  commentDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    padding: 16,
    width: "100%",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#f1f1f1",
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 8,
  },
  sendIcon: {
    width: 24,
    height: 24,
  },
});

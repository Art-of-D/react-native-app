import { StyleSheet } from "react-native";

export default StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 343,
    height: 240,
    marginTop: 32,
    marginBottom: 32,
    resizeMode: "cover",
    borderRadius: 8,
    zIndex: 10,
  },
  commentsList: {
    height: 323,
    width: 343,
    paddingBottom: 32,
    gap: 24,
    overflow: "hidden",
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 8,
  },
  commentOwner: {
    flexDirection: "row-reverse",
  },
  commentUser: {
    flexDirection: "row",
  },
  inputContainer: {
    position: "absolute",
    bottom: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    width: 343,
    height: 50,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    height: 50,
    fontSize: 16,
  },
  sendButton: {
    position: "absolute",
    right: 24,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#FF6C00",
    zIndex: 1,
  },
  sendIcon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
    transform: [{ rotate: "90deg" }],
  },
});

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#fff",
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 32,
    width: "100%",
    height: 60,
    gap: 8,
  },
  image: {
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  textContainer: {
    justifyContent: "center",
  },
  textName: {
    color: "#212121",
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 19,
    fontWeight: 700,
  },
  textEmail: {
    color: "rgba(33, 33, 33, 0.80)",
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    fontWeight: 400,
  },
  postsContainer: {
    flexGrow: 1,
  },
});

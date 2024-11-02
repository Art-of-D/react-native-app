import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    paddingTop: 147,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  regWrapper: {
    position: "relative",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  scrollView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  avatarWrapper: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }],
    width: "auto",
    height: "auto",
  },
  downloadedImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  addButton: {
    position: "absolute",
    bottom: 14,
    right: -12,
    width: 25,
    height: 25,
    borderRadius: 50,
    borderColor: "#FF6C00",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    position: "absolute",
    bottom: 14,
    right: -12,
    width: 25,
    height: 25,
    borderRadius: 50,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    tintColor: "#FF6C00",
    width: 13,
    height: 13,
  },
  deleteIcon: {
    tintColor: "#BDBDBD",
    width: 13,
    height: 13,
    transform: [{ rotate: "45deg" }],
  },
  header2: {
    padding: 0,
    marginTop: 92,
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    fontWeight: "medium",
    textAlign: "center",
  },
});

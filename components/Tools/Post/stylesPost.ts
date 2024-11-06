import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  postWrapper: {
    width: 343,
    height: 299,
  },
  imageButton: {
    width: 343,
    height: 240,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  title: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "600",
    marginTop: 8,
  },
  bottomWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  iconTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    width: 16,
    height: 16,
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  textIcon: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "400",
  },
  textIconMap: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "400",
    textDecorationLine: "underline",
  },
});

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  wrapper: {
    gap: 8,
    marginBottom: 32,
  },
  imageWrapper: {
    position: "relative",
    minWidth: "100%",
    height: 240,
    backgroundColor: "#E8E8E8",
    borderRadius: 8,
  },
  image: {
    minWidth: "100%",
    height: "100%",
    borderRadius: 8,
  },
  imageButton: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  imageButtonReady: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  buttonIcon: {
    width: 24,
    height: 24,
    tintColor: "#BDBDBD",
  },
  buttonIconReady: {
    tintColor: "#fff",
  },
  text: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "600",
    textAlign: "left",
  },
  textInput: {
    height: 50,
    width: "100%",
    paddingVertical: 0,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
  },
  textInputMap: {
    borderBottomWidth: 0,
    marginBottom: 0,
  },
  textInputFocused: {
    borderBottomColor: "#FF6C00",
  },
  mapWrapper: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  mapIcon: {
    width: 24,
    height: 24,
    tintColor: "#BDBDBD",
    marginRight: 8,
  },
  buttonSubmit: {
    marginTop: 32,
    height: 50,
    width: "100%",
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSubmitReady: {
    backgroundColor: "#FF6C00",
  },
  buttonSubmitText: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "400",
    textAlign: "center",
  },
  buttonSubmitTextReady: {
    color: "#fff",
  },
  buttonDelete: {
    marginTop: 120,
    height: 40,
    width: 70,
    borderRadius: 50,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDeleteIcon: {
    tintColor: "#BDBDBD",
  },
});

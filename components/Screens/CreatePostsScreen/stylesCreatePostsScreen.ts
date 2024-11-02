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
    width: "100%",
    height: 240,
    backgroundColor: "#E8E8E8",
    borderRadius: 8,
  },
  image: {
    minWidth: "100%",
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
  buttonIcon: {
    width: 24,
    height: 24,
    tintColor: "#BDBDBD",
  },
  text: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "400",
    textAlign: "left",
  },
  textInput: {
    height: 50,
    width: "100%",
    borderRadius: 8,
    marginBottom: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
    borderStyle: "solid",
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "400",
    textAlign: "left",
  },
  textInputMap: {
    borderBottomWidth: 0,
    marginBottom: 0,
  },
  textInputFocused: {
    borderColor: "#FF6C00",
    backgroundColor: "#fff",
    color: "#212121",
  },
  mapWrapper: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 32,
    height: 50,
    alignItems: "center",
    gap: 4,
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  mapIcon: {
    width: 24,
    height: 24,
    tintColor: "#BDBDBD",
  },
  buttonSubmit: {
    height: 50,
    width: "100%",
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSubmitText: {
    color: "white",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "400",
    textAlign: "center",
  },
  buttonDelete: {
    marginTop: 120,
    height: 40,
    width: 70,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDeleteIcon: {
    color: "#BDBDBD",
  },
});

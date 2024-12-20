import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  keyboardContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  loginWrapper: {
    position: "relative",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 0,
    alignItems: "center",
    width: "100%",
    height: 489,
    backgroundColor: "#fff",
  },
  header2: {
    padding: 0,
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    fontWeight: "medium",
    textAlign: "center",
  },
  inputWrapper: {
    marginTop: 32,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    width: "100%",
    maxHeight: 343,
  },
  textInput: {
    height: 50,
    width: "100%",
    borderRadius: 8,
    padding: 16,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderStyle: "solid",
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "400",
    textAlign: "left",
    backgroundColor: "#F6F6F6",
  },
  textInputFocused: {
    borderColor: "#FF6C00",
    backgroundColor: "#fff",
    color: "#212121",
  },
  passwordWrapper: {
    position: "relative",
    width: "100%",
  },
  toggleButton: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  toggleText: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
    fontWeight: "regular",
  },
  buttonLogin: {
    marginTop: 43,
    height: 50,
    width: "100%",
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextLogin: {
    color: "white",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "400",
    textAlign: "center",
  },
  buttonReg: {
    marginTop: 16,
    height: 19,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextReg: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "400",
    textAlign: "center",
  },
});

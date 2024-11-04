import {
  Text,
  View,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { useContext, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import PickedImage from "../../Tools/PickedImage/PickedImage";
import Input from "../../Tools/Input/Input";
import Button from "../../Tools/Button/Button";
import constants from "../../../utils/images";
import { UsersContext } from "../../../App";
import styles from "./stylesRegistration";

export default function RegistrationScreen() {
  const navigation = useNavigation();
  const users = useContext(UsersContext);
  const route = useRoute();
  const { dataHandler } = route.params as any;
  const [loginValue, setLoginValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [secureTextEntryValue, setSecureTextEntryValue] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const togglePasswordVisibility = () => {
    setSecureTextEntryValue(!secureTextEntryValue);
  };

  const registration = () => {
    if (!loginValue || !emailValue || !passwordValue || !selectedImage) {
      Alert.alert("Заповніть усі поля");
      return;
    }
    if (!emailValue.includes("@")) {
      Alert.alert("Невірний формат пошти");
      return;
    }
    if (passwordValue.length < 6) {
      Alert.alert("Пароль повинен містити не менше 6 символів");
      return;
    }
    if (users && users[emailValue]) {
      Alert.alert("Користувач з такою поштою вже існує");
      return;
    }
    const data = {
      name: loginValue,
      email: emailValue,
      password: passwordValue,
      image: selectedImage,
      loggedIn: true,
    };
    dataHandler("users", { [emailValue]: { ...data } });
    setEmailValue("");
    setLoginValue("");
    setPasswordValue("");
    setSecureTextEntryValue(true);
    setSelectedImage("");

    (navigation as any).navigate("Home", { user: data });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={constants.IMG}
          resizeMode="cover"
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.select({
              ios: -200,
              android: 0,
            })}
            style={styles.keyboardContainer}
          >
            <View style={styles.regWrapper}>
              <PickedImage
                stylesImageWrapper={styles.avatarWrapper}
                stylesImage={styles.downloadedImage}
                stylesButton={
                  selectedImage ? styles.deleteButton : styles.addButton
                }
                stylesButtonIcon={
                  selectedImage ? styles.deleteIcon : styles.addIcon
                }
                buttonIcon={constants.PLUS}
                image={selectedImage}
                deleteImageFunc={true}
                handleSelectedImage={setSelectedImage}
              />
              <Text style={styles.header2}>Реєстрація</Text>

              <View style={styles.inputWrapper}>
                <Input
                  placeholder="Логін"
                  textContentType="nickname"
                  value={loginValue}
                  stylesInput={styles.textInput}
                  stylesFocusedInput={styles.textInputFocused}
                  onChangeText={setLoginValue}
                />
                <Input
                  placeholder="Адреса електронної пошти"
                  textContentOption="emailAddress"
                  value={emailValue}
                  stylesInput={styles.textInput}
                  stylesFocusedInput={styles.textInputFocused}
                  onChangeText={setEmailValue}
                />

                <View style={styles.passwordWrapper}>
                  <Input
                    placeholder="Пароль"
                    textContentOption="password"
                    secureTextEntry={secureTextEntryValue}
                    value={passwordValue}
                    stylesInput={styles.textInput}
                    stylesFocusedInput={styles.textInputFocused}
                    onChangeText={setPasswordValue}
                  />
                  <Button
                    onPress={togglePasswordVisibility}
                    stylesButton={styles.toggleButton}
                    stylesText={styles.toggleText}
                    text={secureTextEntryValue ? "Показати" : "Сховати"}
                  ></Button>
                </View>
              </View>
              <Button
                stylesButton={styles.buttonReg}
                text={"Зареєструватися"}
                stylesText={styles.buttonRegText}
                onPress={registration}
              ></Button>
              <Button
                stylesButton={styles.buttonLogin}
                text={"Вже є акаунт? Увійти"}
                stylesText={styles.buttonLoginText}
                onPress={() => (navigation as any).navigate("Login")}
              ></Button>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

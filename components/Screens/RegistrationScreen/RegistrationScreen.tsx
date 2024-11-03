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
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import PickedImage from "../../Tools/PickedImage/PickedImage";
import Input from "../../Tools/Input/Input";
import Button from "../../Tools/Button/Button";
import constants from "../../../utils/images";
import styles from "./stylesRegistration";

export default function RegistrationScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { users, dataHandler } = route.params;
  const [loginValue, setLoginValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [secureTextEntryValue, setSecureTextEntryValue] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

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
    if (users[emailValue]) {
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
    setSelectedImage(undefined);

    navigation.navigate("Home", { user: data });
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
                handleSelectedImage={setSelectedImage}
              ></PickedImage>
              <Text style={styles.header2}>Реєстрація</Text>

              <View style={styles.inputWrapper}>
                <Input
                  placeholder="Логін"
                  textContentType="nickname"
                  value={loginValue}
                  classNameInput={styles.textInput}
                  classNameFocusedInput={styles.textInputFocused}
                  onChangeText={setLoginValue}
                />
                <Input
                  placeholder="Адреса електронної пошти"
                  textContentType="emailAddress"
                  value={emailValue}
                  classNameInput={styles.textInput}
                  classNameFocusedInput={styles.textInputFocused}
                  onChangeText={setEmailValue}
                />

                <View style={styles.passwordWrapper}>
                  <Input
                    placeholder="Пароль"
                    textContentType="password"
                    secureTextEntry={secureTextEntryValue}
                    value={passwordValue}
                    classNameInput={styles.textInput}
                    classNameFocusedInput={styles.textInputFocused}
                    onChangeText={setPasswordValue}
                  />
                  <Button
                    onPress={togglePasswordVisibility}
                    classNameButton={styles.toggleButton}
                    classNameText={styles.toggleText}
                    text={secureTextEntryValue ? "Показати" : "Сховати"}
                  ></Button>
                </View>
              </View>
              <Button
                classNameButton={styles.buttonReg}
                text={"Зареєструватися"}
                classNameText={styles.buttonRegText}
                onPress={registration}
              ></Button>
              <Button
                classNameButton={styles.buttonLogin}
                text={"Вже є акаунт? Увійти"}
                classNameText={styles.buttonLoginText}
                onPress={() => navigation.navigate("Login")}
              ></Button>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

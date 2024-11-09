import {
  Text,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import PickedImage from "../../tools/PickedImage/PickedImage";
import Input from "../../tools/Input/Input";
import Button from "../../tools/Button/Button";
import constants from "../../../utils/images";
import { PostScreenRouteProp } from "../../../utils/interfaces/routeParams";
import { useDispatch } from "react-redux";
import { Screens } from "../../../utils/enums/routes";
import { ShowPassword } from "../../../utils/enums/auth";
import { registrationDB } from "../../../utils/auth";
import { RegistrationCredentials } from "../../../utils/types/user";
import styles from "./stylesRegistration";

export default function RegistrationScreen() {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute<PostScreenRouteProp>();
  const photoUri = route.params?.photoUri;
  const [loginValue, setLoginValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [secureTextEntryValue, setSecureTextEntryValue] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");

  // useEffect(() => {
  //   if (photoUri) {
  //     setSelectedImage(photoUri);
  //   }
  // }, [photoUri]);

  const togglePasswordVisibility = () => {
    setSecureTextEntryValue(!secureTextEntryValue);
  };

  const handleRegistration = () => {
    const credentials = registrationDB(
      {
        email: emailValue,
        image: selectedImage,
        name: loginValue,
        password: passwordValue,
      } as RegistrationCredentials,
      dispatch
    );

    if (!credentials) {
      return;
    }

    setEmailValue("");
    setLoginValue("");
    setPasswordValue("");
    setSelectedImage("");
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
                    text={
                      secureTextEntryValue
                        ? ShowPassword.SHOW
                        : ShowPassword.HIDE
                    }
                  ></Button>
                </View>
              </View>
              <Button
                stylesButton={styles.buttonReg}
                text={"Зареєструватися"}
                stylesText={styles.buttonRegText}
                onPress={handleRegistration}
              ></Button>
              <Button
                stylesButton={styles.buttonLogin}
                text={"Вже є акаунт? Увійти"}
                stylesText={styles.buttonLoginText}
                onPress={() => (navigator as any).navigate(Screens.LoginScreen)}
              ></Button>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

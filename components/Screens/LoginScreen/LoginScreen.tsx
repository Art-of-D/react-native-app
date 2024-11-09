import { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import constants from "../../../utils/images";
import Input from "../../tools/Input/Input";
import Button from "../../tools/Button/Button";
import { ShowPassword } from "../../../utils/enums/auth";
import { Screens } from "../../../utils/enums/routes";
import { loginDB } from "../../../utils/auth";
import { AuthCredentials, User } from "../../../utils/types/user";
import styles from "./stylesLogin";

export default function LoginScreen() {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const credentials: User = await loginDB(
      { email, password } as AuthCredentials,
      dispatch
    );
    if (!credentials?.userId) {
      return;
    }
    setEmail("");
    setPassword("");
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
              ios: -250,
              android: 0,
            })}
            style={styles.keyboardContainer}
          >
            <View style={styles.loginWrapper}>
              <Text style={styles.header2}>Увійти</Text>
              <View style={styles.inputWrapper}>
                <Input
                  placeholder="Адреса електронної пошти"
                  textContentOption="emailAddress"
                  value={email}
                  onChangeText={setEmail}
                  stylesInput={styles.textInput}
                  stylesFocusedInput={styles.textInputFocused}
                />
                <View style={styles.passwordWrapper}>
                  <Input
                    placeholder="Пароль"
                    textContentOption="password"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    stylesInput={styles.textInput}
                    stylesFocusedInput={styles.textInputFocused}
                  />
                  <TouchableOpacity
                    onPress={toggleShowPassword}
                    style={styles.toggleButton}
                  >
                    <Text style={styles.toggleText}>
                      {showPassword ? ShowPassword.SHOW : ShowPassword.HIDE}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Button
                stylesButton={styles.buttonLogin}
                text={"Увійти"}
                stylesText={styles.buttonTextLogin}
                onPress={handleLogin}
              ></Button>
              <Button
                stylesButton={styles.buttonReg}
                text={"Немає акаунту? Зареєструватися"}
                stylesText={styles.buttonTextReg}
                onPress={() =>
                  (navigator as any).navigate(Screens.RegistrationScreen)
                }
              ></Button>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

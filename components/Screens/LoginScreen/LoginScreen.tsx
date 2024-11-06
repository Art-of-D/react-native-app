import { useContext, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import constants from "../../../utils/images";
import Input from "../../Tools/Input/Input";
import Button from "../../Tools/Button/Button";
import { UsersContext } from "../../../App";
import styles from "./stylesLogin";

export default function LoginScreen() {
  const navigator = useNavigation();
  const users = useContext<any>(UsersContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Введіть всі поля");
      return;
    }
    const user = users[email];

    if (!user) {
      Alert.alert("Такого користувача не існує");
      return;
    }

    if (user.password !== password) {
      Alert.alert("Невірний пароль");
      return;
    }
    setEmail("");
    setPassword("");
    setShowPassword(false);

    (navigation as any).navigate("Home", { user });
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
                      {showPassword ? "Сховати" : "Показати"}
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
                onPress={() => (navigation as any).navigate("Registration")}
              ></Button>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

import { useState } from "react";
import {
  Text,
  TextInput,
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
import styles from "./stylesLogin";

const IMG = require("../../assets/images/reg-bg.jpg");

export default function LoginScreen({ route }: any) {
  const navigation = useNavigation();
  const cookies = route.params.cookies;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [focusedInput, setFocusedInput] = useState("");

  const togglePasswordVisibility = () => {
    if (password) {
      setSecureTextEntry(!secureTextEntry);
    }
  };

  const login = () => {
    if (!email || !password) {
      Alert.alert("Заповніть усі поля");
      return;
    }
    const user = cookies.get(email);
    if (!user) {
      Alert.alert("Такого користувача не існує");
      return;
    }

    if (user.password !== password) {
      Alert.alert("Невірний пароль");
      return;
    }
    navigation.navigate("Home");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground source={IMG} resizeMode="cover" style={styles.image}>
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
                <TextInput
                  placeholder="Адреса електронної пошти"
                  textContentType="emailAddress"
                  value={email}
                  onChangeText={setEmail}
                  style={[
                    styles.textInput,
                    focusedInput === "email" && styles.focusedInput,
                  ]}
                  onFocus={() => setFocusedInput("email")}
                  onBlur={() => setFocusedInput("")}
                />

                <View style={styles.passwordWrapper}>
                  <TextInput
                    placeholder="Пароль"
                    textContentType="password"
                    secureTextEntry={secureTextEntry}
                    value={password}
                    onChangeText={setPassword}
                    style={[
                      styles.textInput,
                      focusedInput === "password" && styles.focusedInput,
                    ]}
                    onFocus={() => setFocusedInput("password")}
                    onBlur={() => setFocusedInput("")}
                  />
                  <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    style={styles.toggleButton}
                  >
                    <Text style={styles.toggleText}>
                      {secureTextEntry ? "Показати" : "Сховати"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={styles.buttonReg}>
                <Text style={styles.buttonTextReg} onPress={login}>
                  Увійти
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonLogin}
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.buttonTextLogin}>
                  Немає акаунту? Зареєструватися
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

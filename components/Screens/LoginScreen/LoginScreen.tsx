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
import { useNavigation, useRoute } from "@react-navigation/native";
import constants from "../../../utils/images";
import styles from "./stylesLogin";
import Input from "../../Tools/Input/Input";
import Button from "../../Tools/Button/Button";

export default function LoginScreen() {
  const navigation = useNavigation();
  const {
    params: { cookies },
  } = useRoute();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Введіть всі поля");
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

    navigation.navigate("Home", { user });
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
                  textContentType="emailAddress"
                  value={email}
                  onChangeText={setEmail}
                />
                <View style={styles.passwordWrapper}>
                  <Input
                    placeholder="Пароль"
                    textContentType="password"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
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
                classNameButton={styles.buttonLogin}
                text={"Увійти"}
                classNameText={styles.buttonTextLogin}
                onPress={handleLogin}
              ></Button>
              <Button
                classNameButton={styles.buttonReg}
                text={"Немає акаунту? Зареєструватися"}
                classNameText={styles.buttonTextReg}
                onPress={() => navigation.navigate("Registration")}
              ></Button>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

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
import styles from "./stylesLogin";
import * as ImagePicker from "expo-image-picker";

const IMG = require("../../assets/images/reg-bg.jpg");

export default function LoginScreen({ togglePage }: { togglePage: Function }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [focusedInput, setFocusedInput] = useState("");

  const pickImageHandler = () => {
    if (selectedImage) {
      setSelectedImage(undefined);
    } else {
      pickImage();
    }
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Denied",
        "You need to enable permission to access photos."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const togglePasswordVisibility = () => {
    if (password) {
      setSecureTextEntry(!secureTextEntry);
    }
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
                <Text style={styles.buttonTextReg}>Увійти</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonLogin}
                onPress={() => togglePage("registration")}
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

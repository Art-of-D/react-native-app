import {
  Text,
  TextInput,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import styles from "./stylesRegistration";

const IMG = require("../../assets/images/reg-bg.jpg");

export default function RegistrationScreen({ route }: any) {
  const navigation = useNavigation();
  const cookies = route.params.cookies;
  const [login, setLogin] = useState("");
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

  const registration = () => {
    if (!login || !email || !password || !selectedImage) {
      Alert.alert("Заповніть усі поля");
      return;
    }
    const cookie: Cookie = JSON.stringify({
      name: login,
      email: email,
      password: password,
      image: selectedImage,
      loggedIn: true,
    });
    cookies.set(email, cookie);
    navigation.navigate("Home");
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
              ios: -200,
              android: 0,
            })}
            style={styles.keyboardContainer}
          >
            <View style={styles.regWrapper}>
              <View style={styles.avatarWrapper}>
                <Image
                  key={selectedImage ? selectedImage : "default"}
                  source={{ uri: selectedImage }}
                  style={styles.downloadedImage}
                />
                <Pressable
                  style={selectedImage ? styles.deleteButton : styles.addButton}
                  onPress={pickImageHandler}
                >
                  <Text
                    style={selectedImage ? styles.deleteIcon : styles.addIcon}
                  >
                    &#43;
                  </Text>
                </Pressable>
              </View>
              <Text style={styles.header2}>Реєстрація</Text>

              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="Логін"
                  textContentType="nickname"
                  value={login}
                  onChangeText={setLogin}
                  style={[
                    styles.textInput,
                    focusedInput === "login" && styles.focusedInput,
                  ]}
                  onFocus={() => setFocusedInput("login")}
                  onBlur={() => setFocusedInput("")}
                />
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
              <TouchableOpacity style={styles.buttonReg} onPress={registration}>
                <Text style={styles.buttonTextReg}>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonLogin}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.buttonTextLogin}>Вже є акаунт? Увійти</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

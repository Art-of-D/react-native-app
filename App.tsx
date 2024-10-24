import { useState } from "react";
import { useFonts } from "expo-font";
import RegistrationScreen from "./components/Screens/RegistrationScreen";
import LoginScreen from "./components/Screens/LoginScreen";
import { View, Text } from "react-native";

export default function App() {
  const [loaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
  const [page, setPage] = useState("registration");
  const handlePage = (value: string) => {
    setPage(value);
  };

  if (!loaded) {
    return (
      <View>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <>
      {page === "registration" ? (
        <RegistrationScreen togglePage={handlePage} />
      ) : (
        <LoginScreen togglePage={handlePage} />
      )}
    </>
  );
}

import "react-native-gesture-handler";
import React from "react";

import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import RegistrationScreen from "./components/Screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./components/Screens/LoginScreen/LoginScreen";
import Home from "./components/Screens/Home/Home";
import Cookies from "universal-cookie";

const MainStack = createStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
  const cookies = new Cookies(null, { path: "/" });

  if (!loaded) {
    return (
      <View>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Registration">
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          initialParams={{ cookies }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          initialParams={{ cookies }}
        />
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{ title: "Публікації", headerShown: false }}
          initialParams={{ cookies }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

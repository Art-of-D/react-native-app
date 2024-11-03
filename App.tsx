import "react-native-gesture-handler";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import RegistrationScreen from "./components/Screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./components/Screens/LoginScreen/LoginScreen";
import Home from "./components/Screens/Home/Home";

const MainStack = createStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
  type User = [
    {
      [key: string]: {
        name: string;
        email: string;
        password: string;
        image: string;
        loggedIn: boolean;
      };
    }
  ];
  type Post = [
    {
      [key: string]: {
        owner: string;
        image: string;
        title: string;
        comments: [];
        location: string;
      };
    }
  ];

  const [users, setUsers] = useState<User>([{}]);
  const [posts, setPosts] = useState<Post>([{}]);
  const dataHandler = (key: string, value: object) => {
    if (key === "users") {
      setUsers((prevState) => ({ ...prevState, ...value }));
    } else if (key === "posts") {
      setPosts((prevState) => [{ ...prevState, ...value }]);
    }
  };

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
          initialParams={{ users, dataHandler }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          initialParams={{ users }}
        />
        <MainStack.Screen
          name="Home"
          component={Home}
          initialParams={{ users, posts, dataHandler }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

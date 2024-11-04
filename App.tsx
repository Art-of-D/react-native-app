import "react-native-gesture-handler";
import React, { createContext, useState } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import RegistrationScreen from "./components/Screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./components/Screens/LoginScreen/LoginScreen";
import Home from "./components/Screens/Home/Home";

export type User = {
  [key: string]: {
    name: string;
    email: string;
    password: string;
    image: string;
    loggedIn: boolean;
  };
};

export type Post = {
  [key: string]: {
    owner: string;
    image: string;
    title: string;
    comments: Array<string>;
    location: string;
  };
};

const MainStack = createStackNavigator();
export const UsersContext = createContext<User | null>({});
export const PostsContext = createContext<Post | null>({});

export default function App() {
  const [loaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  const [users, setUsers] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post | null>(null);
  const dataHandler = (key: string, value: User | Post) => {
    if (key === "users") {
      setUsers((prevState: User | null) =>
        prevState ? { ...prevState, ...(value as User) } : (value as User)
      );
    } else if (key === "posts") {
      setPosts((prevState: Post | null) =>
        prevState ? { ...prevState, ...(value as Post) } : (value as Post)
      );
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
    <UsersContext.Provider value={users}>
      <PostsContext.Provider value={posts}>
        <NavigationContainer>
          <MainStack.Navigator initialRouteName="Registration">
            <MainStack.Screen
              name="Registration"
              component={RegistrationScreen}
              initialParams={{ dataHandler }}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Home"
              component={Home}
              initialParams={{ dataHandler }}
              options={{ headerShown: false }}
            />
          </MainStack.Navigator>
        </NavigationContainer>
      </PostsContext.Provider>
    </UsersContext.Provider>
  );
}

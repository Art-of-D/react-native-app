import "react-native-gesture-handler";
import React, { createContext, useState } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import RegistrationScreen from "./components/Screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./components/Screens/LoginScreen/LoginScreen";
import Home from "./components/Screens/Home/Home";
import {
  PostComment,
  PostComments,
} from "./components/Screens/CreatePostsScreen/CreatePostsScreen";
import { RoutesNames, Screens, ScreensTitles } from "./utils/enums/routes";
import CommentsScreen from "./components/Screens/CommentsScreen/CommentsScreen";
import PressableIcon from "./components/Tools/PressableIcon/PressableIcon";

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
    comments: PostComments;
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

  const updateComments = (id: string, newComment: PostComment) => {
    setPosts((prevState: Post | null) => {
      if (!prevState) {
        return null;
      }
      if (prevState[id].comments) {
        return {
          ...prevState,
          [id]: {
            ...prevState[id],
            comments: {
              ...prevState[id].comments,
              [newComment.id]: newComment,
            },
          },
        };
      } else {
        return {
          ...prevState,
          [id]: {
            ...prevState[id],
            comments: {
              [newComment.id]: newComment,
            },
          },
        };
      }
    });
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
          <MainStack.Navigator initialRouteName={Screens.RegistrationScreen}>
            <MainStack.Screen
              name={Screens.RegistrationScreen}
              component={RegistrationScreen}
              initialParams={{ dataHandler }}
              options={{
                headerShown: false,
              }}
            />
            <MainStack.Screen
              name={Screens.LoginScreen}
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name={Screens.Home}
              component={Home}
              initialParams={{ dataHandler, updateComments }}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name={RoutesNames.Comments}
              component={CommentsScreen}
              initialParams={{ updateComments }}
              options={({ route }) => ({
                headerTitle: ScreensTitles.Comments,
                headerLeft: () =>
                  route.name === RoutesNames.Comments ? (
                    <PressableIcon />
                  ) : undefined,
                headerStyle: {
                  height: 98,
                  borderBottomColor: "rgba(0, 0, 0, 0.30)",
                  borderBottomWidth: 1,
                },
              })}
            />
          </MainStack.Navigator>
        </NavigationContainer>
      </PostsContext.Provider>
    </UsersContext.Provider>
  );
}

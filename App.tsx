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
import { Screens, ScreensTitles } from "./utils/enums/routes";
import CommentsScreen from "./components/Screens/CommentsScreen/CommentsScreen";
import PressableIcon from "./components/Tools/PressableIcon/PressableIcon";
import CameraScreen from "./components/Screens/CameraScreen/CameraScreen";
import MapScreen from "./components/Screens/MapScreen/MapScreen";

export type User = {
  name: string;
  email: string;
  password: string;
  image: string;
  loggedIn: boolean;
};
export type Users = {
  [key: string]: User;
};

export type Post = {
  id: string;
  owner: string;
  image: string;
  title: string;
  comments: PostComments;
  location: string;
  coordinates: { latitude: number; longitude: number };
};

export type Posts = {
  [key: string]: Post;
};

const MainStack = createStackNavigator();
export const UsersContext = createContext<Users | null>({});
export const PostsContext = createContext<Posts | null>({});
export const DataHandlerContext = createContext({
  userdataHandler: (key: string, value: Users | Posts) => {},
  updateComments: (id: string, newComment: PostComment) => {},
});
export const CurrentUserContext = createContext({
  currentUser: {} as User,
  setCurrentUser: (user: any) => {},
});

export default function App() {
  const [loaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  const [currentUser, setCurrentUser] = useState<User>({} as User);
  const [users, setUsers] = useState<Users | null>(null);
  const [posts, setPosts] = useState<Posts | null>(null);
  const userdataHandler = (key: string, value: Users | Posts) => {
    if (key === "users") {
      setUsers((prevState: Users | null) =>
        prevState ? { ...prevState, ...(value as Users) } : (value as Users)
      );
    } else if (key === "posts") {
      setPosts((prevState: Posts | null) =>
        prevState ? { ...prevState, ...(value as Posts) } : (value as Posts)
      );
    }
  };

  const updateComments = (id: string, newComment: PostComment) => {
    setPosts((prevState: Posts | null) => {
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
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <UsersContext.Provider value={users}>
        <PostsContext.Provider value={posts}>
          <DataHandlerContext.Provider
            value={{ userdataHandler, updateComments }}
          >
            <NavigationContainer>
              <MainStack.Navigator
                initialRouteName={Screens.RegistrationScreen}
              >
                <MainStack.Screen
                  name={Screens.RegistrationScreen}
                  component={RegistrationScreen}
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
                  options={{ headerShown: false }}
                />
                <MainStack.Screen
                  name={Screens.Comments}
                  component={CommentsScreen}
                  options={({ route }) => ({
                    headerTitle: ScreensTitles.Comments,
                    headerLeft: () =>
                      route.name === Screens.Comments ? (
                        <PressableIcon />
                      ) : undefined,
                    headerStyle: {
                      height: 98,
                      borderBottomColor: "rgba(0, 0, 0, 0.30)",
                      borderBottomWidth: 1,
                    },
                  })}
                />
                <MainStack.Screen
                  name={Screens.Camera}
                  component={CameraScreen}
                  options={({ route }) => ({
                    headerTitle: "",
                    headerLeft: () =>
                      route.name === Screens.Camera ? (
                        <PressableIcon />
                      ) : undefined,
                    headerStyle: {
                      height: 98,
                      borderBottomColor: "rgba(255, 255, 255, 0.30)",
                      borderBottomWidth: 1,
                    },
                  })}
                />
                <MainStack.Screen name={Screens.Map} component={MapScreen} />
              </MainStack.Navigator>
            </NavigationContainer>
          </DataHandlerContext.Provider>
        </PostsContext.Provider>
      </UsersContext.Provider>
    </CurrentUserContext.Provider>
  );
}

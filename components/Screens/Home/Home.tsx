import { View, Text, Image } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import PostsScreen from "../PostsScreen/PostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../../utils/images";
import PressableIcon from "../../Tools/PressableIcon/PressableIcon";
import { Screens, ScreensTitles } from "../../../utils/enums/routes";
import { useContext, useEffect } from "react";
import { CurrentUserContext, DataHandlerContext } from "../../../App";
import { RouteParams } from "../../../utils/interfaces/routeParams";
import styles from "./stylesHome";

type RegistrationScreenRouteProp = RouteProp<
  RouteParams,
  Screens.RegistrationScreen
>;
export default function Home() {
  const Tabs = createBottomTabNavigator();
  const navigator = useNavigation();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { userdataHandler } = useContext(DataHandlerContext);
  const route = useRoute<RegistrationScreenRouteProp>();
  const photoUri = route.params?.photoUri;

  useEffect(() => {
    const userData = { ...currentUser };
    if (photoUri) {
      userData.image = photoUri;
      setCurrentUser(userData);
      userdataHandler("users", { [currentUser.email]: { ...userData } });
    }
  }, [photoUri]);

  const handleLogout = () => {
    (navigator as any).navigate(Screens.LoginScreen);
  };

  if (!currentUser) {
    return (
      <SafeAreaView style={{ paddingLeft: 16, paddingRight: 16 }}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
  return (
    <View style={styles.container}>
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          headerLeft: () =>
            route.name === Screens.CreatePosts ? (
              <PressableIcon icon={images.VECTOR} />
            ) : undefined,
          headerRight: () =>
            route.name === Screens.Posts ? (
              <PressableIcon
                icon={images.LOGOUT}
                iconStyle={styles.logout}
                buttonStyle={styles.logoutButton}
                onPress={handleLogout}
              />
            ) : undefined,
          headerStyle: {
            height: 98,
            borderBottomColor: "rgba(0, 0, 0, 0.30)",
            borderBottomWidth: 1,
          },
          tabBarStyle: {
            borderTopColor: "rgba(0, 0, 0, 0.30)",
            borderTopWidth: 1,
            height: 93,
          },
          tabBarShowLabel: false,
          tabBarIcon: () => {
            let iconSource;
            const postsTab = route.name === Screens.Posts;
            const createPostTab = route.name === Screens.CreatePosts;
            const profileTab = route.name === Screens.Profile;
            if (postsTab) {
              iconSource = images.CUBES;
            } else if (createPostTab) {
              iconSource = images.PLUS;
            } else if (profileTab) {
              iconSource = images.PROFILE;
            }

            return (
              <View
                style={{
                  width: createPostTab ? 70 : 40,
                  height: 40,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: createPostTab ? "#FF6C00" : "#fff",
                }}
              >
                <Image
                  source={iconSource}
                  style={{
                    width: createPostTab ? 13 : 24,
                    height: createPostTab ? 13 : 24,
                    tintColor: createPostTab ? "#fff" : undefined,
                  }}
                />
              </View>
            );
          },
        })}
      >
        <Tabs.Screen
          name={Screens.Posts}
          component={PostsScreen}
          options={{ headerTitle: ScreensTitles.Posts }}
        />
        <Tabs.Screen
          name={Screens.CreatePosts}
          component={CreatePostsScreen}
          options={{
            tabBarStyle: { display: "none" },
            headerTitle: ScreensTitles.CreatePosts,
          }}
        />
        <Tabs.Screen
          name={Screens.Profile}
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </Tabs.Navigator>
    </View>
  );
}

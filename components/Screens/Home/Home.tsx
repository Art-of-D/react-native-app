import { View, Text, Image } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import PostsScreen from "../PostsScreen/PostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../../utils/images";
import PressableIcon from "../../Tools/PressableIcon/PressableIcon";
import {
  RoutesNames,
  Screens,
  ScreensTitles,
} from "../../../utils/enums/routes";
import styles from "./stylesHome";

export default function Home() {
  const { params } = useRoute();
  const { user, dataHandler, updateComments } = params as any;
  const navigation = useNavigation();
  const Tabs = createBottomTabNavigator();

  const handleLogout = () => {
    (navigation as any).navigate(Screens.LoginScreen);
  };

  if (!user) {
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
            route.name === RoutesNames.CreatePosts ? (
              <PressableIcon icon={images.VECTOR} />
            ) : undefined,
          headerRight: () =>
            route.name === RoutesNames.Posts ? (
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
            const postsTab = route.name === RoutesNames.Posts;
            const createPostTab = route.name === RoutesNames.CreatePosts;
            const profileTab = route.name === RoutesNames.Profile;
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
          name={RoutesNames.Posts}
          component={PostsScreen}
          initialParams={{ user }}
          options={{ headerTitle: ScreensTitles.Posts }}
        />
        <Tabs.Screen
          name={RoutesNames.CreatePosts}
          component={CreatePostsScreen}
          options={{
            tabBarStyle: { display: "none" },
            headerTitle: ScreensTitles.CreatePosts,
          }}
          initialParams={{ user, dataHandler }}
        />
        <Tabs.Screen
          name={RoutesNames.Profile}
          component={ProfileScreen}
          initialParams={{ user, dataHandler }}
          options={{ headerShown: false }}
        />
      </Tabs.Navigator>
    </View>
  );
}

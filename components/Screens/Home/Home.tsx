import { View, Text, Image } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import PostsScreen from "../PostsScreen/PostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../../utils/images";
import PressableIcon from "../../Tools/PressableIcon/PressableIcon";
import styles from "./stylesHome";

export default function Home() {
  const { params } = useRoute();
  const { user, dataHandler } = params as any;
  const navigation = useNavigation();

  const handleLogout = () => {
    (navigation as any).navigate("Login");
  };

  if (!user) {
    return (
      <SafeAreaView style={{ paddingLeft: 16, paddingRight: 16 }}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const Tabs = createBottomTabNavigator();

  return (
    <View style={styles.container}>
      <Tabs.Navigator
        screenOptions={({ route, navigation }) => ({
          headerLeft: () =>
            route.name === "Створити публікацію" ||
            route.name === "Комментарі" ? (
              <PressableIcon
                icon={images.VECTOR}
                iconStyle={styles.vector}
                buttonStyle={styles.vectorButton}
                onPress={() => navigation.goBack()}
              />
            ) : undefined,
          headerRight: () =>
            route.name === "Публікації" ? (
              <PressableIcon
                icon={images.LOGOUT}
                iconStyle={styles.logout}
                buttonStyle={styles.logoutButton}
                onPress={() => navigation.navigate("Login")}
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
            const postsTab = route.name === "Публікації";
            const createPostTab = route.name === "Створити публікацію";
            const profileTab = route.name === "Профіль";
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
          name="Публікації"
          component={PostsScreen}
          initialParams={{ user }}
        />
        <Tabs.Screen
          name="Створити публікацію"
          component={CreatePostsScreen}
          options={{ tabBarStyle: { display: "none" } }}
          initialParams={{ user, dataHandler }}
        />
        <Tabs.Screen
          name="Профіль"
          component={ProfileScreen}
          initialParams={{ user, dataHandler }}
          options={{ headerShown: false }}
        />
      </Tabs.Navigator>
    </View>
  );
}

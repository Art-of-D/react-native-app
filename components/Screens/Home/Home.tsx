import { View, Text, Button } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import PostsScreen from "../PostsScreen/PostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import styles from "./stylesHome";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { params } = useRoute();
  const { user, users, posts, dataHandler } = params;
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate("Login");
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
        screenOptions={() => ({
          headerRight: () => (
            <Button onPress={handleLogout} title="Logout" color="tomato" />
          ),
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        })}
      >
        <Tabs.Screen
          name="Публікації"
          component={PostsScreen}
          initialParams={{ user, users, posts, dataHandler }}
        />
        <Tabs.Screen
          name="Створити публікацію"
          component={CreatePostsScreen}
          options={{ tabBarStyle: { display: "none" } }}
          initialParams={{ user, users, posts, dataHandler }}
        />
        <Tabs.Screen
          name="Профіль"
          component={ProfileScreen}
          initialParams={{ user, users, posts, dataHandler }}
          options={{ headerShown: false }}
        />
      </Tabs.Navigator>
    </View>
  );
}

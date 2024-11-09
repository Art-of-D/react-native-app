import { createStackNavigator } from "@react-navigation/stack";
import { Screens, ScreensTitles } from "../../utils/enums/routes";
import Home from "../screens/Home/Home";
import CommentsScreen from "../screens/CommentsScreen/CommentsScreen";
import PressableIcon from "../tools/PressableIcon/PressableIcon";
import CameraScreen from "../screens/CameraScreen/CameraScreen";
import MapScreen from "../screens/MapScreen/MapScreen";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName={Screens.Home}>
      <Stack.Screen
        name={Screens.Home}
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.Comments}
        component={CommentsScreen}
        options={({ route }) => ({
          headerTitle: ScreensTitles.Comments,
          headerLeft: () =>
            route.name === Screens.Comments ? <PressableIcon /> : undefined,
          headerStyle: {
            height: 98,
            borderBottomColor: "rgba(0, 0, 0, 0.30)",
            borderBottomWidth: 1,
          },
        })}
      />
      <Stack.Screen
        name={Screens.Camera}
        component={CameraScreen}
        options={({ route }) => ({
          headerTitle: "",
          headerLeft: () =>
            route.name === Screens.Camera ? <PressableIcon /> : undefined,
          headerStyle: {
            height: 98,
            borderBottomColor: "rgba(255, 255, 255, 0.30)",
            borderBottomWidth: 1,
          },
        })}
      />
      <Stack.Screen name={Screens.Map} component={MapScreen} />
    </Stack.Navigator>
  );
}

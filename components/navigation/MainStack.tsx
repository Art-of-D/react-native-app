import { createStackNavigator } from "@react-navigation/stack";
import { Screens } from "../../utils/enums/routes";
import RegistrationScreen from "../screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import { useSelector } from "react-redux";
import HomeStack from "./HomeStack";

const Stack = createStackNavigator();

export default function MainStack() {
  const currentUser = useSelector((state: any) => state.auth.currentUser);
  return (
    <Stack.Navigator
      initialRouteName={
        currentUser?.email ? Screens.HomeStack : Screens.RegistrationScreen
      }
    >
      {currentUser?.email ? (
        <Stack.Screen
          name={Screens.HomeStack}
          component={HomeStack}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <>
          <Stack.Screen
            name={Screens.RegistrationScreen}
            component={RegistrationScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={Screens.LoginScreen}
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

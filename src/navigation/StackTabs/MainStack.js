import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/** Import Main Stack Screens */
import InitialScreen from "../../screens/Initial";
import LoginScreen from "../../screens/Login";

/** Import Theme */
import { MyTheme, Styles } from "./style";

const Stack = createNativeStackNavigator();
const styles = Styles;

const MainStack = ({ TabBottom, redirect }) => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName={redirect}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Initial" component={InitialScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={TabBottom} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;

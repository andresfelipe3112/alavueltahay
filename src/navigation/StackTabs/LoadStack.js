import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/** Import Load Screen */
import LoadScreen from "../../screens/Load";

/** Import Theme */
import { MyTheme } from "./style";

const Stack = createNativeStackNavigator();

const LoadStack = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="Load">
        <Stack.Screen
          name="Load"
          component={LoadScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoadStack;

import * as React from "react";
import { Image, StyleSheet, View } from "react-native";

import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

/** Screens */
import StartStack from "./StartStack";
import ProfileStack from "./ProfileStack";
import Notifications from "../../screens/Notifications";

/** Global vars */
import GlobalVars from "../../global/globalVars";

import Styles from "./style";

const styles = Styles;

const Tab = createBottomTabNavigator();
function TabBottom() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) =>
          screenOptions(route, color, focused),
        // tabBarActiveTintColor: GlobalVars.firstColor,
        // tabBarInactiveTintColor: '#EEEEEE',
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: "flex",
            // backgroundColor: GlobalVars.firstColor,
          },
          styles.tabBarStyle,
        ],
        headerShown: false,
        // tabBarItemStyle: [
        //   {
        //     backgroundColor: 'transparent',
        //   },
        // ],i
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name="Inicio" component={StartStack} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

function screenOptions(route, color, focused) {
  let iconName, type;
  if (!focused && route.name === "Inicio") {
    return(
      <View style={styles2.container}>
           <Image
             style={styles2.stretch}
             source={require(".././../../assets/Home.png")}
           />
      </View>
    )
  } else if (focused && route.name === "Inicio" ) {
    return(
      <View style={styles2.containerFocus}>
           <Image
             style={styles2.stretchFocus}
             source={require(".././../../assets/Home.png")}
           />
      </View>
    )
  }

  if ( !focused && route.name === "Notifications" ) {
    return(
      <View style={styles2.container}>
           <Image
             style={styles2.stretch}
             source={require(".././../../assets/noti.png")}
           />
      </View>
    )
  } else if (focused && route.name === "Notifications" ) {
    return(
      <View style={styles2.containerFocus}>
           <Image
             style={styles2.stretchFocus}
             source={require(".././../../assets/noti.png")}
           />
      </View>
    )
  }

  if ( !focused && route.name === "Profile") {
    return(
      <View style={styles2.container}>
           <Image
             style={styles2.stretch}
             source={require(".././../../assets/user.png")}
           />
      </View>
    )
  } else if (focused && route.name === "Profile" ) {
    return(
      <View style={styles2.containerFocus}>
           <Image
             style={styles2.stretchFocus}
             source={require(".././../../assets/user.png")}
           />
      </View>
    )
  }

  // switch (route.name) {
  //   case "Inicio":
  //     ( <View style={styles2.container}>
  //       <Image
  //         style={styles2.stretch}
  //         source={require(".././../../assets/icon.png")}
  //       />
  //     </View>)
  //     break;
  
  //   case "Profile":
  //     iconName = "user";
  //     type = "feather";
  //     break;

  //   case "Notifications":
  //     iconName = "message-badge-outline";
  //     type = "materialcomm";
  //     break;
  // }

  if (route.name === "Inicio") {
    if (focused) {
      return (
        <View style={styles2.containerFocus}>
        <Image
          style={styles2.stretchFocus}
          source={require(".././../../assets/icon.png")}
        />
   </View>
      );
    } else {
      return (
        <MaterialCommunityIcons
          name={iconName}
          size={20}
          color={GlobalVars.blueOpaque}
        />
      );
    }
  }

  if (type === "feather") {
    if (focused) {
      return (
        <View style={styles.viewOptions}>
          <View style={styles.viewContent}>
            <Feather name={iconName} size={28} color={GlobalVars.orange} />
          </View>
        </View>
      );
    } else {
      return (
        <Feather name={iconName} size={20} color={GlobalVars.blueOpaque} />
      );
    }
  }
}

export default TabBottom;

const styles2 = StyleSheet.create({
  container: {
    width: 35,
    height: 35,
  },
  stretch: {
    width: 35,
    height: 35,
    resizeMode: "stretch",
  },
  containerFocus:{
    width: 42,
    height: 42,
  },
  stretchFocus:{
    width: 42,
    height: 42,
  }
});

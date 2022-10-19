import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UserProfile from "../../screens/UserProfile";
import EditProfile from "../../screens/EditProfile";
import EditProduct from "../../screens/EditProduct";
import MyPanoramas from "../../screens/MyPanoramas";
import EditPanorama from "../../screens/EditPanorama";
import TermsConditions from "../../screens/TermsConditions";
import AggreeShopScreen from "../../screens/AddEntrepreneur";
import MainEntrepreneur from "../../screens/MainEntrepreneur";
import EditEntrepreneur from "../../screens/EditEntrepreneur";
import EntrepreneurProducts from "../../screens/EntrepreneurProducts";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ItemUpdate" component={EditProduct} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="MyPanoramas" component={MyPanoramas} />
      <Stack.Screen name="ProfileScreen" component={UserProfile} />
      <Stack.Screen name="PanoramaUpdate" component={EditPanorama} />
      <Stack.Screen name="ShopItems" component={EntrepreneurProducts} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} />
      <Stack.Screen name="MainEntrepreneur" component={MainEntrepreneur} />
      <Stack.Screen name="EditEntrepreneur" component={EditEntrepreneur} />
      <Stack.Screen name="AggreeEntrepreneur" component={AggreeShopScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;

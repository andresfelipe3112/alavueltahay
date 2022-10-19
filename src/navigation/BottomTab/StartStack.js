import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../../screens/Home";
import PanoramasScreen from "../../screens/Panoramas";
import CategoriesScreen from "../../screens/Categories";
import Entrepreneurs from "../../screens/Entrepreneurs";
import SingleProduct from "../../screens/SingleProduct";
import SinglePanorama from "../../screens/SinglePanorama";
import ProductsScreen from "../../screens/ProductsEntrepreneur";
import SingleEntrepreneur from "../../screens/SingleEntrepreneur";

const Stack = createNativeStackNavigator();

const StartStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeFirst"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeFirst" component={HomeScreen} />
      <Stack.Screen name="Product" component={SingleProduct} />
      <Stack.Screen name="Shop" component={SingleEntrepreneur} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Panorama" component={SinglePanorama} />
      <Stack.Screen name="Panoramas" component={PanoramasScreen} />
      <Stack.Screen name="Entrepreneurs" component={Entrepreneurs} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
    </Stack.Navigator>
  );
};

export default StartStack;

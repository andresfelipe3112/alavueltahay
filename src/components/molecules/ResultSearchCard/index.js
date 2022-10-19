import * as React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import GlobalVars from "../../../global/globalVars";

/** Import Custom elements */

import Styles from "./style";
const styles = Styles;

const ResultSearchCard = ({ itemProduct, ...props }) => {

  const navigation = useNavigation();
  const { onShow } = props;
  const goToProduct = () => {
    navigation.navigate("Product", { item: itemProduct });
    onShow();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.rootContainer}
        onPress={() => goToProduct()}
      >
        <View style={styles.viewcontainer}>
          <View style={styles.leftcontent}>
            <Image
              style={styles.tinyLogo}
              resizeMode="cover"
              source={{
                uri: itemProduct?.attributes?.image?.data?.attributes?.uri,
              }}
            />
          </View>
          <View style={styles.rightcontent}>
            <View style={styles.headercard} />
            <View style={styles.contentcard}>
              <Text style={styles.nameproduct}>
                {itemProduct?.attributes?.product.length > 15 
                  ? itemProduct?.attributes?.product.slice(0, 15) + "..."
                  : itemProduct?.attributes?.product || ""}
              </Text>
              <TouchableOpacity
                style={styles.iconView}
                onPress={() => goToProduct()}
              >
               <View style={styles2.container}>
                <Image
                   style={styles2.stretch}
                   source={require("../../../../assets/chevron_right.png")}
                />
              </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ResultSearchCard;


const styles2 = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    top:10,
    right:-20
  },
  stretch: {
    width: 40,
    height: 40,
    resizeMode: "stretch",
  },
  containerFocus: {
    width: 42,
    height: 42,
  },
  stretchFocus: {
    width: 42,
    height: 42,
  },
});

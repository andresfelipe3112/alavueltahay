import React from "react";
import { View, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

import GlobalVars from "../../../global/globalVars";

import TitleComponent from "../../atoms/Titles";
import ImageUriComponent from "../../atoms/ImageUriComponent";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;

export default function ProductCard({
  item = null,
  isMyShop = false,
  ...props
}) {
  const navigation = useNavigation();

  const returnAction = () => {
    navigation.navigate("Product", { item: item });
  };

  if (!item) return <></>;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchWrap} onPress={() => returnAction()}>
        <ImageUriComponent
          radius={0}
          img={{
            uri: item?.attributes?.image?.data?.attributes?.uri,
          }}
          width="100%"
          mode="cover"
          borderTopRadius={25}
        />
        <View style={styles.content}>
          <View style={[styles.colVal]}>
            <TitleComponent
              title={
                item?.attributes?.entrepreneurship?.data?.attributes
                  ?.entrepreneurship
              }
              color={GlobalVars.textGrayColor}
              size={14}
            />
          </View>
          <View style={[styles.colVal]}>
            <TitleComponent
              title={item?.attributes?.product}
              color={GlobalVars.textGrayColor}
              size={12}
            />
          </View>
        </View>

        {!isMyShop && (
          <TouchableOpacity
            style={styles.btnItem}
            onPress={() => returnAction()}
          >
            <TitleComponent
              size={12}
              title="Solicitar"
              color={GlobalVars.whiteLight}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
}

import React from "react";
import { View, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

import GlobalVars from "../../../global/globalVars";

import truncateText from "../../../helpers/truncateText";

import ImageUriComponent from "../../atoms/ImageUriComponent";
import TitleComponent from "../../atoms/Titles";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;

export default function PanoramaCard({ item = null, ...props }) {
  const navigation = useNavigation();

  const returnAction = () => {
    navigation.navigate("Panorama", { panorama: item });
  };

  if (!item) return <></>;

  if (props.isAllPans) {
    return (
      <View style={styles.containerCardIsAll}>
        <TouchableOpacity
          style={styles.containerTouchableInAll}
          onPress={() => returnAction()}
        >
          <ImageUriComponent
            radius={0}
            mode="cover"
            img={{
              uri: item?.attributes?.image?.data?.attributes?.uri,
            }}
            width="100%"
            height={GlobalVars.windowWidth / 5}
            borderTopRadius={25}
          />
          <View style={styles.contentCardIsAll}>
            <TitleComponent
              title={truncateText(item?.attributes?.panorama, 35)}
              color={GlobalVars.textGrayColor}
              size={14}
              customStyles={{ textAlign: "left" }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={styles.containerCardIsFeatured}
      onPress={() => returnAction()}
    >
      {item?.attributes?.image && (
        <ImageUriComponent
          radius={0}
          mode="cover"
          img={{
            uri: item?.attributes?.image?.data?.attributes?.uri,
          }}
          width="100%"
          height="70%"
          borderTopRadius={25}
        />
      )}

      <View style={styles.contentCardIsFeatured}>
        <View style={styles.aditionalInfo}>
          <TitleComponent
            title={truncateText(item?.attributes?.panorama, 35)}
            color={GlobalVars.textGrayColor}
            size={14}
            customStyles={{ textAlign: "left" }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

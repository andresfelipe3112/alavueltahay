import * as React from "react";
import { View, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

import GlobalVars from "../../../global/globalVars";

import ImageUriComponent from "../../atoms/ImageUriComponent";
import TitleComponent from "../../atoms/Titles";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;

export default function CategoryCard({ item = null, ...props }) {
  const navigation = useNavigation();

  const returnAction = () => {
    navigation.navigate("Categories", { itemCat: item?.id });
  };

  if (!item) return <></>;

  if (props.isFavCats) {
    return (
      <TouchableOpacity
        style={styles.containerCardIsFav}
        onPress={() => returnAction()}
      >
        <ImageUriComponent
          radius={15}
          mode="cover"
          img={{
            uri:
              item?.imageUrl ||
              "https://rr-ids-store2.s3.amazonaws.com/icon_cam_f708183933.png",
          }}
          width="100%"
          height={GlobalVars.windowWidth / 5}
          borderTopRadius={15}
          borderBottomRadius={15}
        />
        <View style={styles.contentCardIsFav}>
          <TitleComponent
            title={item?.category}
            color={GlobalVars.textGrayColor}
            size={12}
            customStyles={{ textAlign: "center" }}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

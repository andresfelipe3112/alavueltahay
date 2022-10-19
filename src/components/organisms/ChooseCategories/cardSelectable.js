import React, { useState, useEffect } from "react";

import { TouchableOpacity } from "react-native";

import GlobalVars from "../../../global/globalVars";

import LabelTextComponent from "../../atoms/LabelText";
import ImageUriComponent from "../../atoms/ImageUriComponent";

import Styles from "./style";

const styles = Styles;

const CardSelectable = ({ currentCats = [], category = {}, ...props }) => {
  const { removeToLiked, addToLiked } = props;

  const [isIncluded, setIsIncluded] = useState(false);

  useEffect(() => {
    const isIncludenInCurrent = currentCats.includes(category?.id);
    if (isIncludenInCurrent) setIsIncluded(true);
    else {
      setIsIncluded(false);
    }
  }, [currentCats]);

  if (!category) return <></>;

  return (
    <TouchableOpacity
      key={"category_" + category?.id}
      style={!isIncluded ? styles.categoryNotSelected : styles.categorySelected}
      onPress={() =>
        isIncluded ? removeToLiked(category?.id) : addToLiked(category?.id)
      }
    >
      <ImageUriComponent
        width="100%"
        radius={15}
        mode={category?.attributes?.imageUrl ? "cover" : "center"}
        img={{
          uri:
            category?.attributes?.imageUrl ||
            "https://rr-ids-store2.s3.amazonaws.com/icon_cam_f708183933.png?updated_at=2022-06-21T20:14:37.492Z",
        }}
        borderTopRadius={15}
        borderBottomRadius={15}
      />
      <LabelTextComponent
        text={category?.attributes?.category}
        color={GlobalVars.blueOpaque}
        size={10}
      />
    </TouchableOpacity>
  );
};

export default CardSelectable;

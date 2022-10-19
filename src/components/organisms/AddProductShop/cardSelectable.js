import React, { useState, useEffect } from "react";

import { TouchableOpacity } from "react-native";

import GlobalVars from "../../../global/globalVars";

import LabelTextComponent from "../../atoms/LabelText";
import ImageUriComponent from "../../atoms/ImageUriComponent";

import Styles from "./style";

const styles = Styles;

const CardSelectable = ({ currentCat = null, category = {}, ...props }) => {
  const { setCurrentCat } = props;

  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const isSelectedCurrent = currentCat === category?.id;
    if (isSelectedCurrent) setIsSelected(true);
    else {
      setIsSelected(false);
    }
  }, [currentCat]);

  if (!category) return <></>;

  return (
    <TouchableOpacity
      key={"category_" + category?.id}
      style={!isSelected ? styles.categoryNotSelected : styles.categorySelected}
      onPress={() => setCurrentCat(category?.id)}
    >
      <ImageUriComponent
        radius={4}
        mode="cover"
        img={{
          uri:
            category?.attributes?.imageUrl ||
            "https://rr-ids-store2.s3.amazonaws.com/icon_cam_f708183933.png?updated_at=2022-06-21T20:14:37.492Z",
        }}
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

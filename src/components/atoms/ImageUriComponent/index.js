import React from "react";
import { Image } from "react-native";
import styles from "./styles";

const ImageUriComponent = ({
  width = 75,
  height = 75,
  radius = 5,
  mrTop = 0,
  mode = "contain",
  borderTopRadius = 0,
  borderBottomRadius = 0,
  img,
}) => {
  return (
    <Image
      style={[
        styles.img,
        {
          width: width,
          height: height,
          borderRadius: radius,
          marginTop: mrTop,
          borderTopLeftRadius: borderTopRadius,
          borderTopRightRadius: borderTopRadius,
          borderBottomLeftRadius: borderBottomRadius,
          borderBottomRightRadius: borderBottomRadius,
        },
      ]}
      source={img}
      resizeMode={mode}
    />
  );
};

export default ImageUriComponent;

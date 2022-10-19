import React from "react";
import { Image } from "react-native";
import styles from "./styles";

const ImageLocalComponent = ({
  width = 75,
  height = 75,
  radius = 0,
  mrTop = 0,
  mrBottom = 0,
  mode = "contain",
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
          marginBottom: mrBottom,
        },
      ]}
      source={img}
      resizeMode={mode}
    />
  );
};

export default ImageLocalComponent;

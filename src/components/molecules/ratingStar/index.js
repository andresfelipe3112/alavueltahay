import React from "react";
import { View, TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import Styles from "./style";
import GlobalVars from "../../../global/globalVars";

const styles = Styles;

const CustomRatingBar = (props) => {
  const { isSmall } = props;

  if (isSmall) {
    return (
      <View style={styles.customRatingBarStyle}>
        {props.maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              style={styles.starItem}
              activeOpacity={0.7}
              key={"star_rating_" + key}
              onPress={() => (props.setRating ? props.setRating(item) : null)}
            >
              {item <= props.defaultRating && (
                <AntDesign name="star" size={12} color={GlobalVars.orange} />
              )}
              {item > props.defaultRating && (
                <AntDesign name="staro" size={12} color={GlobalVars.orange} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <View style={styles.customRatingBarStyle}>
      {props.maxRating.map((item, key) => {
        return (
          <TouchableOpacity
            style={styles.starItem}
            activeOpacity={0.7}
            key={"star_rating_" + key}
            onPress={() => (props.setRating ? props.setRating(item) : null)}
          >
            {item <= props.defaultRating && (
              <AntDesign name="star" size={20} color={GlobalVars.orange} />
            )}
            {item > props.defaultRating && (
              <AntDesign name="staro" size={20} color={GlobalVars.orange} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomRatingBar;

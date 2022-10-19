import React from "react";
import { TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

import LabelTextComponent from "../../atoms/LabelText";

import styles from "./style";
import GlobalVars from "../../../global/globalVars";

const Notification = ({ item, aditionalStyle, goAction, ...props }) => {
  const deleteNotification = () => {
    if (props.onDelete) {
      props.onDelete(item?.id);
    }
  };

  if (!item) return <></>;

  return (
    <TouchableOpacity
      onPress={() => (goAction ? goAction() : null)}
      style={[styles.touchableItem, aditionalStyle || null]}
    >
      <Feather
        size={20}
        name="trash-2"
        color={GlobalVars.orange}
        style={styles.iconOptionStyle}
        onPress={() => deleteNotification()}
      />
      <LabelTextComponent
        text={item?.attributes?.Message}
        color={GlobalVars.firstColor}
        size={14}
      />
      <Feather
        size={20}
        name="bell"
        style={styles.iconstyle}
        color={GlobalVars.orange}
        onPress={() => null}
      />
    </TouchableOpacity>
  );
};

export default Notification;

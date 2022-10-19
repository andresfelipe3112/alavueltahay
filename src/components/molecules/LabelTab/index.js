import React from "react";
import { View, TouchableOpacity } from "react-native";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Components */
import LabelTextComponent from "../../atoms/LabelText";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;
const LabelTab = ({ label, id = null, selected = null, ...props }) => {
  const returnAction = (value) => {
    if (props.returnAction) {
      props.returnAction(value);
    }
  };

  if (!id) return null;

  return (
    <View
      style={[
        styles.rootView,
        {
          borderBottomColor: props.border ? GlobalVars.orange : "transparent",
          borderBottomWidth: props.border ? 2 : 0,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.pressable}
        onPress={() => returnAction(id)}
      >
        <LabelTextComponent
          text={label}
          color={id === selected ? GlobalVars.orange : GlobalVars.textGrayColor}
          size={15}
        />
      </TouchableOpacity>
    </View>
  );
};

export default LabelTab;

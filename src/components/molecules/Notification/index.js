import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
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
    <>
    
    <TouchableOpacity
      onPress={() => (goAction ? goAction() : null)}
      style={[styles.touchableItem, aditionalStyle || null]}
      >
            <TouchableOpacity        onPress={() => deleteNotification()} style={styles2.containerFocus}>
              <Image
                style={styles2.stretchFocus}
                source={require("../../../../assets/delete.png")}
         
                />
            </TouchableOpacity>
      <LabelTextComponent
        text={item?.attributes?.Message}
        color={GlobalVars.firstColor}
        size={14}
        />
 
          <View style={styles2.container}>
              <Image
                style={styles2.stretch}
                source={require("../../../../assets/noti.png")}
                />
            </View>
    </TouchableOpacity>

                </>
  );
};
export default Notification;


const styles2 = StyleSheet.create({
  container: {
    width:25,
    height:25,
    left:-70
  },
  stretch: {
    width: 25,
    height: 25,
    resizeMode: "stretch",
    left: 90,
  },
  containerFocus:{
    width: 25,
    height: 25,
    left:-40
  },
  stretchFocus:{
    width: 25,
    height: 25,
  }
});




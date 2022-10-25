import React, { useState, useEffect } from "react";

import { View, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from "react-native";

import { Entypo } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import GlobalVars from "../../../global/globalVars";

import dataNotification from "../../../helpers/dataNotification";

import LabelTextComponent from "../../atoms/LabelText";
import ButtonComponent from "../../atoms/ButtonComponent";

import Styles from "./style";

const styles = Styles;

const PickerDropNotification = (props) => {
  const { onClose, id, getRandomNumberDispatch } = props;

  const navigation = useNavigation();

  const [errMsg, setErrMsg] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const dropProcess = async () => {
    try {
      setLoading(true);
      const { _jwt } = props;
      if (id && _jwt) {
        const res = await dataNotification.deleteNotification(id, _jwt);
        if (res) {
          setLoading(false);
          getRandomNumberDispatch();
          onClose();
          return;
        } else {
          setErrMsg("Un error ha ocurrido");
          setShowErr(true);
          setLoading(false);
          setTimeout(() => {
            setShowErr(false);
          }, 1200);
        }
      } else {
        setErrMsg("Un error ha ocurrido");
        setShowErr(true);
        setLoading(false);
        setTimeout(() => {
          setShowErr(false);
        }, 1200);
      }
    } catch (e) {
      setErrMsg("Un error ha ocurrido");
      setShowErr(true);
      setLoading(false);
      setTimeout(() => {
        setShowErr(false);
      }, 1200);
    }
  };

  return (
    <View style={styles.view}>
      <LabelTextComponent
        text="¿Eliminar Notificación?"
        color={GlobalVars.textGrayColor}
        size={20}
      />

      {loading && <ActivityIndicator color={GlobalVars.orange} size="large" />}

      {showErr && errMsg && (
        <TouchableOpacity onPress={() => setShowErr(false)}>
          <LabelTextComponent
            text={errMsg}
            color={GlobalVars.googleColor}
            size={13}
          />
        </TouchableOpacity>
      )}

      {!loading && (
        <ButtonComponent
          text="Cancelar"
          color={GlobalVars.orange}
          textColor={GlobalVars.white}
          Action={() => onClose()}
        />
      )}

      {!loading && id && (
        <ButtonComponent
          text="Eliminar"
          color={GlobalVars.orange}
          textColor={GlobalVars.white}
          Action={() => dropProcess()}
        />
      )}

      <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
      <View style={styles2.container}>
              <Image
                style={styles2.stretch}
                source={require("../../../../assets/close-orange.png")}
                />
            </View>
      </TouchableOpacity>
    </View>
  );
};

export default PickerDropNotification;


const styles2 = StyleSheet.create({
  container: {
    width:40,
    height:40,
  },
  stretch: {
    width: 40,
    height: 40,
    resizeMode: "stretch",
  },
});
import React, { useState, useEffect } from "react";

import { View, TouchableOpacity, ActivityIndicator } from "react-native";

import { Entypo } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import GlobalVars from "../../../global/globalVars";

import dataProduct from "../../../helpers/dataProduct";

import LabelTextComponent from "../../atoms/LabelText";
import ButtonComponent from "../../atoms/ButtonComponent";

import Styles from "./style";

const styles = Styles;

const PickerDropProduct = (props) => {
  const { onClose, id } = props;

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
        const res = await dataProduct.deleteProduct(id, _jwt);
        if (res) {
          setLoading(false);
          navigation.goBack();
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
        text="¿Eliminar Producto?"
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
        <Entypo
          name="circle-with-cross"
          size={24}
          color={GlobalVars.blueOpaque}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PickerDropProduct;

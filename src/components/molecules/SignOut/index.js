import React from "react";
import { TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";

import GlobalVars from "../../../global/globalVars";

import useFirebase from "../../../utils/useFirebase";

import Styles from "./style";

const style = Styles;

const SignOut = (props) => {
  const navigation = useNavigation();

  const onHandle = () => {
    useFirebase.SignedOut(navigation);
  };

  return (
    <TouchableOpacity onPress={onHandle} style={style.btn}>
      <AntDesign name="poweroff" size={24} color={GlobalVars.googleColor} />
    </TouchableOpacity>
  );
};

export default SignOut;

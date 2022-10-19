import React, { useState, useEffect } from "react";

import { View, TouchableOpacity, ActivityIndicator, Image, StyleSheet } from "react-native";

import { Entypo } from "@expo/vector-icons";

import GlobalVars from "../../../global/globalVars";

import { GET_AVATARES } from "../../../mock/avatares";

import updateDataUser from "../../../helpers/updateDataUser";

import LabelTextComponent from "../../atoms/LabelText";
import ButtonComponent from "../../atoms/ButtonComponent";
import ImageUriComponent from "../../atoms/ImageUriComponent";
import ScrollView from "../../templates/ScrollView";

import Styles from "./style";

const styles = Styles;

const PickerAvatar = ({
  isUserUpdate = false,
  _jwt = null,
  user = null,
  ...props
}) => {
  const { onClose, avatarSelected, setAvatarSelected } = props;

  const [errMsg, setErrMsg] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const [avatares, setAvatares] = useState([]);

  useEffect(() => {
    // Data in CMS
    onRecoverAvatars();
  }, []);

  const onRecoverAvatars = async () => {
    const res = await GET_AVATARES();
    setAvatares(res);
  };

  const saveAvatar = async (param) => {
    await setLoading(true);
    try {
      switch (param) {
        case 1:
          const dataSend = {
            id: user?.id,
            avatar: avatarSelected,
          };
          const res = await updateDataUser.userAvatar(dataSend, _jwt);
          if (res) {
            setLoading(false);
            onClose();
          } else {
            setLoading(false);
            setErrMsg("No se puedo actualizar su avatar.");
            setShowErr(true);
            setTimeout(() => {
              setShowErr(false);
            }, 1200);
          }

          break;
      }
    } catch (e) {
      setLoading(false);
      setErrMsg("No se puedo actualizar su avatar.");
      setShowErr(true);
      setTimeout(() => {
        setShowErr(false);
      }, 1200);
    }
  };

  const optionAvatares = (avatares.length &&
    avatares.map((avatar) => {
      return (
        <TouchableOpacity
          key={"avatar_" + avatar?.id}
          style={[
            styles.avatarView,
            {
              borderWidth: avatarSelected === avatar?.id ? 1 : 0,
              borderColor: GlobalVars.blueOpaque,
              paddingVertical: avatarSelected === avatar?.id ? 5 : 0,
            },
          ]}
          onPress={() => setAvatarSelected(avatar?.id)}
        >
          <ImageUriComponent
            width={avatarSelected ? "90%" : "100%"}
            height={avatarSelected === avatar?.id ? 40 : 50}
            img={{ uri: avatar?.attributes?.uriAvatar }}
            mode="contain"
            borderTopRadius={25}
            borderBottomRadius={25}
          />
        </TouchableOpacity>
      );
    })) || <></>;

  return (
    <View style={styles.view}>
      {loading && <ActivityIndicator color={GlobalVars.orange} size="large" />}
      {!loading && (
        <>
          <LabelTextComponent
            text="Selecciona tu avatar"
            color={GlobalVars.blueOpaque}
            size={15}
          />

          {showErr && (
            <LabelTextComponent
              text={errMsg}
              color={GlobalVars.googleColor}
              size={10}
            />
          )}
          <View style={styles.containerScroll}>
            <ScrollView
              style={styles.scrolling}
              contentContainerStyle={styles.wrapScrollView}
              colorScrollBar={GlobalVars.orange}
            >
              <View style={styles.gridCats}>{optionAvatares}</View>
            </ScrollView>
          </View>

          {showErr && errMsg && (
            <TouchableOpacity onPress={() => setShowErr(false)}>
              <LabelTextComponent
                text={errMsg}
                color={GlobalVars.googleColor}
                size={13}
              />
            </TouchableOpacity>
          )}

          {avatarSelected && (
            <ButtonComponent
              text="Guardar"
              color={GlobalVars.orange}
              textColor={GlobalVars.white}
              Action={() => (isUserUpdate ? saveAvatar(1) : null)}
            />
          )}

          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
          <View style={styles2.container}>
              <Image
                style={styles2.stretch}
                source={require("../../../../assets/close-orange.png")}
              />
            </View>
            {/* <Entypo
              name="circle-with-cross"
              size={24}
              color={GlobalVars.blueOpaque}
            /> */}
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default PickerAvatar;


const styles2 = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    top:-10
  },
  stretch: {
    width: 40,
    height: 40,
    resizeMode: "stretch",
  },
  containerFocus: {
    width: 42,
    height: 42,
  },
  stretchFocus: {
    width: 42,
    height: 42,
  },
});
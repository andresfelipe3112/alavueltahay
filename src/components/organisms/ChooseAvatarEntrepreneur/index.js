import React, { useState, useEffect } from "react";

import { View, TouchableOpacity, ActivityIndicator } from "react-native";

import { Entypo } from "@expo/vector-icons";

import GlobalVars from "../../../global/globalVars";

import { GET_AVATARES } from "../../../mock/avatares";

import updateDataEntrepreneur from "../../../helpers/updateDataEntrepreneur";

import LabelTextComponent from "../../atoms/LabelText";
import ButtonComponent from "../../atoms/ButtonComponent";
import ImageUriComponent from "../../atoms/ImageUriComponent";
import PickerImage from "../ChooseImageEntrepreneur";
import ScrollView from "../../templates/ScrollView";
import ModalTemplate from "../../templates/ModalTemplate";

import Styles from "./style";
import { Cancel } from "../../molecules/cancel";

const styles = Styles;

const PickerAvatar = ({
  isEntrepreneurUpdate = false,
  _jwt = null,
  entrepreneur = null,
  getRandomNumberDispatch,
  ...props
}) => {
  const {
    onClose,
    avatarSelected,
    setAvatarSelected,
    imageEntrepreneur,
    setImageEntrepreneur,
    isOpenPhoto,
    showChangePhoto,
  } = props;

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
            id: entrepreneur?.id,
            avatar: avatarSelected,
          };
          const res = await updateDataEntrepreneur.entrepreneurAvatar(
            dataSend,
            _jwt
          );
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
            text="Selecciona tu logo"
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
          <View
            style={[
              styles.containerScroll,
              { height: GlobalVars.windowHeight / 3 },
            ]}
          >
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

          <ButtonComponent
            text="Subir foto"
            color={GlobalVars.orange}
            textColor={GlobalVars.white}
            Action={() => showChangePhoto()}
          />

          {avatarSelected && (
            <ButtonComponent
              text="Guardar"
              color={GlobalVars.orange}
              textColor={GlobalVars.white}
              Action={() => (isEntrepreneurUpdate ? saveAvatar(1) : null)}
            />
          )}

          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
          <Cancel/>
          </TouchableOpacity>
        </>
      )}

      <ModalTemplate
        openModal={isOpenPhoto}
        onHelp={() => null}
        aditionalStyleModal={{
          justifyContent: "center",
          alignItems: "center",
        }}
        aditionalStyleContainer={{
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <PickerImage
          imageShop={imageEntrepreneur}
          onClose={() => showChangePhoto()}
          handleImg={setImageEntrepreneur}
          _jwt={_jwt}
          entrepreneur={entrepreneur}
          getRandomNumberDispatch={getRandomNumberDispatch}
          onCloseAllPhoto={onClose}
          isEntrepreneurUpdate
        />
      </ModalTemplate>
    </View>
  );
};

export default PickerAvatar;

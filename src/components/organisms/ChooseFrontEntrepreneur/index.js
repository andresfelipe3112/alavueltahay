import React, { useState, useEffect } from "react";

import { View, TouchableOpacity, ActivityIndicator } from "react-native";

import { Entypo } from "@expo/vector-icons";

import GlobalVars from "../../../global/globalVars";

import { GET_FRONTS } from "../../../mock/fronts";

import updateDataEntrepreneur from "../../../helpers/updateDataEntrepreneur";

import LabelTextComponent from "../../atoms/LabelText";
import ButtonComponent from "../../atoms/ButtonComponent";
import ImageUriComponent from "../../atoms/ImageUriComponent";
import PickerImageFront from "../ChooseImageFrontEntrepreneur";
import ScrollView from "../../templates/ScrollView";
import ModalTemplate from "../../templates/ModalTemplate";

import Styles from "./style";
import { Cancel } from "../../molecules/cancel";

const styles = Styles;

const PickerFront = ({
  isEntrepreneurUpdate = false,
  _jwt = null,
  entrepreneur = null,
  getRandomNumberDispatch,
  ...props
}) => {
  const {
    onClose,
    frontSelected,
    setFrontSelected,
    isOpenPhotoFront,
    showChangePhotoFront,
    frontEntrepreneur,
    setFrontEntrepreneur,
  } = props;

  const [errMsg, setErrMsg] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fronts, setFronts] = useState([]);

  useEffect(() => {
    // Data in CMS
    onRecoverFronts();
  }, []);

  const onRecoverFronts = async () => {
    const res = await GET_FRONTS();
    setFronts(res);
  };

  const saveFront = async (param) => {
    await setLoading(true);
    try {
      switch (param) {
        case 1:
          const dataSend = {
            id: entrepreneur?.id,
            frontImageGallery: frontSelected,
          };
          const res = await updateDataEntrepreneur.entrepreneurFront(
            dataSend,
            _jwt
          );
          if (res) {
            setLoading(false);
            onClose();
          } else {
            setLoading(false);
            setErrMsg("No se puedo actualizar su portada.");
            setShowErr(true);
            setTimeout(() => {
              setShowErr(false);
            }, 1200);
          }

          break;
      }
    } catch (e) {
      setLoading(false);
      setErrMsg("No se puedo actualizar su portada.");
      setShowErr(true);
      setTimeout(() => {
        setShowErr(false);
      }, 1200);
    }
  };

  const optionFronts = (fronts.length &&
    fronts.map((front) => {
      return (
        <TouchableOpacity
          key={"avatar_" + front?.id}
          style={[
            styles.avatarView,
            {
              borderWidth:
                frontSelected === front?.attributes?.uriImage ? 1 : 0,
              borderColor: GlobalVars.orange,
              paddingVertical:
                frontSelected === front?.attributes?.uriImage ? 5 : 0,
            },
          ]}
          onPress={() => setFrontSelected(front?.attributes?.uriImage)}
        >
          <ImageUriComponent
            width={frontSelected ? "90%" : "100%"}
            height={frontSelected === front?.attributes?.uriImage ? 40 : 50}
            img={{ uri: front?.attributes?.uriImage }}
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
            text="Selecciona tu portada"
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
              <View style={styles.gridCats}>{optionFronts}</View>
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
            Action={() => showChangePhotoFront()}
          />

          {frontSelected && (
            <ButtonComponent
              text="Guardar"
              color={GlobalVars.orange}
              textColor={GlobalVars.white}
              Action={() => (isEntrepreneurUpdate ? saveFront(1) : null)}
            />
          )}

          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
          <Cancel/>
          </TouchableOpacity>
        </>
      )}

      <ModalTemplate
        openModal={isOpenPhotoFront}
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
        <PickerImageFront
          imageShop={frontEntrepreneur}
          onClose={() => showChangePhotoFront()}
          handleImg={setFrontEntrepreneur}
          _jwt={_jwt}
          entrepreneur={entrepreneur}
          getRandomNumberDispatch={getRandomNumberDispatch}
          onClosePickerAll={onClose}
          isEntrepreneurUpdate
        />
      </ModalTemplate>
    </View>
  );
};

export default PickerFront;

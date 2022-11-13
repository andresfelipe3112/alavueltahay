import React, { useState, useEffect } from "react";

import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";

import { Entypo } from "@expo/vector-icons";

import GlobalVars from "../../../global/globalVars";

import { GET_CATEGORIES } from "../../../mock/categories";

import updateDataEntrepreneur from "../../../helpers/updateDataEntrepreneur";

import CardSelectable from "./cardSelectable";
import LabelTextComponent from "../../atoms/LabelText";
import ButtonComponent from "../../atoms/ButtonComponent";
import ScrollView from "../../templates/ScrollView";

import Styles from "./style";
import { Cancel } from "../../molecules/cancel";

const styles = Styles;

const PickerCategories = ({
  isEntrepreneurUpdate = false,
  _jwt = null,
  entrepreneur = null,
  ...props
}) => {
  const { onClose, selectCat, setCategorySelected } = props;

  const [errMsg, setErrMsg] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);

  const [currentCat, setCurrentCat] = useState(selectCat);

  useEffect(() => {
    // Data in CMS
    onRecoverCategories();
  }, []);

  const onRecoverCategories = async () => {
    const res = await GET_CATEGORIES();
    setCategories(res);
  };

  const saveCats = async (param) => {
    await setLoading(true);
    try {
      switch (param) {
        case 1:
          const dataSend = {
            id: entrepreneur?.id,
            category: currentCat,
          };
          const res = await updateDataEntrepreneur.entrepreneurCategory(
            dataSend,
            _jwt
          );
          if (res) {
            setCategorySelected(currentCat);
            setLoading(false);
            onClose();
          } else {
            setLoading(false);
            setErrMsg("No se puedo actualizar el rubro.");
            setShowErr(true);
            setTimeout(() => {
              setShowErr(false);
            }, 1200);
          }
          break;
        case 2:
          break;
      }
    } catch (e) {
      setLoading(false);
      setErrMsg("No se puedo actualizar el rubro.");
      setShowErr(true);
      setTimeout(() => {
        setShowErr(false);
      }, 1200);
    }
  };

  const optionsCategories = (categories.length &&
    categories.map((category) => {
      return (
        <CardSelectable
          key={"category_" + category?.id}
          category={category}
          setCurrentCat={setCurrentCat}
          currentCat={currentCat}
        />
      );
    })) || <></>;

  return (
    <View style={styles.view}>
      {loading || !currentCat ? (
        <ActivityIndicator color={GlobalVars.orange} size="large" />
      ) : (
        <></>
      )}
      {!loading && currentCat && (
        <>
          {Dimensions.get("screen").height < 550 ? (
            <LabelTextComponent
              style={{
                top: Platform.OS === "ios" ? -10 : 7,
                alignSelf: "center",
                left: -5,
              }}
              text="Selecciona Rubro"
              color={GlobalVars.blueOpaque}
              size={20}
            />
          ) : (
            <LabelTextComponent
              style={{
                top:
                  Platform.OS === "ios"
                    ? Dimensions.get("screen").height < 750
                      ? 10
                      : -10
                    : -5,
                alignSelf: "center",
                left: -5,
              }}
              text="Selecciona Rubro"
              color={GlobalVars.blueOpaque}
              size={20}
            />
          )}

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
              <TouchableOpacity style={styles.gridCats} activeOpacity={1}>
                {optionsCategories}
              </TouchableOpacity>
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

          {currentCat && (
            <ButtonComponent
              text="Guardar"
              color={GlobalVars.orange}
              textColor={GlobalVars.white}
              Action={() => (isEntrepreneurUpdate ? saveCats(1) : saveCats(2))}
            />
          )}

          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Cancel />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default PickerCategories;

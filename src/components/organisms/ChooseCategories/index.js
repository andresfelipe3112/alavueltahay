import React, { useState, useEffect } from "react";

import { View, TouchableOpacity, ActivityIndicator, Image, StyleSheet } from "react-native";

import { Entypo } from "@expo/vector-icons";

import GlobalVars from "../../../global/globalVars";

import { GET_CATEGORIES } from "../../../mock/categories";

import updateDataUser from "../../../helpers/updateDataUser";

import CardSelectable from "./cardSelectable";
import LabelTextComponent from "../../atoms/LabelText";
import ButtonComponent from "../../atoms/ButtonComponent";
import ScrollView from "../../templates/ScrollView";

import Styles from "./style";

const styles = Styles;

const PickerCategories = ({
  isUserUpdate = false,
  _jwt = null,
  user = null,
  ...props
}) => {
  const { onClose, likedCats, setLikedCats } = props;

  const [errMsg, setErrMsg] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);

  const [currentCats, setCurrentCats] = useState(likedCats);

  useEffect(() => {
    // Data in CMS
    onRecoverCategories();
  }, []);

  const onRecoverCategories = async () => {
    setLoading(true);
    const res = await GET_CATEGORIES();
    setCategories(res);
    setLoading(false);
  };

  const addToLiked = async (key) => {
    // setLoading(true);
    const isIncluded = currentCats.includes(key);
    if (!isIncluded) {
      const arrTmp = currentCats;
      arrTmp.push(key);
      await setCurrentCats(arrTmp);
    }

    const cats = categories;
    setCategories([]);
    setCategories(cats);
    // setLoading(false);
  };

  const removeToLiked = async (key) => {
    // setLoading(true);
    const isIncluded = currentCats.includes(key);
    if (isIncluded) {
      const arrTmp = currentCats;
      const indexToRemove = arrTmp.indexOf(key);
      if (indexToRemove > -1) {
        arrTmp.splice(indexToRemove, 1);
      }
      await setCurrentCats(arrTmp);
    }

    const cats = categories;
    setCategories([]);
    setCategories(cats);
    // setLoading(false);
  };

  const saveCats = async (param) => {
    await setLoading(true);
    try {
      switch (param) {
        case 1:
          const dataSend = {
            id: user?.id,
            likedCats: currentCats,
          };
          const res = await updateDataUser.userLikedCats(dataSend, _jwt);
          if (res) {
            setLikedCats(currentCats);
            setLoading(false);
            onClose();
          } else {
            setLoading(false);
            setErrMsg("No se puedo actualizar sus intereses.");
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
      setErrMsg("No se puedo actualizar sus intereses.");
      setShowErr(true);
      setTimeout(() => {
        setShowErr(false);
      }, 1200);
    }
  };

  const optionsCategories = (categories?.length &&
    categories.map((category) => {
      return (
        <CardSelectable
          key={"category_" + category?.id}
          category={category}
          addToLiked={addToLiked}
          removeToLiked={removeToLiked}
          currentCats={currentCats}
        />
      );
    })) || <></>;

  return (
    <View style={styles.view}>
      {loading ? (
        <ActivityIndicator color={GlobalVars.orange} size="large" />
      ) : (
        <></>
      )}
      {!loading ? (
        <>
          <LabelTextComponent
            text="Tus intereses"
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
              <TouchableOpacity style={styles.gridCats} activeOpacity={1}>
                {optionsCategories}
              </TouchableOpacity>
            </ScrollView>
          </View>

          {showErr && errMsg ? (
            <TouchableOpacity onPress={() => setShowErr(false)}>
              <LabelTextComponent
                text={errMsg}
                color={GlobalVars.googleColor}
                size={13}
              />
            </TouchableOpacity>
          ) : null}

          {!loading && (
            <ButtonComponent
              text="Guardar"
              color={GlobalVars.orange}
              textColor={GlobalVars.white}
              Action={() => (isUserUpdate ? saveCats(1) : saveCats(2))}
            />
          )}

          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
          <View style={[styles2.container, {top:-8}]}>
              <Image
                style={styles2.stretch}
                source={require("../../../../assets/close-orange.png")}
              />
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

export default PickerCategories;

const styles2 = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
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

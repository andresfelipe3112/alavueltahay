import React, { useEffect, useState, useCallback, useContext } from "react";
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  BackHandler,
  ImageBackground,
  StyleSheet,
  Image,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import { useFocusEffect } from "@react-navigation/native";

import GlobalVars from "../../global/globalVars";

import { GET_ALLS_MY_PANORAMAS } from "../../mock/panoramasByUser";

import StoreContext from "../../helpers/globalStates";
import truncateText from "../../helpers/truncateText";

import useModal from "../../utils/useModal";

/** Import Componentes Custom */
import StatusBarComponent from "../../components/atoms/StatusBar";
import LabelTextComponent from "../../components/atoms/LabelText";
import ImageUriComponent from "../../components/atoms/ImageUriComponent";
import Header from "../../components/organisms/Header";
import PickerAddPanorama from "../../components/organisms/AddPanorama";
import ScrollView from "../../components/templates/ScrollView";
import WrappingViews from "../../components/templates/WrappingViews";
import ModalAlert from "../../components/templates/ModalAlert";
import ModalTemplate from "../../components/templates/ModalTemplate";

/** Styles */
import Styles from "./style";

const styles = Styles;

const MyPanoramasScreen = ({ navigation }) => {
  const { _jwt } = useContext(StoreContext.SecurityContext);
  const { user } = useContext(StoreContext.UserContext);

  const { isShowing: isOpenAddPanorama, toggle: showCreatePanorama } =
    useModal();
  const { isShowing: isShowingAlert, toggle: setShowhingAlert } = useModal();

  const [ToRandomDispatch, setToRandomDispatch] = useState(null);

  const [panoramas, setPanoramas] = useState([]);
  const [countPanoramas, setCountPanoramas] = useState(0);
  const [textAlert, setTextAlert] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getDataUser();
    }
    return () => {
      isMounted = false;
    };
  }, [ToRandomDispatch]);

  useFocusEffect(
    useCallback(() => {
      /** Backhandler process Android -> back button */
      BackHandlerProcess();

      /** Recover data user */
      getDataUser();

      getRandomNumberDispatch();
    }, [])
  );

  const getRandomNumberDispatch = () => {
    // random vals process for generate token for wish
    const attrTemp = Math.random();
    setToRandomDispatch(attrTemp);
  };

  const BackHandlerProcess = () => {
    /** Android no return Login */
    const backAction = () => {
      navigation.goBack();
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  };

  const getDataUser = async () => {
    setLoading(true);
    const res = await GET_ALLS_MY_PANORAMAS(user?.id, _jwt);

    if (res) {
      setPanoramas(res);
      setCountPanoramas(res.length);
    }
    setLoading(false);
  };

  const PanoramasRender = (panoramas.length &&
    panoramas.map((panorama, i) => {
      return (
        <TouchableOpacity
          key={`item_panorama_${i}`}
          style={styles.viewItem}
          onPress={() =>
            navigation.navigate("PanoramaUpdate", { panorama: panorama })
          }
        >
          <ImageUriComponent
            img={{ uri: panorama?.attributes?.image?.data?.attributes?.uri }}
            width={50}
            height={50}
            mode="cover"
            radius={75}
            borderTopRadius={75}
            borderBottomRadius={75}
          />
          <LabelTextComponent
            text={truncateText(panorama?.attributes?.panorama, 22)}
            color={GlobalVars.whiteLight}
            size={15}
          />
          <View style={[styles2.container]}>
            <Image
              style={styles2.stretch}
              source={require("../../../assets/chevron_right_white.png")}
            />
          </View>
        </TouchableOpacity>
      );
    })) || <></>;

  return (
    <WrappingViews>
      <StatusBarComponent />
      <Header
        navigation={navigation}
        user={user}
        _jwt={_jwt}
        title="Gestionar panoramas"
        ToRandomDispatch={ToRandomDispatch}
        isJustTitle
      />

      <ImageBackground
        source={require("../../../assets/images/trama_bg.png")}
        resizeMode="cover"
        style={styles.bgView}
      >
        <ScrollView
          style={styles.scrolling}
          contentContainerStyle={styles.wrapScrollView}
          colorScrollBar={GlobalVars.orange}
        >
          <View style={styles.viewContainer}>
            {!loading && (
              <View
                style={[
                  styles.tagProfile,
                  { flexDirection: "row", justifyContent: "space-between" },
                ]}
              >
                <LabelTextComponent
                  size={16}
                  color={GlobalVars.white}
                  text={`Mis panoramas`}
                />

                <LabelTextComponent
                  size={16}
                  color={GlobalVars.white}
                  text={`Total: ${countPanoramas}`}
                />
                {/* <LabelTextComponent
                  size={16}
                  color={GlobalVars.white}
                  text={`Tienes un total de ${countPanoramas} ${
                    countPanoramas !== 1 ? "panoramas" : "panorama"
                  } registrados`}
                /> */}
                {/* <View style={styles.subray} /> */}
              </View>
            )}

            {loading && (
              <ActivityIndicator
                animating={true}
                color={GlobalVars.white}
                size="large"
                style={styles.spinner}
              />
            )}

            {(!loading && panoramas.length && PanoramasRender) || null}
          </View>
        </ScrollView>
      </ImageBackground>

      <TouchableOpacity
        style={styles.floatBtn}
        onPress={() => showCreatePanorama()}
      >
        <View style={[styles2.container]}>
            <Image
              style={styles2.stretch}
              source={require("../../../assets/plus_white.png")}
            />
          </View>
      </TouchableOpacity>

      <ModalAlert
        text={textAlert}
        openModal={isShowingAlert}
        onHelp={() => setShowhingAlert(!isShowingAlert)}
      />

      <ModalTemplate
        openModal={isOpenAddPanorama}
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
        isModalNB
      >
        <PickerAddPanorama
          onClose={() => showCreatePanorama()}
          _jwt={_jwt}
          user={user}
          getRandomNumberDispatch={getRandomNumberDispatch}
          isPanoramaCreate
        />
      </ModalTemplate>
    </WrappingViews>
  );
};

export default MyPanoramasScreen;


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

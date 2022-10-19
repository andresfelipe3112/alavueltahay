import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
} from "react-native";
import { Modal } from "native-base";

import Checkbox from "expo-checkbox";

import { AntDesign } from "@expo/vector-icons";

import Swiper from "react-native-swiper";

import GlobalVars from "../../../global/globalVars";

import LabelTextComponent from "../../atoms/LabelText";
import LabelTouchable from "../../molecules/LabelTouchable";
import ScrollView from "../../templates/ScrollView";
import ModalAlert from "../../templates/ModalAlert";

import Styles from "./style";

const styles = Styles;

const ModalTermsConditions = ({ onBoardCurrent, ...props }) => {
  const [visible, onShow] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const [textAlert, setTextAlert] = React.useState("");
  const [isShowingAlert, setShowhingAlert] = React.useState(false);

  const [valueAccept, setValueAccept] = React.useState(true);

  React.useEffect(() => {
    /** GET DATA */
  }, []);

  React.useEffect(() => {
    if (onBoardCurrent === 10) {
      // deleteP();
      onShow(true);
    }
  }, [onBoardCurrent]);

  const setNextProcess = async () => {
    if (!valueAccept) {
      setTextAlert("Debes aceptar los términos y condiciones para continuar.");
      setShowhingAlert(true);

      setTimeout(() => {
        setShowhingAlert(false);
      }, 1500);
    } else {
      props.setAcceptTerms(true);
      props.setOnBoardCurrent(1);
    }
  };

  const setPrevProcess = async () => {
    onShow(false);
    props.setOnBoardCurrent(0);
  };

  if (!visible) return null;

  return (
    <Modal isOpen={visible} onClose={() => onShow(false)}>
      <ImageBackground
        source={require("../../../../assets/images/trama_bg.png")}
        resizeMode="cover"
        style={styles.bgView}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.container}>
              <Swiper
                key={1}
                index={0}
                loop={false}
                style={styles.wrapper}
                showsPagination={false}
                loadMinimalLoader={
                  <ActivityIndicator color={GlobalVars.white} size="large" />
                }
                // showsButtons
                // buttonWrapperStyle={styles.btnWrapperStyle}
                // nextButton={NextButton()}
                prevButton={<View style={{ display: "none" }} />}
                pagingEnabled
                bounces
                onIndexChanged={(index) => {
                  setCurrentSlide(index);
                }}
              >
                <View key={0} style={styles.itemContent}>
                  <View
                    style={[
                      styles.content,
                      styles.shadowSet,
                      { paddingHorizontal: 5 },
                    ]}
                  >
                    <ScrollView
                      style={styles.viewScroll}
                      contentContainerStyle={[
                        styles.contentContainer,
                        {
                          paddingBottom: 25,
                        },
                      ]}
                      colorScrollBar={GlobalVars.white}
                    >
                      <LabelTextComponent
                        color={GlobalVars.whiteLight}
                        size={14}
                        text={GlobalVars.termConditions}
                        customStyleBtn={{ textAlign: "justify" }}
                      />
                    </ScrollView>
                  </View>
                </View>
              </Swiper>

              {currentSlide === 0 && (
                <TouchableOpacity
                  style={[
                    styles.btnNext,
                    styles.shadowSet,
                    {
                      position: "absolute",
                      bottom: GlobalVars.windowHeight < 725 ? "0%" : "5%",
                      left: 40,
                    },
                  ]}
                  onPress={setNextProcess}
                >
                  <LabelTextComponent
                    text={"Continuar"}
                    color={GlobalVars.white}
                    size={16}
                  />
                </TouchableOpacity>
              )}

              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  bottom: GlobalVars.windowHeight < 725 ? "12.5%" : "17.5%",
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => setValueAccept(!valueAccept)}
                >
                  <Checkbox
                    style={styles.checkbox}
                    value={valueAccept}
                    onValueChange={() => setValueAccept(!valueAccept)}
                    color={
                      valueAccept
                        ? GlobalVars.firstColor
                        : GlobalVars.firstColor
                    }
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      marginLeft: 20,
                      color: GlobalVars.firstColor,
                      fontFamily: GlobalVars.fontFamily,
                    }}
                  >
                    Aceptar términos y condiciones
                  </Text>
                </TouchableOpacity>
              </View>

                <TouchableOpacity
                  style={styles2.container}
                  onPress={() => setPrevProcess()}
                >
                  {/* <Entypo name="chevron-left" size={size} color={color} /> */}
               
                    <View style={styles2.container}>
                      <Image
                        style={styles2.stretch}
                        source={require(".././../../../assets/back.png")}
                      />
                    </View>
                <LabelTouchable
                  customStyleTxt={{left: "100%"}}
                  sizeText={15}
                  label="Volver"
                  color={GlobalVars.firstColor}
                  onPress={() => setPrevProcess()}
                />
              </TouchableOpacity>

              <ModalAlert
                text={textAlert}
                openModal={isShowingAlert}
                onHelp={() => setShowhingAlert(!isShowingAlert)}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </Modal>
  );
};

export default ModalTermsConditions;

const styles2 = StyleSheet.create({
  container: {
    width: 100,
    height:50,
    display: "flex",
    flexDirection: 'row',
    position: "absolute",
    top: GlobalVars.windowHeight < 725 ? "2.5%" : "5%",
    left: "8%",
  },
  stretch: {
    width: 35,
    height: 35,
    resizeMode: "stretch",
  },
  containerFocus:{
    width: 42,
    height: 42,
  },
  stretchFocus:{
    width: 42,
    height: 42,
  }
});

import React from "react";
import {
  View,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
} from "react-native";

import Swiper from "react-native-swiper";

import { AntDesign } from "@expo/vector-icons";

import GlobalVars from "../../../global/globalVars";

import Storage from "../../../helpers/localStorage";

import LabelTextComponent from "../../atoms/LabelText";
import LabelTouchable from "../../molecules/LabelTouchable";

import Styles from "./style";

const styles = Styles;

const OnBoarding1 = ({ onBoardCurrent, ...props }) => {
  const [visible, onShow] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const swiper = React.useRef(null);

  React.useEffect(() => {
    // deleteP();
    getOnBoardinFlag();
  }, []);

  React.useEffect(() => {
    if (onBoardCurrent === 1) {
      // deleteP();
      onShow(true);
    }
  }, [onBoardCurrent]);

  React.useEffect(() => {
    if (currentSlide === 3) {
      swiper.current.scrollBy(-1);
    }
  }, [currentSlide]);

  const getOnBoardinFlag = async () => {
    const res = await Storage.getItem("ONBOARD_FLAG");
    if (!res) {
      onShow(true);
    }
  };

  const setProcessOmit = async () => {
    // await Storage.storeData("ONBOARD_FLAG", true);
    onShow(false);
    props.setOnBoardCurrent(2);
  };

  const deleteP = async () => {
    await Storage.removeItem("ONBOARD_FLAG");
  };

  const NextButton = () => {
    if (currentSlide === 2) {
      return (
        <TouchableOpacity
          style={[styles.btnNext, styles.shadowSet]}
          onPress={setProcessOmit}
        >
          <LabelTextComponent
            text={"Continuar"}
            color={GlobalVars.white}
            size={16}
          />
        </TouchableOpacity>
      );
    }

    return (
      <View style={[styles.btnNext, styles.shadowSet]}>
        <LabelTextComponent
          text={"Continuar"}
          color={GlobalVars.white}
          size={16}
        />
      </View>
    );
  };

  if (!visible) return <></>;

  // console.log(GlobalVars.windowHeight);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onShow(false);
      }}
    >
      <ImageBackground
        source={require("../../../../assets/images/trama_bg.png")}
        resizeMode="cover"
        style={styles.bgView}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.container}>
              <Swiper
                ref={swiper}
                key={4}
                index={0}
                loop={false}
                style={styles.wrapper}
                showsPagination={true}
                paginationStyle={{
                  // transform: [
                  //   {
                  //     translateY:
                  //       GlobalVars.windowHeight < 725
                  //         ? -GlobalVars.windowHeight / 1.19
                  //         : -GlobalVars.windowHeight / 1.12,
                  //   },
                  // ],
                  position: "absolute",
                  bottom: GlobalVars.windowHeight < 725 ? "96%" : "92.5%",
                }}
                loadMinimalLoader={
                  <ActivityIndicator color={GlobalVars.orange} size="large" />
                }
                showsButtons
                buttonWrapperStyle={{
                  display: "flex",
                  justifyContent: "center",
                  transform: [
                    {
                      translateY:
                        GlobalVars.windowHeight < 600
                          ? 240
                          : GlobalVars.windowHeight < 700
                          ? 260
                          : GlobalVars.windowHeight < 800
                          ? 282
                          : GlobalVars.windowHeight < 900
                          ? 290
                          : GlobalVars.windowHeight < 1000
                          ? 300
                          : 315,
                    },
                  ],
                }}
                nextButton={NextButton()}
                prevButton={<View style={{ display: "none" }} />}
                pagingEnabled
                bounces
                onIndexChanged={(index) => {
                  setCurrentSlide(index);
                }}
                renderPagination={(i) => {
                  return (
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        bottom: GlobalVars.windowHeight < 725 ? "96%" : "92.5%",
                      }}
                    >
                      <View
                        style={[
                          i === 0 ? styles.dotActiveStyle : styles.dotStyle,
                        ]}
                      />
                      <View
                        style={[
                          i === 1 ? styles.dotActiveStyle : styles.dotStyle,
                        ]}
                      />
                      <View
                        style={[
                          i === 2 ? styles.dotActiveStyle : styles.dotStyle,
                        ]}
                      />
                    </View>
                  );
                }}
              >
                <View key={0} style={styles.itemContent}>
                  <View style={[styles.content, styles.shadowSet]}>
                    <LabelTextComponent
                      text="¡Hola!
                    Bienvenid@ a la aplicación que te
                    conecta con el comercio local."
                      color={GlobalVars.white}
                      size={15}
                    />
                  </View>
                </View>
                <View key={1} style={styles.itemContent}>
                  <View style={[styles.content, styles.shadowSet]}>
                    <LabelTextComponent
                      text="¿Pan? ¿Un regalo? ¿Llaves?
                    ¡En Antofagasta, lo que buscas
                    está más cerca!"
                      color={GlobalVars.white}
                      size={15}
                    />
                  </View>
                </View>
                <View key={2} style={styles.itemContent}>
                  <View style={[styles.content, styles.shadowSet]}>
                    <LabelTextComponent
                      text="Si tienes un negocio, sé parte de
                    la comunidad ALAVUELTAHAY y
                    poténcialo."
                      color={GlobalVars.white}
                      size={15}
                    />
                  </View>
                </View>
                <View key={3} style={{ display: "none" }} />
              </Swiper>

              <View style={styles.omitir}>
                <LabelTouchable
                aditionalStyle={{top:3}}
                  sizeText={15}
                  label="SALTAR"
                  color={GlobalVars.firstColor}
                  onPress={() => setProcessOmit()}
                />
              </View>

              {/* <TouchableOpacity
                style={[
                  styles.close,
                  {
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  },
                ]}
                onPress={() => props.setOnBoardCurrent(10)}
              >
                <AntDesign
                  name="back"
                  size={24}
                  color={GlobalVars.firstColor}
                  style={styles.iconBack}
                />
                <LabelTouchable
                  sizeText={15}
                  label="Volver"
                  color={GlobalVars.firstColor}
                  onPress={() => props.setOnBoardCurrent(10)}
                  aditionalStyle={{ marginVertical: 0, paddingVertical: 0 }}
                  customStyleTxt={{ marginVertical: 0, paddingVertical: 0 }}
                />
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles2.container}
                onPress={() => props.setOnBoardCurrent(10)}
              >
                {/* <Entypo name="chevron-left" size={size} color={color} /> */}

                <View style={styles2.container}>
                  <Image
                    style={styles2.stretch}
                    source={require(".././../../../assets/back.png")}
                  />
                </View>
                <LabelTouchable
                  customStyleTxt={{ left: "100%" }}
                  sizeText={15}
                  label="Volver"
                  color={GlobalVars.firstColor}
                  onPress={() => props.setOnBoardCurrent(10)}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Modal>
  );
};

export default OnBoarding1;

const styles2 = StyleSheet.create({
  container: {
    width: 100,
    height:35,
    display: "flex",
    flexDirection: 'row',
    position: "absolute",
    top: GlobalVars.windowHeight < 725 ? "2.5%" : "4%",
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

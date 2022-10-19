import * as React from "react";
import { View, Animated, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";

import { GET_JUST_5_PANORAMAS } from "../../../mock/panoramas5FirstRows";

import StoreContext from "../../../helpers/globalStates";
import { shuffleArray } from "../../../helpers/shuffleArr";

import useModal from "../../../utils/useModal";

/** Import Componentes Custom */
import PickerAddPanorama from "../AddPanorama";
import TitleComponent from "../../atoms/Titles";
import ImageLocalComponent from "../../atoms/ImageLocalComponent";
import PanoramaCard from "../../molecules/PanoramaCard";
import ModalTemplate from "../../templates/ModalTemplate";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Styles for this Screen */
import Styles from "./style";
import userInvitadData from "../../../utils/useInvitado";
import ModalInvite from "../../templates/ModalInvite";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function PanoramasCarousel({
  navigation,
  _jwt = null,
  type = "featured",
  onHandleType,
  ToRandomDispatch,
  getRandomNumberDispatch,
  ...props
}) {
  const { user } = React.useContext(StoreContext.UserContext);

  const { isShowing: isOpenAddPanorama, toggle: showCreatePanorama } =
    useModal();

  const [result, setResult] = React.useState([]);

  const [data] = userInvitadData();
  const [isShowingInvite, setShowingInvite] = React.useState(false);

  React.useEffect(() => {}, []);

  React.useEffect(() => {
    /** Get panoramas */
    getPanoramasWhenCase();
  }, [type]);

  React.useEffect(() => {
    getPanoramasWhenCase();
  }, [ToRandomDispatch]);

  const getPanoramasWhenCase = async () => {
    let res = null;
    switch (type) {
      case "featured":
        res = await GET_JUST_5_PANORAMAS(_jwt);
        res = shuffleArray(res);
        setResult(res);
        break;

      default:
        res = await GET_JUST_5_PANORAMAS(_jwt);
        res = shuffleArray(res);
        setResult(res);
        break;
    }
  };

  let cards = (result &&
    result?.length &&
    result.map((item, i) => {
      if (type === "featured") {
        return <PanoramaCard key={`panorama_card_${i}`} item={item} />;
      }
    })) || <></>;

  return (
    <View style={styles.rootView}>
      <View style={styles.viewContainer}>
        <View style={styles.headerContent}>
          <View style={styles.borderBurbble}>
            <TitleComponent
              title={`Panoramas`}
              color={GlobalVars.white}
              size={15}
            />
            <TitleComponent
              title={`en tu barrio`}
              color={GlobalVars.white}
              size={15}
            />
          </View>
        </View>
        <View style={styles.mainContent}>
          <AnimatedScrollView
            style={styles.stylesCarousel}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={200}
            snapToInterval={2}
            decelerationRate="fast"
            bounces={false}
            bouncesZoom={true}
            pagingEnabled
            contentContainerStyle={styles.contentCarousel}
          >
            <TouchableOpacity
              style={styles.optionMain}
              onPress={() => navigation.navigate("Panoramas")}
            >
              <TitleComponent
                size={13}
                title={`Ver todos`}
                color={GlobalVars.white}
              />
            </TouchableOpacity>
          </AnimatedScrollView>

          <View style={styles.centeredLogo}>
            <ImageLocalComponent
              img={require("../../../../assets/images/alvh_logo.png")}
              width={75}
              height={75}
            />
          </View>

          <TouchableOpacity
            style={[styles.allEntrepreneurs,{marginTop:2}]}
            onPress={() => data === false ? setShowingInvite(!isShowingInvite) : showCreatePanorama()}
          >
            <TitleComponent
              size={13}
              title={`Agregar`}
              color={GlobalVars.white}
            />
           <View style={styles2.container}>
                <Image
                  style={styles2.stretch}
                  source={require("../../../../assets/plus_white.png")}
                />
              </View>
          </TouchableOpacity>
        </View>

        {!result?.length && (
          <View
            style={{
              width: "100%",
              paddingHorizontal: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TitleComponent
              size={15}
              title={`No hay panoramas creados`}
              color={GlobalVars.textGrayColor}
              customStyles={{ textAlign: "center" }}
            />

            <TitleComponent
              size={15}
              title={`!Crea el tuyo!`}
              color={GlobalVars.textGrayColor}
              customStyles={{ textAlign: "center" }}
            />
          </View>
        )}

        <AnimatedScrollView
          style={styles.stylesCarousel}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={200}
          snapToInterval={2}
          decelerationRate="fast"
          bounces={false}
          bouncesZoom={true}
          pagingEnabled
          contentContainerStyle={styles.contentCarousel}
        >
          {result?.length ? cards : <></>}
        </AnimatedScrollView>
      </View>

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
      <ModalInvite
           openModal={isShowingInvite}
           text={'Para crear panoramas requieres de una cuenta de usuario. !Regístrate, es muy sencillo!'}
           deleteUser={() => console.log('hola')}
           cancelModal={() => setShowingInvite(!isShowingInvite)}
      />
    </View>
  );
}


const styles2 = StyleSheet.create({
  container: {
    width: 14,
    height: 14,
    top:-3,
    right:-5
  },
  stretch: {
    width: 22,
    height: 22,
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
import React, { useState, useEffect, useContext } from "react";

import {
  View,
  Animated,
  SafeAreaView,
  BackHandler,
  ScrollView,
  ActivityIndicator,
} from "react-native";

/** Import Global Variables */
import GlobalVars from "../../global/globalVars";

import { hoursCollection } from "../../mock/hoursCollection";

import useAuth from "../../utils/useAuth";
import recoveringStateLocation from "../../utils/useGPS";

import StoreContext from "../../helpers/globalStates";

/** Import Componentes Custom */
import StatusBarComponent from "../../components/atoms/StatusBar";
import ButtonComponent from "../../components/atoms/ButtonComponent";
import ImageLocalComponent from "../../components/atoms/ImageLocalComponent";
import OnBoarding3 from "../../components/organisms/SwipperOnBoarding3";
import OnBoarding4 from "../../components/organisms/SwipperOnBoarding4";
import ModalAlert from "../../components/templates/ModalAlert";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const AggreeShopScreen = ({ navigation }) => {
  const { _jwt } = useContext(StoreContext.SecurityContext);
  const { user } = useContext(StoreContext.UserContext);

  const [textAlert, setTextAlert] = useState("");
  const [finished, setFinished] = useState(false);
  const [onBoardCurrent, setOnBoardCurrent] = useState(3);
  const [isShowingAlert, setShowhingAlert] = useState(false);

  const [shopName, setShopName] = useState("");
  const [descriptionShop, setDescriptionShop] = useState("");
  const [shopCat, setShopCat] = useState(null);
  const [shopCatName, setShopCatName] = useState(null);
  const [nameAddress, setNameAddres] = useState("");
  const [coords, setCoords] = useState({});
  const [daysWork, setDaysWork] = useState([]);
  const [continuousHours, setContinuousHours] = useState(false);
  const [openHour, setOpenHour] = useState(hoursCollection[8].hour);
  const [closeHour, setCloseHour] = useState(hoursCollection[33].hour);
  const [openHourMorning, setOpenHourMorning] = useState(
    hoursCollection[48].hour
  );
  const [closeHourMorning, setCloseHourMorning] = useState(
    hoursCollection[48].hour
  );
  const [openHourEvernoon, setOpenHourEvernoon] = useState(
    hoursCollection[48].hour
  );
  const [closeHourEvernoon, setCloseHourEvernoon] = useState(
    hoursCollection[48].hour
  );

  const [contactChannels, setContactChannels] = useState([]);
  const [avatarShop, setAvatarShop] = useState(null);
  const [avatarShopUri, setAvatarShopUri] = useState(null);
  const [frontShop, setFrontShop] = useState(null);
  const [frontShopPre, setFrontShopPre] = useState(null);
  const [frontShopUri, setFrontShopUri] = useState(null);
  const [imageShop, setImageShop] = useState(null);
  const [fb, setFb] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [mailTo, setMailTo] = useState("");
  const [calls, setCalls] = useState("");
  const [defaultRating, setDefaultRating] = useState(4);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    /** GPS Active */
    setGPSLocation();

    /** Android close App */
    const backAction = () => {
      setOnBoardCurrent(0);
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (setContactChannels) {
      setContactChannels([
        { id: 1, name: "whatsapp", channel: whatsapp },
        { id: 2, name: "instagram", channel: instagram },
        { id: 3, name: "facebook", channel: fb },
        { id: 4, name: "tiktok", channel: tiktok },
        { id: 5, name: "llamada", channel: calls },
        { id: 6, name: "correo", channel: mailTo },
      ]);
    }
  }, [fb, whatsapp, instagram, tiktok, calls, mailTo]);

  useEffect(() => {
    resetOnBoardCurrent();
  }, [onBoardCurrent]);

  const resetOnBoardCurrent = () => {
    if (onBoardCurrent < 3 && !finished) {
      setOnBoardCurrent(3);
    }
  };

  const setGPSLocation = async () => {
    let recover = await recoveringStateLocation();
    while (recover === "error" || !recover) {
      recover = await recoveringStateLocation();
    }
    setCoords({
      latitude: recover?.coords?.latitude,
      longitude: recover?.coords?.longitude,
    });
  };

  const onRegister = async (option) => {
    let res = false;
    switch (option) {
      case 1:
        res = await useAuth.addEntrepreneurshipPostRegister(
          user,
          _jwt,
          shopName,
          descriptionShop,
          shopCat,
          nameAddress,
          coords,
          daysWork,
          continuousHours,
          openHour,
          closeHour,
          openHourMorning,
          closeHourMorning,
          openHourEvernoon,
          closeHourEvernoon,
          contactChannels,
          avatarShop,
          imageShop,
          frontShop,
          frontShopUri
        );
        break;
    }

    console.log(res);

    if (res) setFinished(true);

    return res;
  };

  return (
    <SafeAreaView style={styles.viewRoot}>
      <View style={styles.viewContainer}>
        <StatusBarComponent />

        <ActivityIndicator color={GlobalVars.firstColor} size="large" />

        {/* <ImageLocalComponent
          img={require("../../../assets/images/full_logo_white.png")}
          width={GlobalVars.windowWidth / 3}
          height={GlobalVars.windowHeight / 5}
          mode="contain"
        />

        <ButtonComponent
          text="Ir al menú"
          color={GlobalVars.orange}
          textColor={GlobalVars.white}
          customStyleBtn={{
            width: "80%",
          }}
          Action={() => navigation.goBack()}
        /> */}

        {onBoardCurrent === 3 && (
          <OnBoarding3
            onBoardCurrent={onBoardCurrent}
            setOnBoardCurrent={setOnBoardCurrent}
            shopName={shopName}
            setShopName={setShopName}
            descriptionShop={descriptionShop}
            setDescriptionShop={setDescriptionShop}
            shopCat={shopCat}
            setShopCat={setShopCat}
            shopCatName={shopCatName}
            setShopCatName={setShopCatName}
            nameAddress={nameAddress}
            setNameAddres={setNameAddres}
            coords={coords}
            setCoords={setCoords}
            daysWork={daysWork}
            setDaysWork={setDaysWork}
            continuousHours={continuousHours}
            setContinuousHours={setContinuousHours}
            openHour={openHour}
            setOpenHour={setOpenHour}
            closeHour={closeHour}
            setCloseHour={setCloseHour}
            openHourMorning={openHourMorning}
            setOpenHourMorning={setOpenHourMorning}
            closeHourMorning={closeHourMorning}
            setCloseHourMorning={setCloseHourMorning}
            openHourEvernoon={openHourEvernoon}
            setOpenHourEvernoon={setOpenHourEvernoon}
            closeHourEvernoon={closeHourEvernoon}
            setCloseHourEvernoon={setCloseHourEvernoon}
            navigation={navigation}
            returnToScreen
          />
        )}
        {onBoardCurrent === 4 && (
          <OnBoarding4
            onBoardCurrent={onBoardCurrent}
            setOnBoardCurrent={setOnBoardCurrent}
            contactChannels={contactChannels}
            setContactChannels={setContactChannels}
            avatarShop={avatarShop}
            setAvatarShop={setAvatarShop}
            imageShop={imageShop}
            setImageShop={setImageShop}
            shopName={shopName}
            descriptionShop={descriptionShop}
            shopCat={shopCat}
            shopCatName={shopCatName}
            nameAddress={nameAddress}
            coords={coords}
            daysWork={daysWork}
            openHour={openHour}
            closeHour={closeHour}
            openHourMorning={openHourMorning}
            closeHourMorning={closeHourMorning}
            openHourEvernoon={openHourEvernoon}
            closeHourEvernoon={closeHourEvernoon}
            defaultRating={defaultRating}
            maxRating={maxRating}
            fb={fb}
            setFb={setFb}
            whatsapp={whatsapp}
            setWhatsapp={setWhatsapp}
            instagram={instagram}
            setInstagram={setInstagram}
            tiktok={tiktok}
            setTiktok={setTiktok}
            calls={calls}
            setCalls={setCalls}
            mailTo={mailTo}
            setMailTo={setMailTo}
            avatarShopUri={avatarShopUri}
            setAvatarShopUri={setAvatarShopUri}
            frontShop={frontShop}
            setFrontShop={setFrontShop}
            frontShopPre={frontShopPre}
            setFrontShopPre={setFrontShopPre}
            frontShopUri={frontShopUri}
            setFrontShopUri={setFrontShopUri}
            onRegister={() => onRegister(1)}
          />
        )}
      </View>

      <ModalAlert
        text={textAlert}
        openModal={isShowingAlert}
        onHelp={() => setShowhingAlert(!isShowingAlert)}
      />
    </SafeAreaView>
  );
};

export default AggreeShopScreen;

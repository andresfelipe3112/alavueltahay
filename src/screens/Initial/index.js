import React, { useState, useEffect, useContext } from "react";

import {
  View,
  Animated,
  SafeAreaView,
  BackHandler,
  ScrollView,
  ImageBackground,
} from "react-native";

/** Import Global Variables */
import GlobalVars from "../../global/globalVars";

import { hoursCollection } from "../../mock/hoursCollection";

import useAuth from "../../utils/useAuth";
import useModal from "../../utils/useModal";
import recoveringStateLocation from "../../utils/useGPS";

import Storage from "../../helpers/localStorage";
import StoreContext from "../../helpers/globalStates";

/** Import Componentes Custom */
import StatusBarComponent from "../../components/atoms/StatusBar";
import LabelTextComponent from "../../components/atoms/LabelText";
import ButtonComponent from "../../components/atoms/ButtonComponent";
import ImageLocalComponent from "../../components/atoms/ImageLocalComponent";
import LabelTouchable from "../../components/molecules/LabelTouchable";
import OnBoarding1 from "../../components/organisms/SwipperOnBoarding1";
import OnBoarding2 from "../../components/organisms/SwipperOnBoarding2";
import OnBoarding3 from "../../components/organisms/SwipperOnBoarding3";
import OnBoarding4 from "../../components/organisms/SwipperOnBoarding4";
import ModalAlert from "../../components/templates/ModalAlert";
import ModalsSignOut from "../../components/templates/ModalsSignOut";
import ModalResetPass from "../../components/templates/ModalRestorePass";
import ModalTermsConditions from "../../components/templates/ModalTermsConditions";

/** Import Styles for this Screen */
import Styles from "./style";
import Loading from "../../components/atoms/Loading";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const LabelTouchInvoke = (
  label,
  size,
  color,
  aditionalStyle,
  onEvent,
  customStyleTxt
) => {
  return (
    <LabelTouchable
      color={color}
      label={label}
      sizeText={size}
      aditionalStyle={aditionalStyle}
      customStyleTxt={customStyleTxt}
      onPress={onEvent}
    />
  );
};

const InitialScreen = ({ navigation }) => {
  const { isShowing: showModalRecoverPass, toggle: toggleModalRecoverPass } =
    useModal();

  const { setUser } = useContext(StoreContext.UserContext);
  const { _setJwt } = useContext(StoreContext.SecurityContext);

  const [salirApp, setSalirapp] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const [onBoardCurrent, setOnBoardCurrent] = useState(0);
  const [isShowingAlert, setShowhingAlert] = useState(false);

  const [name, setName] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mail, setMail] = useState("");
  const [country, setCountry] = useState(null);
  const [passwd, setPasswd] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [likedCats, setLikedCats] = useState([]);
  const [avatarSelected, setAvatarSelected] = useState(null);
  const [hasShop, setHasShop] = useState("no");

  const [shopName, setShopName] = useState("");
  const [descriptionShop, setDescriptionShop] = useState("");
  const [shopCat, setShopCat] = useState(null);
  const [shopCatName, setShopCatName] = useState(null);
  const [nameAddress, setNameAddres] = useState("");
  const [coords, setCoords] = useState({});
  const [daysWork, setDaysWork] = useState([]);
  const [continuousHours, setContinuousHours] = useState(false);
  const [openHour, setOpenHour] = useState(hoursCollection[16].hour);
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

  const [acceptTerms, setAcceptTerms] = useState(false);

  useEffect(() => {
    /** Recover onboard */
    checkOnBoard();

    /** GPS Active */
    setGPSLocation();

    /** Android close App */
    const backAction = () => {
      setSalirapp(!salirApp);
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

  const CloseApp = (response = false) => {
    if (response) {
      BackHandler.exitApp();
      setSalirapp(!salirApp);
    } else setSalirapp(!salirApp);
  };

  const checkOnBoard = async () => {
    const res = await Storage.getItem("_ON_BOARD");
    if (!res) {
      setOnBoardCurrent(10);
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

  const onBoardCall = (num) => {
    setOnBoardCurrent(num);
  };

  const onRegister = async (option) => {
    let res = false;
    switch (option) {
      case 1:
        res = await useAuth.registerUserWhitEntrepreneurship(
          name,
          lastNames,
          phoneNumber,
          mail,
          country,
          passwd,
          likedCats,
          avatarSelected,
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
          frontShopUri,
          setUser
        );
        break;
      case 2:
        res = await useAuth.registerUserSimple(
          name,
          lastNames,
          phoneNumber,
          mail,
          country,
          passwd,
          likedCats,
          avatarSelected,
          setUser
        );
        break;
      default:
        res = await useAuth.registerUserSimple(
          name,
          lastNames,
          phoneNumber,
          mail,
          country,
          passwd,
          likedCats,
          avatarSelected,
          setUser
        );
    }

    return res;
  };

  const [loading, setLoading] = useState(false);


  const validateEmail = (email) => {
    if (!email.length) return false;
    const lowerMail = email.toLowerCase().trim();
    const res = lowerMail.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return res;
  };


  const validatePass = (pass) => {
    if (pass.length < 5) return false;

    return true;
    // return (
    //   /[A-Z]/.test(pass) &&
    //   /[a-z]/.test(pass) &&
    //   /[0-9]/.test(pass) &&
    //   /[^A-Za-z0-9]/.test(pass)
    // );
  };

  let objInvi ={
    correo: "usuario-invitado@alavueltahay.cl",
    clave: "01234567"
  }

  const LogInProcess = async () => {
    setLoading(true);
    try {
      if (validateEmail(objInvi.correo) && validatePass(objInvi.clave)) {
        const res = await useAuth.LogInUser(
          objInvi.correo.toLowerCase().trim(),
          objInvi.clave,
          setUser,
          _setJwt
        );
        setTimeout(() => {
          setLoading(false);
          if (!res) {
            setTextAlert('"Ups… te equivocaste. Revisa tus datos."');
            setShowhingAlert(!isShowingAlert);
          } else {
            setTextAlert("Bienvenido");
            setShowhingAlert(!isShowingAlert);

            setTimeout(() => {
              setShowhingAlert(false);
              navigation.navigate("Home", { screen: "Inicio" });
            }, 500);
          }
        }, 1000);
      } else {
        setTimeout(() => {
          setLoading(false);
          setTextAlert('"Ups… te equivocaste. Revisa tus datos."');
          setShowhingAlert(!isShowingAlert);
        }, 500);
      }
    } catch (e) {
      setLoading(false);
      setTextAlert("Ha ocurrido un error, intente de nuevo");
      setShowhingAlert(!isShowingAlert);
      // console.log(e);
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/trama_bg.png")}
      resizeMode="cover"
      style={styles.bgView}
    >
      <SafeAreaView style={styles.viewRoot}>
        <View style={styles.viewContainer}>
          <StatusBarComponent />

          <ImageLocalComponent
            img={require("../../../assets/images/alvh_logo.png")}
            width={GlobalVars.windowWidth - 40}
            height={GlobalVars.windowHeight / 2}
            mode="contain"
            mrBottom={-60}
          />

          <ButtonComponent
            text="Iniciar sesión"
            color={GlobalVars.orange}
            textColor={GlobalVars.white}
            customStyleBtn={{
              width: "80%",
            }}
            Action={() => navigation.navigate("Login")}
          />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {LabelTouchInvoke(
              "¿No tienes cuenta?",
              15,
              GlobalVars.black,
              null,
              () => null,
              null
            )}
            {LabelTouchInvoke(
              " Registrate aquí",
              15,
              GlobalVars.orange,
              null,
              () => onBoardCall(10),
              null
            )}
          </View>
          { loading && <Loading size="small" color={GlobalVars.orange} />}
          <ButtonComponent
            text="Ingresar sin cuenta"
            color={GlobalVars.orange}
            textColor={GlobalVars.white}
            customStyleBtn={{
              width: "55%",
              height: 39,
              borderRadius:30,
              backgroundColor:'#F4A063',
              marginVertical:0,
              marginTop:5
            }}
            Action={() => LogInProcess()}
          />

          {LabelTouchInvoke(
            "Restablecer contraseña",
            15,
            GlobalVars.orange,
            {
              borderBottomWidth: 1,
              borderBottomColor: GlobalVars.orange,
            },
            () => toggleModalRecoverPass(),
            { marginBottom: 0 }
          )}

          {onBoardCurrent === 10 && (
            <ModalTermsConditions
              onBoardCurrent={onBoardCurrent}
              setOnBoardCurrent={setOnBoardCurrent}
              acceptTerms={acceptTerms}
              setAcceptTerms={setAcceptTerms}
            />
          )}

          {onBoardCurrent === 1 && (
            <OnBoarding1
              onBoardCurrent={onBoardCurrent}
              setOnBoardCurrent={setOnBoardCurrent}
            />
          )}

          {onBoardCurrent === 2 && (
            <OnBoarding2
              onBoardCurrent={onBoardCurrent}
              setOnBoardCurrent={setOnBoardCurrent}
              name={name}
              setName={setName}
              lastNames={lastNames}
              setLastNames={setLastNames}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              mail={mail}
              setMail={setMail}
              country={country}
              setCountry={setCountry}
              passwd={passwd}
              setPasswd={setPasswd}
              confirmPass={confirmPass}
              setConfirmPass={setConfirmPass}
              likedCats={likedCats}
              setLikedCats={setLikedCats}
              avatarSelected={avatarSelected}
              setAvatarSelected={setAvatarSelected}
              hasShop={hasShop}
              setHasShop={setHasShop}
              onRegister={() => onRegister(2)}
            />
          )}
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
              name={name}
              lastNames={lastNames}
              phoneNumber={phoneNumber}
              mail={mail}
              country={country}
              likedCats={likedCats}
              avatarSelected={avatarSelected}
              shopName={shopName}
              descriptionShop={descriptionShop}
              shopCat={shopCat}
              shopCatName={shopCatName}
              nameAddress={nameAddress}
              coords={coords}
              daysWork={daysWork}
              continuousHours={continuousHours}
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

          <View style={styles.burbbleBottom}>
            <LabelTextComponent
              size={13}
              text="Gestiona"
              color={GlobalVars.white}
            />
            <View style={styles.containerLogoMarchantes}>
              <View style={styles.positionedLogoMarchantes}>
                <ImageLocalComponent
                  img={require("../../../assets/images/marchantes_white.png")}
                  width={150}
                  height={50}
                  mode="contain"
                />
              </View>
            </View>
          </View>

          {salirApp && (
            <ModalsSignOut navigation={navigation} Action={CloseApp} />
          )}
        </View>

        <ModalResetPass
          openModal={showModalRecoverPass}
          onHelp={toggleModalRecoverPass}
        />
        <ModalAlert
          text={textAlert}
          openModal={isShowingAlert}
          onHelp={() => setShowhingAlert(!isShowingAlert)}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default InitialScreen;

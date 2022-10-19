import React, { useEffect, useState, useCallback, useContext } from "react";
import { View, ActivityIndicator, ImageBackground } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import GlobalVars from "../../global/globalVars";

import { GET_USER_INFO } from "../../mock/userInfo";

import updateDataUser from "../../helpers/updateDataUser";
import StoreContext from "../../helpers/globalStates";

import useModal from "../../utils/useModal";

/** Import Componentes Custom */
import StatusBarComponent from "../../components/atoms/StatusBar";
import LabelTextComponent from "../../components/atoms/LabelText";
import ButtonComponent from "../../components/atoms/ButtonComponent";
import InputEntry from "../../components/molecules/InputEntry";
import OptionTouchable from "../../components/molecules/ProfileOption";
import Header from "../../components/organisms/Header";
import PickerImage from "../../components/organisms/ChooseImage";
import PickerAvatar from "../../components/organisms/ChooseAvatar";
import PickerCategories from "../../components/organisms/ChooseCategories";
import ScrollView from "../../components/templates/ScrollView";
import WrappingViews from "../../components/templates/WrappingViews";
import ModalAlert from "../../components/templates/ModalAlert";
import ModalTemplate from "../../components/templates/ModalTemplate";
import ModalChangePass from "../../components/templates/ModalChangePass";

/** Styles */
import Styles from "./style";

const styles = Styles;
const EditProfileScreen = ({ navigation }) => {
  const { _jwt } = useContext(StoreContext.SecurityContext);
  const { user } = useContext(StoreContext.UserContext); 

  

  const { isShowing: isOpenCategories, toggle: showSelectCategories } =
    useModal();
  const { isShowing: isOpenAvatars, toggle: showSelectAvatar } = useModal();
  const { isShowing: isOpenPasswd, toggle: showChangePass } = useModal();
  const { isShowing: isOpenPhoto, toggle: showChangePhoto } = useModal();
  const { isShowing: isShowingAlert, toggle: setShowhingAlert } = useModal();

  const [showTotalMenu, setShowTotalMenu] = useState(true);
  const [q, setQuery] = useState("");

  const [ToRandomDispatch, setToRandomDispatch] = useState(null);

  const [dataUser, setDataUser] = useState(null);
  const [textAlert, setTextAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mail, setMail] = useState("");
  const [imageUser, setImageUser] = useState(null);
  const [likedCats, setLikedCats] = useState([]);
  const [avatarSelected, setAvatarSelected] = useState(null);

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

  const getDataUser = async () => {
    setLoading(true);
    const res = await GET_USER_INFO(_jwt);
    setDataUser(res || null);
    if (res) {
      setName(res?.names || "");
      setLastNames(res?.lastnames || "");
      setPhoneNumber(res?.phoneNumber || "");
      setMail(res?.email || "");
      setImageUser(
        res && res?.image
          ? {
              uri: res?.image?.uri,
              id: res?.image?.id,
              identifierS3: res?.image?.identifierS3,
            }
          : null
      );

      // categories selected
      const catSelected = res?.categories.map((item) => item.id);
      setLikedCats(catSelected);

      // avatar selected
      const avaSelected = res?.avatar?.id || null;
      setAvatarSelected(avaSelected);
    }
    setLoading(false);
  };

  const UpdateProcess = async () => {
    try {
      setLoading(true);
      if (!name) {
        setTextAlert("Falta su nombre");
        setShowhingAlert(true);
      } else if (!lastNames) {
        setTextAlert("Faltan sus apellidos");
        setShowhingAlert(true);
      } else if (!phoneNumber) {
        setTextAlert("Falta su número telefónico");
        setShowhingAlert(true);
      } else {
        const res = await updateDataUser.userData(
          {
            id: user?.id,
            name: name,
            lastNames: lastNames,
            phoneNumber: phoneNumber,
          },
          _jwt
        );
        if (res) {
          const newDataUser = await getDataUser();
          setTextAlert("Actualización de datos completada.");
          setShowhingAlert(true);
          setLoading(false);
        }
      }
    } catch (e) {
      setTextAlert("Ocurrió un error durante la actualización de datos");
      setShowhingAlert(true);
    }
  };

  return (
    <WrappingViews>
      <StatusBarComponent />
      <Header
        navigation={navigation}
        user={user}
        _jwt={_jwt}
        title="Edita tu perfil"
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
            <View style={styles.tagProfile}>
              <LabelTextComponent
                size={16}
                color={GlobalVars.white}
                text="Edita tu perfil"
              />
              <View style={styles.subray} />
            </View>

            {loading && (
              <ActivityIndicator
                animating={true}
                color={GlobalVars.white}
                size="large"
                style={styles.spinner}
              />
            )}

            {!loading && (
              <View style={styles.infoUser}>
                <LabelTextComponent
                  text="Nombres"
                  color={GlobalVars.whiteLight}
                  size={14}
                  customStyleBtn={styles.customLabel}
                />
                <InputEntry
                  label="Nombres *"
                  textvariable={name || ""}
                  setValue={(val) => setName(val)}
                />

                <LabelTextComponent
                  text="Apellidos"
                  color={GlobalVars.whiteLight}
                  size={14}
                  customStyleBtn={styles.customLabel}
                />
                <InputEntry
                  label="Apellidos *"
                  textvariable={lastNames || ""}
                  setValue={(val) => setLastNames(val)}
                />

                <LabelTextComponent
                  text="Celular"
                  color={GlobalVars.whiteLight}
                  size={14}
                  customStyleBtn={styles.customLabel}
                />
                <InputEntry
                  label="Celular *    +5691..."
                  textvariable={phoneNumber || ""}
                  type={"telephoneNumber"}
                  keyboard={"phone-pad"}
                  setValue={(val) => setPhoneNumber(val)}
                />

                <LabelTextComponent
                  text="Correo"
                  color={GlobalVars.whiteLight}
                  size={14}
                  customStyleBtn={styles.customLabel}
                />
                <InputEntry
                  label="Correo electrónico *"
                  textvariable={mail || ""}
                  type={"emailAddress"}
                  keyboard={"email-address"}
                />

                <OptionTouchable
                  text="Intereses"
                  colorText={GlobalVars.white}
                  sizeText={16}
                  colorIcon={GlobalVars.white}
                  sizeIcon={20}
                  iconOption="award"
                  onPress={() => showSelectCategories()}
                  aditionalStyle={styles.optionTouch}
                />

                <OptionTouchable
                  text="Contraseña"
                  colorText={GlobalVars.white}
                  sizeText={16}
                  colorIcon={GlobalVars.white}
                  sizeIcon={20}
                  iconOption="key"
                  onPress={() => showChangePass()}
                  aditionalStyle={styles.optionTouch}
                />

                <OptionTouchable
                  text="Foto de perfil"
                  colorText={GlobalVars.white}
                  sizeText={16}
                  colorIcon={GlobalVars.white}
                  sizeIcon={20}
                  iconOption="aperture"
                  onPress={() => showChangePhoto()}
                  aditionalStyle={styles.optionTouch}
                />

                <OptionTouchable
                  text="Avatar"
                  colorText={GlobalVars.white}
                  sizeText={16}
                  colorIcon={GlobalVars.white}
                  sizeIcon={20}
                  iconOption="github"
                  onPress={() => showSelectAvatar()}
                  aditionalStyle={styles.optionTouch}
                />

                {!saving ? (
                  <ButtonComponent
                    text="GUARDAR"
                    color={GlobalVars.white}
                    textColor={GlobalVars.orange}
                    customStyleBtn={styles.saveBtn}
                    Action={() => UpdateProcess()}
                  />
                ) : (
                  <ActivityIndicator
                    animating={true}
                    size="large"
                    color={GlobalVars.orange}
                    style={{ marginVertical: 30 }}
                  />
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </ImageBackground>

      <ModalAlert
        text={textAlert}
        openModal={isShowingAlert}
        onHelp={() => setShowhingAlert(!isShowingAlert)}
      />

      <ModalChangePass openModal={isOpenPasswd} onHelp={showChangePass} />

      <ModalTemplate
        openModal={isOpenCategories}
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
        <PickerCategories
          onClose={() => showSelectCategories()}
          _jwt={_jwt}
          user={user}
          getRandomNumberDispatch={getRandomNumberDispatch}
          likedCats={likedCats}
          setLikedCats={setLikedCats}
          isUserUpdate
        />
      </ModalTemplate>

      <ModalTemplate
        openModal={isOpenAvatars}
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
        <PickerAvatar
          onClose={() => showSelectAvatar()}
          _jwt={_jwt}
          user={user}
          getRandomNumberDispatch={getRandomNumberDispatch}
          avatarSelected={avatarSelected}
          setAvatarSelected={setAvatarSelected}
          isUserUpdate
        />
      </ModalTemplate>

      <ModalTemplate
        openModal={isOpenPhoto}
        onHelp={() => showChangePhoto()}
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
          imageShop={imageUser}
          onClose={() => showChangePhoto()}
          handleImg={setImageUser}
          _jwt={_jwt}
          user={user}
          getRandomNumberDispatch={getRandomNumberDispatch}
          isUserUpdate
        />
      </ModalTemplate>
    </WrappingViews>
  );
};

export default EditProfileScreen;

import React, { useEffect, useState, useCallback, useContext } from "react";
import {
  View,
  ActivityIndicator,
  BackHandler,
  ImageBackground,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import GlobalVars from "../../global/globalVars";

import { GET_ENTREPRENEUR_BY_ID } from "../../mock/entrepreneurById";

import updateDataEntrepreneur from "../../helpers/updateDataEntrepreneur";
import StoreContext from "../../helpers/globalStates";

import useModal from "../../utils/useModal";

/** Import Componentes Custom */
import StatusBarComponent from "../../components/atoms/StatusBar";
import LabelTextComponent from "../../components/atoms/LabelText";
import ButtonComponent from "../../components/atoms/ButtonComponent";
import InputEntry from "../../components/molecules/InputEntry";
import OptionTouchable from "../../components/molecules/ProfileOption";
import Header from "../../components/organisms/Header";
import PickerDaysShop from "../../components/organisms/ChooseDaysShop";
import PickerHoursShop from "../../components/organisms/ChooseHoursShop";
import PickerImage from "../../components/organisms/ChooseImageEntrepreneur";
import PickerAvatar from "../../components/organisms/ChooseAvatarEntrepreneur";
import PickerFront from "../../components/organisms/ChooseFrontEntrepreneur";
import PickerLocationShop from "../../components/organisms/ChooseLocationShop";
import PickerChannelsShop from "../../components/organisms/ChooseChannelsShop";
import PickerCategories from "../../components/organisms/ChooseCategoriesEntrepreneur";
import ScrollView from "../../components/templates/ScrollView";
import WrappingViews from "../../components/templates/WrappingViews";
import ModalAlert from "../../components/templates/ModalAlert";
import ModalTemplate from "../../components/templates/ModalTemplate";

/** Styles */
import Styles from "./style";

const styles = Styles;
const EditEntrepreneurScreen = ({ navigation }) => {
  const { _jwt } = useContext(StoreContext.SecurityContext);
  const { user } = useContext(StoreContext.UserContext);
  const { entrepreneur } = useContext(StoreContext.EntrepreneurContext);

  const { isShowing: isOpenCategories, toggle: showSelectCategories } =
    useModal();
  const { isShowing: isOpenAvatars, toggle: showSelectAvatar } = useModal();
  const { isShowing: isOpenFrontChoose, toggle: showSelectFrontChoose } =
    useModal();
  const { isShowing: isOpenPhoto, toggle: showChangePhoto } = useModal();
  const { isShowing: isOpenPhotoFront, toggle: showChangePhotoFront } =
    useModal();
  const { isShowing: isOpenGps, toggle: showChangeGps } = useModal();
  const { isShowing: isOpenDays, toggle: showChangeDays } = useModal();
  const { isShowing: isOpenHours, toggle: showChangeHours } = useModal();
  const { isShowing: isOpenChannels, toggle: showChangeChannels } = useModal();
  const { isShowing: isShowingAlert, toggle: setShowhingAlert } = useModal();

  const [ToRandomDispatch, setToRandomDispatch] = useState(null);

  const [dataEntrepreneur, setDataEntrepreneur] = useState(null);
  const [textAlert, setTextAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [entrepreneurName, setEntrepreneurName] = useState("");
  const [description, setDescription] = useState("");
  const [imageEntrepreneur, setImageEntrepreneur] = useState(null);
  const [frontEntrepreneur, setFrontEntrepreneur] = useState(null);
  const [categorySelected, setCategorySelected] = useState(null);
  const [avatarSelected, setAvatarSelected] = useState(null);
  const [frontSelected, setFrontSelected] = useState(null);

  useEffect(() => {}, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getDataEntrepreneur();
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
      getDataEntrepreneur();

      getRandomNumberDispatch();
    }, [])
  );

  const BackHandlerProcess = () => {
    /** Android no return Login */
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  };

  const getRandomNumberDispatch = () => {
    // random vals process for generate token for wish
    const attrTemp = Math.random();
    setToRandomDispatch(attrTemp);
  };

  const getDataEntrepreneur = async () => {
    setLoading(true);
    const res = await GET_ENTREPRENEUR_BY_ID(_jwt, entrepreneur.id);
    setDataEntrepreneur(res || null);
    if (res) {
      setEntrepreneurName(res?.attributes?.entrepreneurship || "");
      setDescription(res?.attributes?.description || "");
      setAvatarSelected(res?.attributes?.avatar?.data?.id || null);
      setImageEntrepreneur(
        res?.attributes?.imageFirst?.data?.attributes
          ? {
              uri: res?.attributes?.imageFirst?.data?.attributes?.uri,
              id: res?.attributes?.imageFirst?.data?.id,
              identifierS3:
                res?.attributes?.imageFirst?.data?.attributes?.identifierS3,
            }
          : null
      );
      setFrontEntrepreneur(
        res?.attributes?.frontImage?.data?.attributes
          ? {
              uri: res?.attributes?.frontImage?.data?.attributes?.uri,
              id: res?.attributes?.frontImage?.data?.id,
              identifierS3:
                res?.attributes?.frontImage?.data?.attributes?.identifierS3,
            }
          : null
      );
      setCategorySelected(res?.attributes?.category?.data?.id);
    }
    setLoading(false);
  };

  const UpdateProcess = async () => {
    try {
      setLoading(true);
      if (!entrepreneurName) {
        setTextAlert("Falta el nombre del emprendimiento");
        setShowhingAlert(true);
      } else {
        const res = await updateDataEntrepreneur.entrepreneurData(
          {
            id: entrepreneur.id,
            entrepreneurship: entrepreneurName,
            description: description,
          },
          _jwt
        );

        if (res) {
          const newDataUser = await getDataEntrepreneur();
          setTextAlert("Actualización de datos completada.");
          setShowhingAlert(true);
          setLoading(false);
        } else {
          setTextAlert("Ocurrió un error durante la actualización de datos");
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
        title="Edita tu negocio"
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
                text="Edita tu negocio"
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
                  text="Nombre de tu negocio"
                  color={GlobalVars.whiteLight}
                  size={14}
                  customStyleBtn={styles.customLabel}
                />
                <InputEntry
                  label="Nombre *"
                  textvariable={entrepreneurName || ""}
                  setValue={(val) => setEntrepreneurName(val)}
                />

                <LabelTextComponent
                  text="Descripción de tu negocio"
                  color={GlobalVars.whiteLight}
                  size={14}
                  customStyleBtn={styles.customLabel}
                />
                <InputEntry
                  label="Descripción *"
                  textvariable={description || ""}
                  setValue={(val) => setDescription(val)}
                />

                <OptionTouchable
                  text="Rubro"
                  colorText={GlobalVars.white}
                  sizeText={16}
                  colorIcon={GlobalVars.white}
                  sizeIcon={20}
                  iconOptionN="Rubro"
                  onPress={() => showSelectCategories()}
                  aditionalStyle={styles.optionTouch}
                  customChevronStyle={styles.chevronArrow}
                />

                <OptionTouchable
                  text="Ubicación"
                  colorText={GlobalVars.white}
                  sizeText={16}
                  colorIcon={GlobalVars.white}
                  sizeIcon={20}
                  iconOptionN="map-pin"
                  onPress={() => showChangeGps()}
                  aditionalStyle={styles.optionTouch}
                  customChevronStyle={styles.chevronArrow}
                />

                {/* <OptionTouchable
                  text="Logo"
                  colorText={GlobalVars.white}
                  sizeText={16}
                  colorIcon={GlobalVars.white}
                  sizeIcon={20}
                  iconOption="image"
                  onPress={() => showChangePhoto()}
                  aditionalStyle={styles.optionTouch}
                  customChevronStyle={styles.chevronArrow}
                /> */}

                <OptionTouchable
                  text="Logo"
                  colorText={GlobalVars.white}
                  sizeText={16}
                  colorIcon={GlobalVars.white}
                  sizeIcon={20}
                  iconOptionN="logo"
                  onPress={() => showSelectAvatar()}
                  aditionalStyle={styles.optionTouch}
                  customChevronStyle={styles.chevronArrow}
                />

                <OptionTouchable
                  text="Portada"
                  colorText={GlobalVars.white}
                  sizeText={16}
                  colorIcon={GlobalVars.white}
                  sizeIcon={20}
                  iconOptionN="Portada"
                  onPress={() => showSelectFrontChoose()}
                  aditionalStyle={styles.optionTouch}
                  customChevronStyle={styles.chevronArrow}
                />

                <OptionTouchable
                  text="Días de atención"
                  colorText={GlobalVars.white}
                  sizeText={16}
                  colorIcon={GlobalVars.white}
                  sizeIcon={20}
                  iconOptionN="dias"
                  onPress={() => showChangeDays()}
                  aditionalStyle={styles.optionTouch}
                  customChevronStyle={styles.chevronArrow}
                />

                <OptionTouchable
                  text="Horario de atención"
                  colorText={GlobalVars.white}
                  sizeText={16}
                  colorIcon={GlobalVars.white}
                  sizeIcon={20}
                  iconOptionN="clock"
                  onPress={() => showChangeHours()}
                  aditionalStyle={styles.optionTouch}
                  customChevronStyle={styles.chevronArrow}
                />

                <OptionTouchable
                  text="Canales de contacto"
                  colorText={GlobalVars.white}
                  sizeText={16}
                  colorIcon={GlobalVars.white}
                  sizeIcon={20}
                  iconOptionN="Canales"
                  onPress={() => showChangeChannels()}
                  aditionalStyle={styles.optionTouch}
                  customChevronStyle={styles.chevronArrow}
                />

                {!saving ? (
                  <ButtonComponent
                    text="Guardar"
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
          entrepreneur={entrepreneur}
          getRandomNumberDispatch={getRandomNumberDispatch}
          selectCat={categorySelected}
          setCategorySelected={setCategorySelected}
          isEntrepreneurUpdate
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
          entrepreneur={entrepreneur}
          getRandomNumberDispatch={getRandomNumberDispatch}
          avatarSelected={avatarSelected}
          setAvatarSelected={setAvatarSelected}
          imageEntrepreneur={imageEntrepreneur}
          setImageEntrepreneur={setImageEntrepreneur}
          isOpenPhoto={isOpenPhoto}
          showChangePhoto={showChangePhoto}
          isEntrepreneurUpdate
        />
      </ModalTemplate>

      <ModalTemplate
        openModal={isOpenFrontChoose}
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
        <PickerFront
          onClose={() => showSelectFrontChoose()}
          _jwt={_jwt}
          entrepreneur={entrepreneur}
          getRandomNumberDispatch={getRandomNumberDispatch}
          frontSelected={frontSelected}
          setFrontSelected={setFrontSelected}
          isOpenPhotoFront={isOpenPhotoFront}
          showChangePhotoFront={() => showChangePhotoFront()}
          frontEntrepreneur={frontEntrepreneur}
          setFrontEntrepreneur={setFrontEntrepreneur}
          isEntrepreneurUpdate
        />
      </ModalTemplate>

      <ModalTemplate
        openModal={isOpenGps}
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
        <PickerLocationShop
          gps={dataEntrepreneur?.attributes?.gps}
          nameAddress={dataEntrepreneur?.attributes?.address}
          onClose={() => showChangeGps()}
          _jwt={_jwt}
          entrepreneur={entrepreneur}
          getRandomNumberDispatch={getRandomNumberDispatch}
          isEntrepreneurUpdate
        />
      </ModalTemplate>

      <ModalTemplate
        openModal={isOpenDays}
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
        <PickerDaysShop
          officeDays={dataEntrepreneur?.attributes?.officeDays?.workDays}
          onClose={() => showChangeDays()}
          _jwt={_jwt}
          entrepreneur={entrepreneur}
          getRandomNumberDispatch={getRandomNumberDispatch}
          isEntrepreneurUpdate
        />
      </ModalTemplate>

      {dataEntrepreneur?.attributes?.officeHours && (
        <ModalTemplate
          openModal={isOpenHours}
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
          <PickerHoursShop
            hoursT={dataEntrepreneur?.attributes?.officeHours}
            onClose={() => showChangeHours()}
            _jwt={_jwt}
            entrepreneur={entrepreneur}
            getRandomNumberDispatch={getRandomNumberDispatch}
            isEntrepreneurUpdate
          />
        </ModalTemplate>
      )}

      <ModalTemplate
        openModal={isOpenChannels}
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
        <PickerChannelsShop
          channels={dataEntrepreneur?.attributes?.contactChannels}
          onClose={() => showChangeChannels()}
          _jwt={_jwt}
          entrepreneur={entrepreneur}
          getRandomNumberDispatch={getRandomNumberDispatch}
          isEntrepreneurUpdate
        />
      </ModalTemplate>
    </WrappingViews>
  );
};

export default EditEntrepreneurScreen;

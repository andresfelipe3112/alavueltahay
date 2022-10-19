import React, { useState, useEffect } from "react";

import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  Image,
  StyleSheet,
} from "react-native";

import { Select } from "native-base";

import { Entypo, AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import GlobalVars from "../../../global/globalVars";

import { socialNetworks } from "../../../mock/socialNetworks";
import { hoursCollection } from "../../../mock/hoursCollection";

import panoramaData from "../../../helpers/dataPanorama";

import { useKeyboard } from "../../../utils/useKeyboard";
import recoveringStateLocation from "../../../utils/useGPS";

import MapViewComponent from "../MapView";
import LabelTextComponent from "../../atoms/LabelText";
import ButtonComponent from "../../atoms/ButtonComponent";
import ImageUriComponent from "../../atoms/ImageUriComponent";
import InputEntry from "../../molecules/InputEntry";
import ScrollView from "../../templates/ScrollView";

import Styles from "./style";

const styles = Styles;

const PickerAddPanorama = ({
  isPanoramaCreate = false,
  _jwt = null,
  user = null,
  ...props
}) => {
  const { onClose, getRandomNumberDispatch } = props;

  const isKeyBoardOpen = useKeyboard();

  const [panorama, setPanorama] = useState("");
  const [address, setAddress] = useState("");
  const [timeP, setTimeP] = useState(hoursCollection[17].hour);
  const [dateP, setDateP] = useState("");
  const [description, setDescription] = useState("");
  const [gps, setGps] = useState({});

  const [avatar, setAvatar] = useState(null);
  const [filePath, setFilePath] = useState(null);

  const [fb, setFb] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [mail, setMail] = useState("");
  const [calls, setCalls] = useState("");

  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const [showInstagram, setShowInstagram] = useState(false);
  const [showFb, setShowFb] = useState(false);
  const [showTiktok, setShowTiktok] = useState(false);
  const [showCalls, setShowCalls] = useState(false);
  const [showMail, setShowMail] = useState(false);

  const [isPickerShow, setIsPickerShow] = useState(false);
  const [dateNow, setDateNow] = useState(new Date());
  const [maxDateSelect, setMaxDateSelect] = useState(null);
  const [minDateSelect, setMinDateSelect] = useState(null);

  const [errMsg, setErrMsg] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMount = true;

    if (isMount) {
      // Data in CMS
      onRecoverData();
    }

    return () => {
      isMount = false;
    };
  }, []);

  const onRecoverData = async () => {
    await captureGps();
    await settingsDatepicker();
  };

  const settingsDatepicker = async () => {
    let d = new Date();
    d = new Date(
      Date.UTC(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds()
      )
    );
    await setDateNow(d);
    await setMinDateSelect(d);

    let d1 = new Date();
    d1 = new Date(
      Date.UTC(
        d1.getFullYear(),
        d1.getMonth(),
        d1.getDate(),
        d1.getHours(),
        d1.getMinutes(),
        d1.getSeconds()
      )
    );

    await d1.setDate(d1.getDate() + 120);
    await setMaxDateSelect(d1);
  };

  const captureGps = async () => {
    let recover = await recoveringStateLocation();
    while (recover === "error" || !recover) {
      recover = await recoveringStateLocation();
    }
    setGps({
      latitude: recover?.coords?.latitude,
      longitude: recover?.coords?.longitude,
    });
  };

  const getMimeType = (ext) => {
    // mime type mapping for few of the sample file types
    switch (ext) {
      case "jpg":
        return "image/jpeg";
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
    }
  };

  const requestCameraPermission = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();
      return permissionResult;
    } catch (err) {
      // console.warn(err);
      setErrMsg("Error de permisos de cámara");
      setShowErr(true);
      setTimeout(() => {
        setShowErr(false);
      }, 1200);
      return false;
    }
  };

  const requestMediaLibraryPermission = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      return permissionResult;
    } catch (err) {
      // console.warn(err);
      setErrMsg("Error de permisos de cámara");
      setShowErr(true);
      setTimeout(() => {
        setShowErr(false);
      }, 1200);
      return false;
    }
  };

  const captureImage = async () => {
    const isCameraPermitted = await requestCameraPermission();
    const isStoragePermitted = await requestMediaLibraryPermission();
    if (isCameraPermitted?.granted && isStoragePermitted?.granted) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });

      const fileUri = result?.uri;
      let filename = fileUri?.split("/").pop() || "";
      const extArr = /\.(\w+)$/.exec(filename);
      const type = getMimeType(extArr[1]);

      if (!result?.cancelled) {
        setFilePath(
          result?.uri
            ? {
                uri: result?.uri || "",
                type: result?.type || "",
                width: result?.width || 0,
                height: result?.height || 0,
                format: type || "",
              }
            : null
        );
      } else {
        setErrMsg("El usuario ha cancelado la carga.");
        setShowErr(true);
        setTimeout(() => {
          setShowErr(false);
        }, 1200);
      }
    }
  };

  const chooseFile = async () => {
    const isStoragePermitted = await requestMediaLibraryPermission();
    if (isStoragePermitted?.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });

      const fileUri = result?.uri;
      let filename = fileUri?.split("/").pop() || "";
      const extArr = /\.(\w+)$/.exec(filename);
      const type = getMimeType(extArr[1]);

      if (!result?.cancelled) {
        setFilePath(
          result?.uri
            ? {
                uri: result?.uri || "",
                type: result?.type || "",
                width: result?.width || 0,
                height: result?.height || 0,
                format: type || "",
              }
            : null
        );
      } else {
        setErrMsg("El usuario ha cancelado la carga.");
        setShowErr(true);
        setTimeout(() => {
          setShowErr(false);
        }, 1200);
      }
    }
  };

  const onHandleSocialNetworks = (item) => {
    switch (item) {
      case "whatsapp":
        setShowWhatsapp(!showWhatsapp);
        break;

      case "instagram":
        setShowInstagram(!showInstagram);
        break;

      case "facebook":
        setShowFb(!showFb);
        break;

      case "tiktok":
        setShowTiktok(!showTiktok);
        break;

      case "llamada":
        setShowCalls(!showCalls);
        break;

      case "correo":
        setShowMail(!showMail);
        break;
    }
  };

  const savePanorama = async () => {
    try {
      setLoading(true);

      const dataChannels = [
        {
          channel: whatsapp,
          id: 1,
          name: "whatsapp",
        },
        {
          channel: instagram,
          id: 2,
          name: "instagram",
        },
        {
          channel: fb,
          id: 3,
          name: "facebook",
        },
        {
          channel: tiktok,
          id: 4,
          name: "tiktok",
        },
        {
          channel: calls,
          id: 5,
          name: "llamada",
        },
        {
          channel: mail,
          id: 6,
          name: "correo",
        },
      ];

      if (!panorama) {
        setErrMsg("Ingrese un nombre a su nuevo panorama.");
        setShowErr(true);
        setLoading(false);
        setTimeout(() => {
          setShowErr(false);
        }, 1200);
      } else if (!address) {
        setErrMsg("Ingrese una dirección.");
        setShowErr(true);
        setLoading(false);
        setTimeout(() => {
          setShowErr(false);
        }, 1200);
      } else if (!gps?.latitude || !gps?.longitude) {
        setErrMsg(
          "La dirección no se ha podido obtener en el mapa, seleccionelo de nuevo."
        );
        setShowErr(true);
        setLoading(false);
        setTimeout(() => {
          setShowErr(false);
        }, 1200);
      } else if (!timeP) {
        setErrMsg("Ingrese la hora de realización del evento.");
        setShowErr(true);
        setLoading(false);
        setTimeout(() => {
          setShowErr(false);
        }, 1200);
      } else if (!dateP) {
        setErrMsg("Ingrese la fecha de realización del evento.");
        setShowErr(true);
        setLoading(false);
        setTimeout(() => {
          setShowErr(false);
        }, 1200);
      } else if (!filePath && !avatar) {
        setErrMsg("No ha cargado ninguna imagen al panorama.");
        setShowErr(true);
        setLoading(false);
        setTimeout(() => {
          setShowErr(false);
        }, 1200);
      } else if (!user?.id) {
        setErrMsg("Error en la conexión de su dispositivo.");
        setShowErr(true);
        setLoading(false);
        setTimeout(() => {
          setShowErr(false);
        }, 1200);
      } else {
        const dataSend = {
          panorama,
          time: timeP,
          date: dateP,
          contactChannels: dataChannels,
          gps,
          description,
          address,
          usr: user?.id,
          filePath: filePath,
        };

        const res = await panoramaData.addPanorama(
          {
            panorama: dataSend,
          },
          _jwt
        );

        if (res) {
          setLoading(false);
          onClose();
          getRandomNumberDispatch();
        } else {
          setErrMsg("Ocurrió un error durante el registro de datos.");
          setShowErr(true);
          setTimeout(() => {
            setShowErr(false);
          }, 1500);
          setLoading(false);
        }
      }
    } catch (e) {
      setErrMsg("Ocurrió un error durante el registro de datos.");
      setShowErr(true);
      setLoading(false);
      setTimeout(() => {
        setShowErr(false);
      }, 1500);
    }
  };

  const onChangeDateP = (event, value) => {
    if (value) {
      setDateNow(value);
      setDateP(
        `${value.getDate() < 10 ? "0" : ""}${value.getDate()}-${
          value.getMonth() < 10 ? "0" : ""
        }${value.getMonth() + 1}-${value.getFullYear()}`
      );
    }

    if (Platform.OS === "android") setIsPickerShow(false);
  };

  const optionsHours = (hoursCollection.length &&
    hoursCollection.map((hour) => {
      return (
        <Select.Item
          key={"hour_" + hour?.id}
          label={hour?.hour}
          value={hour?.hour}
        />
      );
    })) || <></>;

  const optionsSocial = (socialNetworks.length &&
    socialNetworks.map((social) => {
      const nameSocial = social?.name || "";

      let socialIcon = null,
        inputSocial = null;

      switch (nameSocial) {
        case "whatsapp":
          socialIcon = (
            <View style={[styles2.container]}>
              <Image
                style={styles2.stretch}
                source={require("../../../../assets/whatsapp_orange.png")}
              />
            </View>
          );

          inputSocial = (
            <View
              style={{
                width: "100%",
                display: showWhatsapp ? "flex" : "none",
              }}
            >
              <InputEntry
                key={"social_entry_" + social?.id}
                label="+56912345678"
                textvariable={whatsapp}
                setValue={(val) => setWhatsapp(val)}
                type={"telephoneNumber"}
                keyboard={"phone-pad"}
                colorTextInput={GlobalVars.blueOpaque}
                colorPlaceholder={GlobalVars.textGrayColor}
              />
            </View>
          );
          break;

        case "instagram":
          socialIcon = (
            <View style={[styles2.container]}>
            <Image
              style={styles2.stretch}
              source={require("../../../../assets/instagram_orange.png")}
            />
          </View>
          );

          inputSocial = (
            <View
              style={{
                width: "100%",
                display: showInstagram ? "flex" : "none",
              }}
            >
              <InputEntry
                key={"social_entry_" + social?.id}
                label="Link de tu página"
                textvariable={instagram}
                setValue={(val) => setInstagram(val.toLowerCase())}
                type="URL"
                keyboard="url"
                colorTextInput={GlobalVars.blueOpaque}
                colorPlaceholder={GlobalVars.textGrayColor}
              />
            </View>
          );
          break;

        case "facebook":
          socialIcon = (
            <View style={[styles2.container]}>
            <Image
              style={styles2.stretch}
              source={require("../../../../assets/facebook_orange.png")}
            />
          </View>
          );

          inputSocial = (
            <View
              style={{
                width: "100%",
                display: showFb ? "flex" : "none",
              }}
            >
              <InputEntry
                key={"social_entry_" + social?.id}
                label="Link de tu página"
                textvariable={fb}
                setValue={(val) => setFb(val.toLowerCase())}
                type="URL"
                keyboard="url"
                colorTextInput={GlobalVars.blueOpaque}
                colorPlaceholder={GlobalVars.textGrayColor}
              />
            </View>
          );
          break;

        case "tiktok":
          socialIcon = (
            <View style={[styles2.container]}>
            <Image
              style={styles2.stretch}
              source={require("../../../../assets/tik_tok_orange.png")}
            />
          </View>
          );

          inputSocial = (
            <View
              style={{
                width: "100%",
                display: showTiktok ? "flex" : "none",
              }}
            >
              <InputEntry
                key={"social_entry_" + social?.id}
                label="Link de Tiktok"
                textvariable={tiktok}
                setValue={(val) => setTiktok(val.toLowerCase())}
                type="URL"
                keyboard="url"
                colorTextInput={GlobalVars.blueOpaque}
                colorPlaceholder={GlobalVars.textGrayColor}
              />
            </View>
          );
          break;

        case "llamada":
          socialIcon = (
            <View style={[styles2.container]}>
            <Image
              style={styles2.stretch}
              source={require("../../../../assets/fono_orange.png")}
            />
          </View>
          );

          inputSocial = (
            <View
              style={{
                width: "100%",
                display: showCalls ? "flex" : "none",
              }}
            >
              <InputEntry
                key={"social_entry_" + social?.id}
                label="+56912345678"
                textvariable={calls}
                setValue={(val) => setCalls(val)}
                type={"telephoneNumber"}
                keyboard={"phone-pad"}
                colorTextInput={GlobalVars.blueOpaque}
                colorPlaceholder={GlobalVars.textGrayColor}
              />
            </View>
          );
          break;

        case "correo":
          socialIcon = (
            <View style={[styles2.container]}>
            <Image
              style={styles2.stretch}
              source={require("../../../../assets/mail.png")}
            />
          </View>
          );

          inputSocial = (
            <View
              style={{
                width: "100%",
                display: showMail ? "flex" : "none",
              }}
            >
              <InputEntry
                key={"social_entry_" + social?.id}
                label="Correo de contacto"
                textvariable={mail}
                setValue={(val) => setMail(val.toLowerCase())}
                type="URL"
                keyboard="url"
                colorTextInput={GlobalVars.blueOpaque}
                colorPlaceholder={GlobalVars.textGrayColor}
              />
            </View>
          );
          break;
      }

      return (
        <View style={{ width: "100%" }} key={"social_" + social?.id}>
          <TouchableOpacity
            style={[
              styles.socialView,
              {
                paddingVertical: 5,
              },
            ]}
            onPress={() => onHandleSocialNetworks(social?.name)}
          >
            {socialIcon}
            <View style={{ width: 15, height: "100%" }} />
            <LabelTextComponent
              text={social?.name || ""}
              color={GlobalVars.blueOpaque}
              size={15}
              customStyleBtn={{ textTransform: "capitalize" }}
            />
          </TouchableOpacity>
          {inputSocial}
        </View>
      );
    })) || <></>;

  return (
    <SafeAreaView>
      <View style={styles.view}>
        {!loading && (
          <LabelTextComponent
            text="Crear panorama"
            color={GlobalVars.blueOpaque}
            size={20}
          />
        )}

        {loading && (
          <View
            style={{
              width: "100%",
              height: GlobalVars.windowHeight / 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator color={GlobalVars.orange} size="large" />
          </View>
        )}

        {showErr && errMsg && (
          <TouchableOpacity onPress={() => setShowErr(false)}>
            <LabelTextComponent
              text={errMsg}
              color={GlobalVars.googleColor}
              size={13}
            />
          </TouchableOpacity>
        )}

        {!loading && (
          <View style={styles.containerScroll}>
            <ScrollView
              style={styles.scrolling}
              contentContainerStyle={[
                styles.wrapScrollView,
                {
                  paddingBottom: isKeyBoardOpen
                    ? GlobalVars.windowHeight / 3
                    : 25,
                },
              ]}
              colorScrollBar={GlobalVars.orange}
              keyboardShouldPersistTaps="always"
            >
              <TouchableOpacity style={styles.unityView} activeOpacity={1}>
                <LabelTextComponent
                  text="Datos del panorama"
                  color={GlobalVars.textGrayColor}
                  size={15}
                />

                <LabelTextComponent
                  text="Nombre de actividad"
                  color={GlobalVars.textGrayColor}
                  size={13}
                />
                <View style={styles.setBoxes}>
                  <TextInput
                    style={styles.inputDescription}
                    onChangeText={(val) => setPanorama(val)}
                    value={panorama}
                    placeholder="Nombre de actividad *"
                    keyboardType="default"
                    placeholderTextColor="rgba(0, 0, 0, 0.3)"
                  />
                </View>

                <LabelTextComponent
                  text="Descripción de actividad"
                  color={GlobalVars.textGrayColor}
                  size={13}
                />
                <View style={styles.setBoxes}>
                  <TextInput
                    style={styles.inputDescription}
                    onChangeText={(val) => setDescription(val)}
                    value={description}
                    placeholder="Descripción *"
                    keyboardType="default"
                    placeholderTextColor="rgba(0, 0, 0, 0.3)"
                    multiline
                    numberOfLines={3}
                  />
                </View>

                <View
                  style={[styles.rowHour, { justifyContent: "space-between" }]}
                >
                  <LabelTextComponent
                    text="Inicio: "
                    color={GlobalVars.blueOpaque}
                    size={15}
                  />
                  <View style={styles.columnSeparator} />
                  <Select
                    selectedValue={timeP || "08:00"}
                    accessibilityLabel="Apertura"
                    placeholder="Apertura"
                    fontFamily={GlobalVars.fontFamily}
                    width={GlobalVars.windowWidth / 2}
                    color={GlobalVars.white}
                    borderColor={GlobalVars.orange}
                    backgroundColor={GlobalVars.orange}
                    _selectedItem={{
                      bg: "orange.100",
                      endIcon: (
                        <AntDesign
                          name="check"
                          size={20}
                          color={GlobalVars.orange}
                        />
                      ),
                      borderColor: GlobalVars.orange,
                    }}
                    _hover={{
                      backgroundColor: GlobalVars.blueOpaque,
                      color: GlobalVars.white,
                    }}
                    customDropdownIconProps={{
                      color: GlobalVars.white,
                      marginRight: 2,
                    }}
                    onValueChange={(itemValue) => setTimeP(itemValue)}
                  >
                    {optionsHours}
                  </Select>
                </View>

                <View
                  style={{
                    width: "100%",
                    marginBottom: 20,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      borderRadius: 7,
                      borderWidth: 0.5,
                      backgroundColor: GlobalVars.firstColor,
                      borderColor: GlobalVars.firstColor,
                    }}
                    onPress={() => setIsPickerShow(!isPickerShow)}
                  >
                    <LabelTextComponent
                      size={15}
                      text={dateP || "Definir fecha"}
                      color={GlobalVars.white}
                    />
                  </TouchableOpacity>
                  {(isPickerShow && (
                    <DateTimePicker
                      locale={"es"}
                      value={dateNow}
                      mode={"date"}
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      is24Hour={true}
                      minimumDate={minDateSelect}
                      maximumDate={maxDateSelect}
                      onChange={onChangeDateP}
                      style={styles.datePicker}
                    />
                  )) || <></>}
                </View>

                <LabelTextComponent
                  text="¿Dónde se realizará?"
                  color={GlobalVars.textGrayColor}
                  size={15}
                />
                {/* <LabelTextComponent
                  text="Dirección descriptiva"
                  color={GlobalVars.textGrayColor}
                  size={13}
                /> */}
                <View style={styles.setBoxes}>
                  {/* <TextInput
                    style={styles.inputDescription}
                    onChangeText={(val) => setAddress(val)}
                    value={address}
                    placeholder="Dirección *"
                    keyboardType="default"
                    placeholderTextColor="rgba(0, 0, 0, 0.3)"
                  /> */}

                  <GooglePlacesAutocomplete
                    placeholder="Dirección *"
                    fetchDetails={true}
                    minLength={3}
                    onPress={(data, details = null) => {
                      // console.log(data, details);
                      setAddress(data?.description || "");
                      if (
                        details?.geometry?.location?.lat &&
                        details.geometry.location.lng
                      ) {
                        setGps({
                          latitude: details?.geometry?.location?.lat,
                          longitude: details.geometry.location.lng,
                        });
                      }
                    }}
                    onFail={(error) => console.error(error)}
                    query={{
                      key: GlobalVars.API_GCP,
                      language: "es",
                    }}
                    styles={{
                      description: {
                        fontWeight: "bold",
                      },
                      container: {
                        flex: 0,
                        width: "100%",
                        borderBottomColor: GlobalVars.black,
                      },
                      listView: {
                        backgroundColor: GlobalVars.white,
                      },
                      textInput: {
                        borderWidth: 0.4,
                      },
                    }}
                    GooglePlacesSearchQuery={{ rankby: "distance" }}
                    listViewDisplayed={false}
                    keepResultsAfterBlur={
                      Platform.OS === "android" ? true : false
                    }
                    autoFocus={false}
                    returnKeyType={"default"}
                    numberOfLines={2}
                    enablePoweredByContainer={false}
                  />
                </View>

                <View style={styles.mapContainer}>
                  {gps && gps?.latitude && gps.longitude && (
                    <MapViewComponent
                      coords={gps || false}
                      onChangeCoords={setGps}
                    />
                  )}
                </View>

                <View
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 20,
                  }}
                >
                  <LabelTextComponent
                    text="Imagen del evento"
                    color={GlobalVars.textGrayColor}
                    size={15}
                  />
                  <View style={{ width: "100%", paddingBottom: 5 }} />
                  {!filePath && !filePath?.uri && (
                   <View style={[styles2.containerFocus]}>
                   <Image
                     style={styles2.stretchFocus}
                     source={require("../../../../assets/Camera.png")}
                   />
                 </View>
                  )}

                  {filePath && filePath?.uri && (
                    <ImageUriComponent
                      width={GlobalVars.windowWidth / 4}
                      height={GlobalVars.windowWidth / 4}
                      img={{ uri: filePath?.uri }}
                      radius={150}
                      borderBottomRadius={150}
                      borderTopRadius={150}
                      mode="cover"
                    />
                  )}
                </View>

                <View
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      borderRadius: 7,
                      backgroundColor: GlobalVars.orange,
                      marginBottom: 20,
                    }}
                    onPress={() => chooseFile()}
                  >
                    <LabelTextComponent
                      text="Selecciona una foto"
                      color={GlobalVars.white}
                      size={13}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      width: "100%",
                      borderRadius: 7,
                      backgroundColor: GlobalVars.orange,
                      marginBottom: 20,
                    }}
                    onPress={() => captureImage()}
                  >
                    <LabelTextComponent
                      text="Toma una foto"
                      color={GlobalVars.white}
                      size={13}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 20,
                  }}
                >
                  <LabelTextComponent
                    text="Canales de contacto"
                    color={GlobalVars.textGrayColor}
                    size={15}
                  />
                  <View style={{ width: "100%", paddingBottom: 5 }} />
                  {optionsSocial}
                </View>
              </TouchableOpacity>

              <ButtonComponent
                text="Guardar"
                color={GlobalVars.orange}
                textColor={GlobalVars.white}
                Action={() => savePanorama()}
              />
            </ScrollView>
          </View>
        )}

        <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
        <View style={[styles2.container,{left:10,
    top:-10}]}>
          <Image
            style={styles2.stretch}
            source={require("../../../../assets/close-orange.png")}
          />
        </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PickerAddPanorama;

const styles2 = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    left:-3,
  },
  stretch: {
    width: 40,
    height: 40,
    resizeMode: "stretch",
  },
  containerFocus: {
    width: 200,
    height: 200,
  },
  stretchFocus: {
    width: 200,
    height: 200,
  },
});

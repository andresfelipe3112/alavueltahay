import React, { useState, useEffect } from "react";

import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

import { Entypo } from "@expo/vector-icons";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import GlobalVars from "../../../global/globalVars";

import updateDataEntrepreneur from "../../../helpers/updateDataEntrepreneur";

import recoveringStateLocation from "../../../utils/useGPS";

import MapViewComponent from "../MapView";
import LabelTextComponent from "../../atoms/LabelText";
import ButtonComponent from "../../atoms/ButtonComponent";

import Styles from "./style";
import { Cancel } from "../../molecules/cancel";

const styles = Styles;

const PickerLocationShop = ({
  isEntrepreneurUpdate = false,
  _jwt = null,
  entrepreneur = null,
  ...props
}) => {
  const { onClose, getRandomNumberDispatch } = props;

  const [gps, setGps] = useState(props.gps || null);
  const [nameAddress, setNameAddres] = useState(props.nameAddress || "");
  const [errMsg, setErrMsg] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

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

  const saveLocation = async () => {
    try {
      setLoading(true);
      if (!nameAddress) {
        setErrMsg("La dirección de su emprendimiento es incorrecta.");
        setShowErr(true);
        setLoading(false);
        setTimeout(() => {
          setShowErr(false);
        }, 1200);
      } else if (!gps && gps?.latitude && gps?.longitude) {
        setErrMsg("La localización de su emprendimiento es incorrecta.");
        setShowErr(true);
        setLoading(false);
        setTimeout(() => {
          setShowErr(false);
        }, 1200);
      } else {
        const res = await updateDataEntrepreneur.entrepreneurGps(
          {
            id: entrepreneur.id,
            address: nameAddress,
            GPS: gps,
          },
          _jwt
        );

        if (res) {
          setLoading(false);
          onClose();
          getRandomNumberDispatch();
        } else {
          setErrMsg("Ocurrió un error durante la actualización de datos");
          setShowErr(true);
          setTimeout(() => {
            setShowErr(false);
          }, 1200);
          setLoading(false);
        }
      }
    } catch (e) {
      setErrMsg("Ocurrió un error durante la actualización de datos.");
      setShowErr(true);
      setLoading(false);
      setTimeout(() => {
        setShowErr(false);
      }, 1200);
    }
  };

  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      console.log('sube');
      
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      console.log('baja');
      
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View style={[styles.view, Platform.OS ==='android' && keyboardStatus === "Keyboard Shown" && {marginTop:330}]}>

      {!loading && (
        <LabelTextComponent
          style={{ top: Platform.OS === "ios" ?-17: -25, alignSelf: "center", left: -5}}
          text="Edita tu ubicación"
          color={GlobalVars.blueOpaque}
          size={20}
        />
      )}
      {loading && <ActivityIndicator color={GlobalVars.orange} size="large" />}

      {!loading && (
        // <InputSearch
        //   label="Dirección de tu negocio"
        //   iconName={nameAddress ? "x" : "search"}
        //   textvariable={nameAddress || ""}
        //   setValue={(val) => setNameAddres(val)}
        //   bgBlue
        // />

        <GooglePlacesAutocomplete
          placeholder="Dirección *"
          fetchDetails={true}
          minLength={3}
          onPress={(data, details = null) => {
            // console.log(data, details);
            setNameAddres(data?.description || "");
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
              maxHeight: 100,
            },
            textInput: {
              borderWidth: 0.4,
            },
          }}
          GooglePlacesSearchQuery={{ rankby: "distance" }}
          listViewDisplayed={false}
          keepResultsAfterBlur={Platform.OS === "android" ? true : false}
          autoFocus={false}
          returnKeyType={"default"}
          numberOfLines={2}
          enablePoweredByContainer={false}
        />
      )}

      {!loading && (
        <View style={styles.mapContainer}>
          {gps && (
            <MapViewComponent coords={gps || false} onChangeCoords={setGps} />
          )}
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
        <ButtonComponent
          text="Capturar mi ubicación"
          color={GlobalVars.orange}
          textColor={GlobalVars.white}
          Action={() => captureGps()}
        />
      )}

      {!loading && gps && (
        <ButtonComponent
          text="Guardar"
          color={GlobalVars.orange}
          textColor={GlobalVars.white}
          Action={() => saveLocation()}
        />
      )}

      <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
      <Cancel/>
      </TouchableOpacity>
    </View>
  );
};

export default PickerLocationShop;

import React, { useState, useEffect } from "react";

import { View, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from "react-native";

import { Entypo, Feather } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

import GlobalVars from "../../../global/globalVars";

import dataProduct from "../../../helpers/dataProduct";

import LabelTextComponent from "../../atoms/LabelText";
import ButtonComponent from "../../atoms/ButtonComponent";
import ImageUriComponent from "../../atoms/ImageUriComponent";

import Styles from "./style";

const styles = Styles;

const PickerImage = ({ isUpdateProduct = false, ...props }) => {
  const { onClose, handleImg } = props;

  const [filePath, setFilePath] = useState(props.imageProduct || null);
  const [errMsg, setErrMsg] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

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
      let filename = fileUri.split("/").pop();
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
      let filename = fileUri.split("/").pop();
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

  const savePhoto = async (method) => {
    try {
      if (method === 1) {
        setLoading(true);
        if (filePath) {
          handleImg(filePath);
          onClose();
          return;
        } else {
          setErrMsg("No ha seleccionado imagen");
          setShowErr(true);
          setLoading(false);
          setTimeout(() => {
            setShowErr(false);
          }, 1200);
        }
      } else if (method === 2) {
        setLoading(true);
        const { _jwt, getRandomNumberDispatch } = props;
        if (filePath && _jwt) {
          const res = await dataProduct.updateImageProduct(
            props.imageProduct,
            filePath,
            _jwt
          );
          if (res) {
            handleImg(filePath);
            onClose();
            getRandomNumberDispatch();
            setLoading(false);
            return;
          } else {
            setErrMsg("Un error ha ocurrido");
            setShowErr(true);
            setLoading(false);
            setTimeout(() => {
              setShowErr(false);
            }, 1200);
          }
        } else {
          setErrMsg("No ha seleccionado imagen");
          setShowErr(true);
          setLoading(false);
          setTimeout(() => {
            setShowErr(false);
          }, 1200);
        }
      }
    } catch (e) {
      setErrMsg("Un error ha ocurrido");
      setShowErr(true);
      setLoading(false);
      setTimeout(() => {
        setShowErr(false);
      }, 1200);
    }
  };

  return (
    <View style={styles.view}>
      {!filePath && !filePath?.uri && !loading && (
        <View style={[styles2.containerFocus]}>
        <Image
          style={styles2.stretchFocus}
          source={require("../../../../assets/Camera.png")}
        />
      </View>
      )}

      {filePath && filePath?.uri && !loading && (
        <ImageUriComponent
          width={GlobalVars.windowWidth / 2}
          height={GlobalVars.windowWidth / 2}
          img={{ uri: filePath?.uri }}
          radius={150}
          mode="cover"
          borderTopRadius={150}
          borderBottomRadius={150}
        />
      )}

      {loading && <ActivityIndicator color={GlobalVars.orange} size="large" />}

      {/* <LabelTextComponent
        text="Seleccione una imagen"
        color={GlobalVars.firstColor}
        size={20}
      /> */}

      {!loading && (
        <View style={{ width: "100%", height: GlobalVars.windowHeight / 15 }} />
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
          text="Tomar una foto"
          color={GlobalVars.orange}
          textColor={GlobalVars.white}
          Action={() => captureImage()}
        />
      )}

      {!loading && (
        <ButtonComponent
          text="Abrir galería"
          color={GlobalVars.orange}
          textColor={GlobalVars.white}
          Action={() => chooseFile()}
        />
      )}

      {(!loading &&
        filePath?.uri &&
        filePath?.uri !== props.imageProduct?.uri && (
          <ButtonComponent
            text="Guardar"
            color={GlobalVars.orange}
            textColor={GlobalVars.white}
            Action={() => savePhoto(2)}
          />
        )) || <></>}

      <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
      <View style={[styles2.container]}>
              <Image
                style={styles2.stretch}
                source={require("../../../../assets/close-orange.png")}
              />
            </View>
      </TouchableOpacity>
    </View>
  );
};

export default PickerImage;

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
    width: 200,
    height: 200,
  },
  stretchFocus: {
    width: 200,
    height: 200,
  },
});

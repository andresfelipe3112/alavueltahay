import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";

import { Entypo, Feather } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

import GlobalVars from "../../../global/globalVars";

import { GET_ENTREPRENEUR_BY_ID } from "../../../mock/entrepreneurById";

import productData from "../../../helpers/dataProduct";

import LabelTextComponent from "../../atoms/LabelText";
import ButtonComponent from "../../atoms/ButtonComponent";
import ImageUriComponent from "../../atoms/ImageUriComponent";
import ScrollView from "../../templates/ScrollView";

import Styles from "./style";

const styles = Styles;

const PickerAddProduct = ({
  isEntrepreneurUpdate = false,
  _jwt = null,
  entrepreneur = null,
  ...props
}) => {
  const { onClose, getRandomNumberDispatch } = props;

  const [dataShop, setDataShop] = useState(null);
  const [unity, setUnity] = useState("unidad");
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [delivery, setDelivery] = useState(false);
  const [isStarProduct, setIsStarProduct] = useState(false);

  const [filePath, setFilePath] = useState(null);

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
    const res = await GET_ENTREPRENEUR_BY_ID(_jwt, entrepreneur?.id);
    setDataShop(res);
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

  const saveProduct = async () => {
    try {
      setLoading(true);
      if (!description) {
        setErrMsg("Ingrese una descripción para el producto.");
        setShowErr(true);
        setLoading(false);
        setTimeout(() => {
          setShowErr(false);
        }, 1200);
      } else if (!entrepreneur?.id) {
        setErrMsg("Datos incorrectos, revise su conexión.");
        setShowErr(true);
        setLoading(false);
        setTimeout(() => {
          setShowErr(false);
        }, 1200);
      } else if (typeof delivery !== "boolean") {
        setErrMsg("Error de red, salga e ingrese de nuevo en la aplicación.");
        setShowErr(true);
        setLoading(false);
        setTimeout(() => {
          setShowErr(false);
        }, 1200);
      } else if (typeof isStarProduct !== "boolean") {
        setErrMsg("Error de red, salga e ingrese de nuevo en la aplicación.");
        setShowErr(true);
        setLoading(false);
        setTimeout(() => {
          setShowErr(false);
        }, 1200);
      } else if (!filePath) {
        setErrMsg("No ha cargado ninguna imagen al producto.");
        setShowErr(true);
        setLoading(false);
        setTimeout(() => {
          setShowErr(false);
        }, 1200);
      } else {
        const dataSend = {
          description: description,
          qty: qty,
          unity: unity,
          price: price,
          shop: entrepreneur?.id,
          delivery: delivery,
          starProduct: isStarProduct,
          filePath: filePath,
        };

        const res = await productData.addProduct(
          {
            product: dataSend,
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
          }, 1200);
          setLoading(false);
        }
      }
    } catch (e) {
      setErrMsg("Ocurrió un error durante el registro de datos.");
      setShowErr(true);
      setLoading(false);
      setTimeout(() => {
        setShowErr(false);
      }, 1200);
    }
  };

  return (
    <View style={styles.view}>
      {!loading && (
        <LabelTextComponent
        style={{top:-15, alignSelf: "center", left: -5}}
          text="Crear producto"
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
            contentContainerStyle={styles.wrapScrollView}
            colorScrollBar={GlobalVars.orange}
          >
            <TouchableOpacity style={styles.unityView} activeOpacity={1}>
              <LabelTextComponent
                text="Producto"
                color={GlobalVars.textGrayColor}
                size={13}
              />
              <View style={styles.setBoxes}>
                <TextInput
                  style={styles.inputDescription}
                  onChangeText={(val) => setDescription(val)}
                  value={description}
                  placeholder="Nombre del producto *"
                  keyboardType="default"
                  placeholderTextColor="rgba(0, 0, 0, 0.3)"
                />
              </View>

              {/* <LabelTextComponent
                text="Cantidad"
                color={GlobalVars.textGrayColor}
                size={13}
              /> */}

              {/* <TextInput
                style={styles.inputQty}
                onChangeText={(val) => setQty(val)}
                value={qty.toString()}
                placeholder="Cantidad *"
                keyboardType="numeric"
                placeholderTextColor="rgba(0, 0, 0, 0.3)"
              /> */}

              {/* <View style={styles.setBoxes}>
                <TouchableOpacity
                  style={[
                    styles.optionBox,
                    {
                      backgroundColor:
                        unity === "unidad"
                          ? GlobalVars.orange
                          : GlobalVars.white,
                    },
                  ]}
                  onPress={() => setUnity("unidad")}
                />
                <Text
                  style={styles.textUnity}
                  onPress={() => setUnity("unidad")}
                >
                  Unidad
                </Text>
                <TouchableOpacity
                  style={[
                    styles.optionBox,
                    {
                      backgroundColor:
                        unity === "litro"
                          ? GlobalVars.orange
                          : GlobalVars.white,
                    },
                  ]}
                  onPress={() => setUnity("litro")}
                />
                <Text
                  style={styles.textUnity}
                  onPress={() => setUnity("litro")}
                >
                  Litros
                </Text>
                <TouchableOpacity
                  style={[
                    styles.optionBox,
                    {
                      backgroundColor:
                        unity === "kilo" ? GlobalVars.orange : GlobalVars.white,
                    },
                  ]}
                  onPress={() => setUnity("kilo")}
                />
                <Text style={styles.textUnity} onPress={() => setUnity("kilo")}>
                  Kilos
                </Text>
              </View> */}

              {/* <LabelTextComponent
                text="Precio"
                color={GlobalVars.textGrayColor}
                size={13}
              />
              <View style={styles.setBoxes}>
                <TextInput
                  style={styles.inputPrice}
                  onChangeText={(val) => setPrice(val)}
                  value={price.toString()}
                  placeholder="Precio *"
                  keyboardType="numeric"
                  placeholderTextColor="rgba(0, 0, 0, 0.3)"
                />
                <Text style={styles.textUnity}>Pesos</Text>
              </View> */}

              <LabelTextComponent
                text="Delivery"
                color={GlobalVars.textGrayColor}
                size={13}
              />
              <View style={styles.boxDelivery}>
                <View style={{ flexDirection: "row", marginBottom: 20 }}>
                  <TouchableOpacity
                    style={[
                      styles.optionBox,
                      {
                        backgroundColor: delivery
                          ? GlobalVars.orange
                          : GlobalVars.white,
                      },
                    ]}
                    onPress={() => setDelivery(true)}
                  />
                  <Text
                    style={styles.textUnity}
                    onPress={() => setDelivery(true)}
                  >
                    Sí dispone delivery
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 20 }}>
                  <TouchableOpacity
                    style={[
                      styles.optionBox,
                      {
                        backgroundColor: !delivery
                          ? GlobalVars.orange
                          : GlobalVars.white,
                      },
                    ]}
                    onPress={() => setDelivery(false)}
                  />
                  <Text
                    style={styles.textUnity}
                    onPress={() => setDelivery(false)}
                  >
                    No dispone delivery
                  </Text>
                </View>
              </View>

              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
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
                  marginTop: 20,
                }}
              >
                <View style={{ flexDirection: "row", marginBottom: 20 }}>
                  <TouchableOpacity
                    style={[
                      styles.optionBox,
                      {
                        backgroundColor: isStarProduct
                          ? GlobalVars.orange
                          : GlobalVars.white,
                      },
                    ]}
                    onPress={() => setIsStarProduct(!isStarProduct)}
                  />
                  <Text
                    style={styles.textUnity}
                    onPress={() => setIsStarProduct(!isStarProduct)}
                  >
                    Producto destacado
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <ButtonComponent
              text="Guardar"
              color={GlobalVars.orange}
              textColor={GlobalVars.white}
              Action={() => saveProduct()}
            />
          </ScrollView>
        </View>
      )}

      <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
      <View style={styles2.container}>
                <Image
                  style={styles2.stretch}
                  source={require("../../../../assets/close-orange.png")}
                />
              </View>
      </TouchableOpacity>
    </View>
  );
};

export default PickerAddProduct;

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


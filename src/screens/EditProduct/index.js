import React, { useEffect, useState, useCallback, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Image,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import { useFocusEffect } from "@react-navigation/native";

import GlobalVars from "../../global/globalVars";

import dataProduct from "../../helpers/dataProduct";
import StoreContext from "../../helpers/globalStates";

import useModal from "../../utils/useModal";

/** Import Componentes Custom */
import StatusBarComponent from "../../components/atoms/StatusBar";
import LabelTextComponent from "../../components/atoms/LabelText";
import ButtonComponent from "../../components/atoms/ButtonComponent";
import InputEntry from "../../components/molecules/InputEntry";
import OptionTouchable from "../../components/molecules/ProfileOption";
import Header from "../../components/organisms/Header";
import PickerImage from "../../components/organisms/ChooseImageProduct";
import PickerDropProduct from "../../components/organisms/ChooseDropProduct";
import ScrollView from "../../components/templates/ScrollView";
import WrappingViews from "../../components/templates/WrappingViews";
import ModalAlert from "../../components/templates/ModalAlert";
import ModalTemplate from "../../components/templates/ModalTemplate";

/** Styles */
import Styles from "./style";

const styles = Styles;
const EditProductScreen = ({ navigation, route }) => {
  const { product } = route.params;

  const { _jwt } = useContext(StoreContext.SecurityContext);
  const { user } = useContext(StoreContext.UserContext);

  const { isShowing: isOpenDrop, toggle: showDrop } = useModal();
  const { isShowing: isOpenPhoto, toggle: showChangePhoto } = useModal();
  const { isShowing: isShowingAlert, toggle: setShowhingAlert } = useModal();

  const [ToRandomDispatch, setToRandomDispatch] = useState(null);

  const [textAlert, setTextAlert] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [productName, setProductName] = useState("");
  const [delivery, setDelivery] = useState(false);
  const [starProduct, setStarpProduct] = useState(false);
  const [unity, setUnity] = useState("unidad");
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);
  const [imageProduct, setImageProduct] = useState(null);

  useEffect(() => {}, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      initialData();
    }
    return () => {
      isMounted = false;
    };
  }, [ToRandomDispatch]);

  useFocusEffect(
    useCallback(() => {
      initialData();

      getRandomNumberDispatch();
    }, [])
  );

  const getRandomNumberDispatch = () => {
    // random vals process for generate token for wish
    const attrTemp = Math.random();
    setToRandomDispatch(attrTemp);
  };

  const initialData = () => {
    setLoading(true);
    if (product?.attributes?.product) {
      setProductName(product?.attributes?.product);
      setDelivery(product?.attributes?.delivery || false);
      setStarpProduct(product?.attributes?.starProduct || false);
      setUnity(product?.attributes?.unity || "unidad");
      setQty(product?.attributes?.quantity || 1);
      setPrice(product?.attributes?.price || 0);
      setImageProduct({
        idImage: product?.attributes?.image?.data?.id,
        identifierS3:
          product?.attributes?.image?.data?.attributes?.identifierS3,
        uri: product?.attributes?.image?.data?.attributes?.uri,
        name: product?.attributes?.image?.data?.attributes?.name,
        id: product?.id,
      });
      setLoading(false);
    }
  };

  const UpdateProcess = async () => {
    try {
      setLoading(true);
      if (!productName) {
        setTextAlert("Falta que describa su producto.");
        setShowhingAlert(true);
        setLoading(false);
      } else {
        const res = await dataProduct.updateProduct(
          {
            id: product?.id,
            product: productName,
            qty: qty,
            unity: unity,
            price: price,
            delivery: delivery,
            starProduct: starProduct,
          },
          _jwt
        );
        if (res) {
          setTextAlert("Actualización de datos completada.");
          setShowhingAlert(true);
          setLoading(false);
          navigation.goBack();
        }
      }
    } catch (e) {
      setTextAlert("Ocurrió un error durante la actualización de datos.");
      setShowhingAlert(true);
      setLoading(false);
    }
  };

  return (
    <WrappingViews>
      <StatusBarComponent />
      <Header
        navigation={navigation}
        user={user}
        _jwt={_jwt}
        title="Editar tus productos"
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
                text="Editar producto"
              />
              <View style={styles.subray} />
            </View>

            {loading && (
              <ActivityIndicator
                animating={true}
                color={GlobalVars.orange}
                size="large"
                style={styles.spinner}
              />
            )}

            {!loading && (
              <View style={styles.infoUser}>
                <LabelTextComponent
                  text="Producto"
                  color={GlobalVars.whiteLight}
                  size={14}
                  customStyleBtn={styles.customLabel}
                />
                <InputEntry
                  label="Nombre del producto *"
                  textvariable={productName || ""}
                  setValue={(val) => setProductName(val)}
                  colorPlaceholder={GlobalVars.textGrayColor}
                />

                {/* <LabelTextComponent
                text="Cantidad"
                color={GlobalVars.whiteLight}
                size={14}
                customStyleBtn={styles.customLabel}
              />
              <InputEntry
                label="Cantidad *"
                textvariable={qty.toString() || ""}
                setValue={(val) => setQty(val)}
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
                text="Precio en pesos"
                color={GlobalVars.whiteLight}
                size={14}
                customStyleBtn={styles.customLabel}
              />
              <InputEntry
                label="Precio *"
                textvariable={price.toString() || ""}
                setValue={(val) => setPrice(val)}
              /> */}

                <LabelTextComponent
                  text="Delivery"
                  color={GlobalVars.whiteLight}
                  size={14}
                  customStyleBtn={styles.customLabel}
                />
                <View style={styles.boxDelivery}>
                  <View style={{ flexDirection: "row", marginBottom: 20 }}>
                    <TouchableOpacity
                      style={[
                        styles.optionBox,
                        {
                          backgroundColor: delivery
                            ? GlobalVars.thirdOrange
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
                            ? GlobalVars.thirdOrange
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

                <LabelTextComponent
                  text="¿Es un producto destacado?"
                  color={GlobalVars.whiteLight}
                  size={14}
                  customStyleBtn={styles.customLabel}
                />
                <View style={styles.boxDelivery}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginBottom: 20,
                    }}
                  >
                    <TouchableOpacity
                      style={[
                        styles.optionBox,
                        {
                          backgroundColor: starProduct
                            ? GlobalVars.blueComplementary
                            : GlobalVars.white,
                        },
                      ]}
                      onPress={() => setStarpProduct(!starProduct)}
                    />
                    <Text
                      style={styles.textUnity}
                      onPress={() => setStarpProduct(!starProduct)}
                    >
                      Producto destacado
                    </Text>
                  </View>
                </View>

                <OptionTouchable
                  text="Actualizar foto"
                  colorText={GlobalVars.white}
                  sizeText={16}
                  colorIcon={GlobalVars.white}
                  sizeIcon={20}
                  iconOption="award"
                  onPress={() => showChangePhoto()}
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

            <TouchableOpacity
              style={styles.optionDelet}
              onPress={() => showDrop()}
            >
               <View
                style={[styles2.container]}
              >
                <Image
                  style={styles2.stretch}
                  source={require("../../../assets/delete_white.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>

      <ModalAlert
        text={textAlert}
        openModal={isShowingAlert}
        onHelp={() => setShowhingAlert(!isShowingAlert)}
      />

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
          imageProduct={imageProduct}
          onClose={() => showChangePhoto()}
          handleImg={setImageProduct}
          _jwt={_jwt}
          getRandomNumberDispatch={getRandomNumberDispatch}
          isUpdateProduct
        />
      </ModalTemplate>

      <ModalTemplate
        openModal={isOpenDrop}
        onHelp={() => showDrop()}
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
        <PickerDropProduct
          id={product?.id}
          onClose={() => showDrop()}
          _jwt={_jwt}
        />
      </ModalTemplate>
    </WrappingViews>
  );
};

export default EditProductScreen;


const styles2 = StyleSheet.create({
  container: {
    width: 35,
    height: 35,
  },
  stretch: {
    width: 35,
    height: 35,
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

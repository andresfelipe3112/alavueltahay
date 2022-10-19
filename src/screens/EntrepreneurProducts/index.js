import React, { useEffect, useState, useCallback, useContext } from "react";
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  BackHandler,
  ImageBackground,
  Image,
  StyleSheet,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import { useFocusEffect } from "@react-navigation/native";

import GlobalVars from "../../global/globalVars";

import { GET_ALLS_PRODUCTS_ENTREPRENEUR } from "../../mock/productsByEntrepreneur";

import StoreContext from "../../helpers/globalStates";

import useModal from "../../utils/useModal";

/** Import Componentes Custom */
import StatusBarComponent from "../../components/atoms/StatusBar";
import LabelTextComponent from "../../components/atoms/LabelText";
import Header from "../../components/organisms/Header";
import ScrollView from "../../components/templates/ScrollView";
import WrappingViews from "../../components/templates/WrappingViews";
import ModalAlert from "../../components/templates/ModalAlert";
import ModalTemplate from "../../components/templates/ModalTemplate";

/** Styles */
import Styles from "./style";
import PickerAddProduct from "../../components/organisms/AddProductShop";
import ImageUriComponent from "../../components/atoms/ImageUriComponent";

const styles = Styles;

const EntrepreneurProductsScreen = ({ navigation }) => {
  const { _jwt } = useContext(StoreContext.SecurityContext);
  const { user } = useContext(StoreContext.UserContext);
  const { entrepreneur } = useContext(StoreContext.EntrepreneurContext);

  const { isShowing: isOpenAddProduct, toggle: showCreateProduct } = useModal();
  const { isShowing: isShowingAlert, toggle: setShowhingAlert } = useModal();

  const [ToRandomDispatch, setToRandomDispatch] = useState(null);

  const [productsEntrepreneur, setProductsEntrepreneur] = useState([]);
  const [countProducts, setCountProducts] = useState(0);
  const [textAlert, setTextAlert] = useState("");
  const [loading, setLoading] = useState(false);

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

  const getRandomNumberDispatch = () => {
    // random vals process for generate token for wish
    const attrTemp = Math.random();
    setToRandomDispatch(attrTemp);
  };

  const BackHandlerProcess = () => {
    /** Android no return Login */
    const backAction = () => {
      navigation.goBack();
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  };

  const getDataEntrepreneur = async () => {
    setLoading(true);
    const res = await GET_ALLS_PRODUCTS_ENTREPRENEUR(entrepreneur?.id, _jwt);

    if (res) {
      setProductsEntrepreneur(res);
      setCountProducts(res.length);
    }
    setLoading(false);
  };

  const ProductsRender = (productsEntrepreneur.length &&
    productsEntrepreneur.map((product, i) => {
      return (
        <TouchableOpacity
          key={`item_product_${i}`}
          style={styles.viewItem}
          onPress={() =>
            navigation.navigate("ItemUpdate", { product: product })
          }
        >
          <ImageUriComponent
            img={{ uri: product?.attributes?.image?.data?.attributes?.uri }}
            width={50}
            height={50}
            mode="cover"
            radius={75}
            borderTopRadius={75}
            borderBottomRadius={75}
          />
          <LabelTextComponent
            text={product?.attributes?.product}
            color={GlobalVars.whiteLight}
            size={15}
          />
          <View style={styles2.container}>
                <Image
                  style={styles2.stretch}
                  source={require("../../../assets/chevron_right_white.png")}
                />
              </View>
        </TouchableOpacity>
      );
    })) || <></>;

  return (
    <WrappingViews>
      <StatusBarComponent />
      <Header
        navigation={navigation}
        user={user}
        _jwt={_jwt}
        title="Gestiona tu negocio"
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
            {!loading && (
              <View
                style={[
                  styles.tagProfile,
                  { flexDirection: "row", justifyContent: "space-between" },
                ]}
              >
                <LabelTextComponent
                  size={16}
                  color={GlobalVars.white}
                  text={`Mis productos`}
                />

                <LabelTextComponent
                  size={16}
                  color={GlobalVars.white}
                  text={`Total: ${countProducts}`}
                />

                {/* <LabelTextComponent
                  size={16}
                  color={GlobalVars.white}
                  text={`Tienes un total de ${countProducts} ${
                    countProducts !== 1 ? "productos" : "producto"
                  } registrados`}
                /> */}
                {/* <View style={styles.subray} /> */}
              </View>
            )}

            {loading && (
              <ActivityIndicator
                animating={true}
                color={GlobalVars.white}
                size="large"
                style={styles.spinner}
              />
            )}

            {(!loading && productsEntrepreneur.length && ProductsRender) ||
              null}
          </View>
        </ScrollView>
      </ImageBackground>

      <TouchableOpacity
        style={styles.floatBtn}
        onPress={() => showCreateProduct()}
      >
         <View style={[styles2.container]}>
            <Image
              style={styles2.stretch}
              source={require("../../../assets/plus_white.png")}
            />
          </View>
      </TouchableOpacity>

      <ModalAlert
        text={textAlert}
        openModal={isShowingAlert}
        onHelp={() => setShowhingAlert(!isShowingAlert)}
      />

      <ModalTemplate
        openModal={isOpenAddProduct}
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
        <PickerAddProduct
          onClose={() => showCreateProduct()}
          _jwt={_jwt}
          entrepreneur={entrepreneur}
          getRandomNumberDispatch={getRandomNumberDispatch}
          isEntrepreneurCreate
        />
      </ModalTemplate>
    </WrappingViews>
  );
};

export default EntrepreneurProductsScreen;

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
    width: 42,
    height: 42,
  },
  stretchFocus: {
    width: 42,
    height: 42,
  },
});

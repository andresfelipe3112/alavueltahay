import React, { useEffect, useState, useContext } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

import { Feather } from "@expo/vector-icons";

/** Variables globales */
import GlobalVars from "../../../global/globalVars";

import { GET_MULTIMEDIA_USER } from "../../../mock/multimediaByUser";

import StoreContext from "../../../helpers/globalStates";

import useModal from "../../../utils/useModal";

/** Componentes */
import TitleComponent from "../../atoms/Titles";
import ReturnButton from "../../atoms/ReturnButton";
import LabelTextComponent from "../../atoms/LabelText";
import ImageUriComponent from "../../atoms/ImageUriComponent";
import IconTouchable from "../../molecules/iconTouchable";
import ModalSearch from "../ModalSearch";
import ModalAlert from "../../templates/ModalAlert";

import styles from "./styles";
import userInvitadData from "../../../utils/useInvitado";

const Header = ({
  navigation,
  textTitle = "",
  query = "",
  openTotal = true,
  user = {},
  isJustTitle = false,
  title = "",
  customStyles,
  colorBack="orange",
  ...props
}) => {
  const { setShowTotalMenu } = props;
  const [data] = userInvitadData();

  const { _jwt } = useContext(StoreContext.SecurityContext);

  const { isShowing: isShowSearch, toggle: showModalSearch } = useModal();
  const { isShowing: isShowUpdateLocation, toggle: showModalUpdateLocation } =
    useModal();

  const [avatar, setAvatar] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    RecoverMultimediaUser();
  }, [_jwt, props.ToRandomDispatch]);

  useEffect(() => {
    if (isShowUpdateLocation) {
      setTimeout(() => {
        showModalUpdateLocation();
      }, 2000);
    }
  }, [isShowUpdateLocation]);

  const RecoverMultimediaUser = async () => {
    setLoading(true);
    if (!_jwt) return;

    const res = await GET_MULTIMEDIA_USER(_jwt);
    if (!res) setLoading(false);
    else if (res) {
      setImage(res?.resImage);
      setAvatar(res?.resAvatar);
      setLoading(false);
    }
  };

  if (isJustTitle) {
    return (
      <View style={styles.viewRoot}>
        <View
          style={[
            styles.headerTopBlock,
            {
              alignItems: "center",
              justifyContent: "center",
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            },
            { height: GlobalVars.windowHeight / 10 },
          ]}
        >
          {props.noBackButton || (
            <ReturnButton
              color={GlobalVars.white}
              size={35}
              navigation={navigation}
              aditionalStyle={{
                top: "27%",
                left: 15,
              }}
            />
          )}
          <View
            style={[
              styles.userIcon,
              { top: "28%", right: 15, position: "absolute" },
            ]}
          >
            {/* {!avatar && !image && (
              <IconTouchable
                name={"user"}
                color={GlobalVars.white}
                size={25}
                onPress={() => null}
              />
            )}

            {avatar && !image && (
              <TouchableOpacity onPress={() => null}>
                <ImageUriComponent
                  width={25}
                  height={25}
                  radius={150}
                  mode="cover"
                  img={{ uri: avatar?.uriAvatar }}
                  borderTopRadius={150}
                  borderBottomRadius={150}
                />
              </TouchableOpacity>
            )}

            {!avatar && image && (
              <TouchableOpacity onPress={() => null}>
                <ImageUriComponent
                  width={25}
                  height={25}
                  radius={150}
                  mode="cover"
                  img={{ uri: image?.uri }}
                  borderTopRadius={150}
                  borderBottomRadius={150}
                />
              </TouchableOpacity>
            )}

            {avatar && image && (
              <TouchableOpacity onPress={() => null}>
                <ImageUriComponent
                  width={25}
                  height={25}
                  radius={150}
                  mode="cover"
                  img={{ uri: image?.uri }}
                  borderTopRadius={150}
                  borderBottomRadius={150}
                />
              </TouchableOpacity>
            )} */}
          </View>

          <TitleComponent
            title={title}
            color={GlobalVars.whiteLight}
            size={20}
            weight="600"
            customStyles={{ }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.viewRoot}>
      <View style={styles.headerTopBlock}>
        {props.noBackButton || (
          <ReturnButton
            color={colorBack}
            size={35}
            navigation={navigation}
            aditionalStyle={{
              top: !openTotal ? "15%" : "20%",
              left: openTotal ? 5 : 15,
            }}
          />
        )}
        {openTotal && (
          <View
            style={[
              styles.locationIcon,
              { width: props.noBackButton ? "15%" : "30%" },
            ]}
          >
            <TouchableOpacity 
            onPress={() =>
              !isShowUpdateLocation ? showModalUpdateLocation() : null
            }
            style={styles2.container}>
              <Image
                style={styles2.stretch}
                source={require(".././../../../assets/map-pin_white.png")}
              />
            </TouchableOpacity>
            {/* <IconTouchable
              name={"map-pin"}
              color={GlobalVars.white}
              size={25}
              onPress={() =>
                !isShowUpdateLocation ? showModalUpdateLocation() : null
              }
              aditionalStyle={{
                display: openTotal ? "flex" : "none",
                marginRight:
                  props.noBackButton && openTotal
                    ? "0%"
                    : props.noBackButton && !openTotal
                    ? "25%"
                    : !props.noBackButton && openTotal
                    ? "5%"
                    : "15%",
              }}
            /> */}
          </View>
        )}
        <View
          style={[
            styles.searchBar,
            {
              // backgroundColor: "black",
              width:
                props.noBackButton && openTotal
                  ? "85%"
                  : props.noBackButton && !openTotal
                  ? "65%"
                  : !props.noBackButton && openTotal
                  ? "75%"
                  : "75%",
              paddingLeft:
                props.noBackButton && openTotal
                  ? 0
                  : props.noBackButton && !openTotal
                  ? 0
                  : !props.noBackButton && openTotal
                  ? 0
                  : 60,
              paddingRight: openTotal ? 20 : 0,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.inputSearch}
            onPress={() => showModalSearch()}
          >
            <LabelTextComponent
              text="¿Qué estás buscando?"
              color={GlobalVars.textGrayColor}
              size={openTotal ? 16 : 12}
            />
          </TouchableOpacity>
        </View>
        {!openTotal && (
          <View style={styles.userIcon}>
            {!avatar && !image && (
              <IconTouchable
                name={"user"}
                color={GlobalVars.white}
                size={35}
                onPress={() => navigation.navigate("Profile")}
              />
            )}

            {avatar && !image && (
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <ImageUriComponent
                  width={35}
                  height={35}
                  radius={150}
                  mode="cover"
                  img={{ uri: avatar?.uriAvatar }}
                  borderTopRadius={150}
                  borderBottomRadius={150}
                />
              </TouchableOpacity>
            )}

            {!avatar && image && (
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <ImageUriComponent
                  width={35}
                  height={35}
                  radius={150}
                  mode="cover"
                  img={{ uri: image?.uri }}
                  borderTopRadius={150}
                  borderBottomRadius={150}
                />
              </TouchableOpacity>
            )}

            {avatar && image && (
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <ImageUriComponent
                  width={25}
                  height={25}
                  radius={150}
                  mode="cover"
                  img={{ uri: image?.uri }}
                  borderTopRadius={150}
                  borderBottomRadius={150}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
      <View
        style={[
          styles.headerStickyBlock,
          {
            paddingVertical: openTotal ? 10 : 20,
            paddingTop: !openTotal ? 0 : 10,
          },
        ]}
      >
        {!openTotal && (
          <View style={{ width: "100%", height: 25 }} />
          // <View style={[styles.userInfo, { justifyContent: "center" }]}>
          //   <TitleComponent
          //     title={`¡Hola, ${user?.names}!`}
          //     color={GlobalVars.whiteLight}
          //     size={14}
          //     weight="600"
          //   />
          // </View>
        )}
        {openTotal && (
          <View style={[styles.userInfo, { justifyContent: "space-between" }]}>
            {!data ? (
              <TitleComponent
                title={`¡Hola!`}
                color={GlobalVars.whiteLight}
                size={32}
                weight="600"
              />
            ) : (
              <TitleComponent
                title={`¡Hola, ${user?.names}!`}
                color={GlobalVars.whiteLight}
                size={32}
                weight="600"
              />
            )}

            {!avatar && !image && (
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Feather
                  name="camera"
                  size={70}
                  color={GlobalVars.blueComplementary}
                />
              </TouchableOpacity>
            )}

            {avatar && !image && (
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <ImageUriComponent
                  width={GlobalVars.windowHeight < 700 ? 60 : 70}
                  height={GlobalVars.windowHeight < 700 ? 60 : 70}
                  radius={150}
                  mode="cover"
                  img={{ uri: avatar?.uriAvatar }}
                  borderTopRadius={150}
                  borderBottomRadius={150}
                />
              </TouchableOpacity>
            )}

            {!avatar && image && (
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <ImageUriComponent
                  width={GlobalVars.windowHeight < 700 ? 60 : 70}
                  height={GlobalVars.windowHeight < 700 ? 60 : 70}
                  radius={150}
                  mode="cover"
                  img={{ uri: image?.uri }}
                  borderTopRadius={150}
                  borderBottomRadius={150}
                />
              </TouchableOpacity>
            )}

            {avatar && image && (
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <ImageUriComponent
                  width={GlobalVars.windowHeight < 700 ? 60 : 70}
                  height={GlobalVars.windowHeight < 700 ? 60 : 70}
                  radius={150}
                  mode="cover"
                  img={{ uri: image?.uri }}
                  borderTopRadius={150}
                  borderBottomRadius={150}
                />
              </TouchableOpacity>
            )}
          </View>
        )}

        {openTotal && (
          <IconTouchable
            name={"keyboard-arrow-up"}
            color={GlobalVars.white}
            size={25}
            onPress={() => setShowTotalMenu()}
            family="MaterialIcons"
            aditionalStyle={{
              position: "absolute",
              bottom: GlobalVars.windowHeight < 700 ? -5 : 0,
            }}
          />
        )}

        {!openTotal && (
          <IconTouchable
            name={"keyboard-arrow-down"}
            color={GlobalVars.white}
            size={25}
            open={'close'}
            onPress={() => setShowTotalMenu()}
            family="MaterialIcons"
            aditionalStyle={{
              position: "absolute",
              bottom: GlobalVars.windowHeight < 700 ? -5 : 0,
            }}
          />
        )}
      </View>

      <ModalSearch
        visible={isShowSearch}
        onShow={showModalSearch}
        _jwt={_jwt}
      />

      <ModalAlert
        text="Actualizando tu ubicación..."
        openModal={isShowUpdateLocation}
        onHelp={showModalUpdateLocation}
      />
    </View>
  );
};

export default Header;

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
    width: 42,
    height: 42,
  },
  stretchFocus: {
    width: 42,
    height: 42,
  },
});

import React, { useState, useEffect } from "react";

import { View, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from "react-native";

import { Entypo, FontAwesome5, Feather } from "@expo/vector-icons";

import GlobalVars from "../../../global/globalVars";

import { socialNetworks } from "../../../mock/socialNetworks";

import updateDataEntrepreneur from "../../../helpers/updateDataEntrepreneur";

import { useKeyboard } from "../../../utils/useKeyboard";

import LabelTextComponent from "../../atoms/LabelText";
import ButtonComponent from "../../atoms/ButtonComponent";
import InputEntry from "../../molecules/InputEntry";
import ScrollView from "../../templates/ScrollView";

import Styles from "./style";
import { Cancel } from "../../molecules/cancel";

const styles = Styles;

const PickerChannelsShop = ({
  isEntrepreneurUpdate = false,
  _jwt = null,
  entrepreneur = null,
  channels = {},
  ...props
}) => {
  const isKeyBoardOpen = useKeyboard();

  const { onClose, getRandomNumberDispatch } = props;

  const [errMsg, setErrMsg] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fb, setFb] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [mail, setMail] = useState("");
  const [calls, setCalls] = useState("");

  const [showWhatsapp, setShowWhatsapp] = React.useState(false);
  const [showInstagram, setShowInstagram] = React.useState(false);
  const [showFb, setShowFb] = React.useState(false);
  const [showTiktok, setShowTiktok] = React.useState(false);
  const [showCalls, setShowCalls] = React.useState(false);
  const [showMail, setShowMail] = React.useState(false);

  useEffect(() => {
    let isMount = true;
    if (isMount) {
      settingNetworks();
    }

    return () => {
      isMount = false;
    };
  }, []);

  const settingNetworks = async () => {
    channels?.channels.forEach((element) => {
      let network = element?.name;
      switch (network) {
        case "facebook":
          setFb(element?.channel || "");
          break;
        case "whatsapp":
          setWhatsapp(element?.channel || "");
          break;
        case "instagram":
          setInstagram(element?.channel || "");
          break;
        case "tiktok":
          setTiktok(element?.channel || "");
          break;
        case "llamada":
          setCalls(element?.channel || "");
          break;
        case "correo":
          setMail(element?.channel || "");
          break;
      }
    });
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

  const saveChannels = async () => {
    try {
      setLoading(true);

      const dataSend = [
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

      const res = await updateDataEntrepreneur.entrepreneurChannels(
        {
          id: entrepreneur.id,
          dataSend,
        },
        _jwt
      );

      if (res) {
        setLoading(false);
        onClose();
        getRandomNumberDispatch();
      } else {
        setErrMsg("Ocurrió un error durante la actualización de datos.");
        setShowErr(true);
        setTimeout(() => {
          setShowErr(false);
        }, 1200);
        setLoading(false);
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
              source={require("../../../../assets/whatsapp.png")}
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
                label="+56993230497"
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
              source={require("../../../../assets/whatsapp.png")}
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
              source={require("../../../../assets/facebook.png")}
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
              source={require("../../../../assets/tik_tok.png")}
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
              source={require("../../../../assets/fono.png")}
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
                label="+56993230497"
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
            <Image
              style={styles2.stretch}
              source={require("../../../../assets/mailGray.png")}
            />
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
    <View style={styles.view}>
      {!loading && (
        <LabelTextComponent
          text="Edita tus canales"
          color={GlobalVars.blueOpaque}
          size={20}
        />
      )}
      {loading && <ActivityIndicator color={GlobalVars.orange} size="large" />}

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
          >
            {optionsSocial}
          </ScrollView>
        </View>
      )}

      {!loading && (
        <ButtonComponent
          text="Guardar"
          color={GlobalVars.orange}
          textColor={GlobalVars.white}
          Action={() => saveChannels()}
        />
      )}

      <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
      <Cancel/>
      </TouchableOpacity>
    </View>
  );
};

export default PickerChannelsShop;

const styles2 = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
  },
  stretch: {
    width: 30,
    height: 30,
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

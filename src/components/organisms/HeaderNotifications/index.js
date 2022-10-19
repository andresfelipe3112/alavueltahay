import React, { useEffect, useState } from "react";

import { View, TouchableOpacity } from "react-native";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

import TitleComponent from "../../atoms/Titles";
import ReturnButton from "../../atoms/ReturnButton";
import LabelTextComponent from "../../atoms/LabelText";

/** Styles */
import Styles from "./style";

const styles = Styles;

const NotificationHeader = ({
  navigation,
  selectedTab = "me",
  entrepreneur = null,
  countMyNotifies = 0,
  countShopNotifies = 0,
  ...props
}) => {
  const { setSelectedTab } = props;

  return (
    <View style={styles.container}>
      <ReturnButton
        color={GlobalVars.white}
        size={35}
        navigation={navigation}
        aditionalStyle={{
          top: GlobalVars.windowHeight < 725 ? "0%" : "9%",
          left: 15,
        }}
      />
      <TitleComponent
        size={24}
        title="Notificaciones"
        color={GlobalVars.white}
        customStyles={{ marginTop: GlobalVars.windowHeight < 725 ? 5 : 0 }}
      />
      <View style={{ width: "100%", height: 15 }} />
      <View style={styles.tabPanel}>
        {(entrepreneur?.id && (
          <>
            <TouchableOpacity
              style={[
                styles.optionTab,
                {
                  backgroundColor:
                    selectedTab === "me"
                      ? GlobalVars.white
                      : GlobalVars.firstColor,
                  borderWidth: selectedTab === "me" ? 0 : 1,
                  borderColor: selectedTab === "me" ? "none" : GlobalVars.white,
                },
              ]}
              onPress={() => setSelectedTab("me")}
            >
              <LabelTextComponent
                size={13}
                text="Para mí"
                color={
                  selectedTab === "me"
                    ? GlobalVars.firstColor
                    : GlobalVars.white
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionTab,
                {
                  backgroundColor:
                    selectedTab === "shop"
                      ? GlobalVars.white
                      : GlobalVars.firstColor,
                  borderWidth: selectedTab === "shop" ? 0 : 1,
                  borderColor:
                    selectedTab === "shop" ? "none" : GlobalVars.white,
                },
              ]}
              onPress={() => setSelectedTab("shop")}
            >
              <LabelTextComponent
                size={13}
                text="Para mi negocio"
                color={
                  selectedTab === "shop"
                    ? GlobalVars.firstColor
                    : GlobalVars.white
                }
              />
            </TouchableOpacity>
          </>
        )) || (
          <>
            <TouchableOpacity
              style={[
                styles.optionTabFull,
                {
                  backgroundColor: GlobalVars.white,
                },
              ]}
            >
              <LabelTextComponent
                size={14}
                text="Para mí"
                color={GlobalVars.firstColor}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
      <LabelTextComponent
        size={16}
        color={GlobalVars.white}
        text={`Tienes un total de ${
          selectedTab === "me" ? countMyNotifies : countShopNotifies
        } ${
          selectedTab === "me"
            ? countMyNotifies === 1
              ? "notificación"
              : "notificaciones"
            : countShopNotifies === 1
            ? "notificación"
            : "notificaciones"
        }`}
      />
    </View>
  );
};

export default NotificationHeader;

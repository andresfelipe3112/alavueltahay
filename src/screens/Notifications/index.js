import React, { useEffect, useState, useContext, useCallback } from "react";

import { BackHandler, View } from "react-native";

import { useFocusEffect, useIsFocused } from "@react-navigation/native";

import useModal from "../../utils/useModal";

/** Import Global Variables */
import GlobalVars from "../../global/globalVars";

import StoreContext from "../../helpers/globalStates";

import { GET_ALLS_MY_NOTIFICATIONS } from "../../mock/notificationsByUser";

/** Import Componentes Custom */
import StatusBarComponent from "../../components/atoms/StatusBar";
import LabelTextComponent from "../../components/atoms/LabelText";
import Notification from "../../components/molecules/Notification";
import NotificationHeader from "../../components/organisms/HeaderNotifications";
import PickerDropNotification from "../../components/organisms/ChooseDropNotification";
import ScrollView from "../../components/templates/ScrollView";
import ModalTemplate from "../../components/templates/ModalTemplate";
import WrappingViews from "../../components/templates/WrappingViews";
import userInvitadData from "../../utils/useInvitado";

/** Styles */
import Styles from "./style";
import ModalInvite from "../../components/templates/ModalInvite";

const styles = Styles;

const NotificationScreen = ({ navigation }) => {
  const [data, fun] = userInvitadData();
  const [isShowingInvite, setShowingInvite] = useState(false);
  const [focus, setFocus] = useState(false);
  const { _jwt } = useContext(StoreContext.SecurityContext);
  const { user } = useContext(StoreContext.UserContext);
  const { entrepreneur } = useContext(StoreContext.EntrepreneurContext);


  const isFocused = useIsFocused();
  
  useEffect(() => {
    data === false && setShowingInvite(true) 
  },[data])

  useFocusEffect(
    useCallback(() => {
      fun()
      if(isFocused){ 
      data === false && setShowingInvite(true)
    }
    }, [isFocused])
  )

  const { isShowing: isOpenDrop, toggle: showDrop } = useModal();

  const [selectedTab, setSelectedTab] = useState("me");
  const [notifications, setNotifications] = useState([]);

  const [myNots, setMyNots] = useState([]);
  const [shopNots, setShopNots] = useState([]);
  const [countMyNotifies, setCountMyNotifies] = useState(0);
  const [countShopNotifies, setCountShopNotifies] = useState(0);

  const [notificationId, setNotificationId] = useState(null);

  const [ToRandomDispatch, setToRandomDispatch] = useState(null);

  useEffect(() => {
    if (notifications.length) {
      const myNotifies = notifications.filter(
        (e) => e?.attributes?.extraData?.type === "user"
      );
      setMyNots(myNotifies);
      setCountMyNotifies(myNotifies.length || 0);

      const shopNotifies = notifications.filter(
        (e) => e?.attributes?.extraData?.type === "shop"
      );
      setShopNots(shopNotifies);
      setCountShopNotifies(shopNotifies.length || 0);
    } else {
      setMyNots([]);
      setCountMyNotifies(0);

      setShopNots([]);
      setCountShopNotifies(0);
    }
  }, [notifications]);

  useEffect(() => {
    RecoverData();
  }, [ToRandomDispatch]);

  useFocusEffect(
    useCallback(() => {
      /** Backhandler process Android -> back button */
      BackHandlerProcess();

      RecoverData();
    }, [])
  );

  const BackHandlerProcess = () => {
    /** Android return */
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

  const RecoverData = async () => {
    const res = await GET_ALLS_MY_NOTIFICATIONS(user?.id, _jwt);
    if (res && res.length) {
      setNotifications(res);
    } else {
      setNotifications([]);
    }
  };

  const getRandomNumberDispatch = () => {
    // random vals process for generate token for wish
    const attrTemp = Math.random();
    setToRandomDispatch(attrTemp);
  };

  const deleteNotify = async (id) => {
    await setNotificationId(id);
    showDrop();
  };

  const notificationsRender =
    (myNots &&
      myNots.length &&
      myNots.map((item, i) => {
        return (
          <Notification
            key={`notification_${i}`}
            item={item}
            onDelete={deleteNotify}
          />
        );
      })) ||
    null;

  const notificationsRenderShop =
    (shopNots &&
      shopNots.length &&
      shopNots.map((item, i) => {
        return (
          <Notification
            key={`notification_${i}`}
            item={item}
            onDelete={deleteNotify}
          />
        );
      })) ||
    null;

  return (
    <WrappingViews>
      <StatusBarComponent />
      <NotificationHeader
        navigation={navigation}
        selectedTab={selectedTab}
        entrepreneur={entrepreneur}
        setSelectedTab={setSelectedTab}
        countMyNotifies={countMyNotifies}
        countShopNotifies={countShopNotifies}
      />

      <ScrollView
        style={styles.scrolling}
        contentContainerStyle={styles.wrapScrollView}
        colorScrollBar={GlobalVars.orange}
      >
        {(selectedTab === "me" && notificationsRender) || <></>}
        {(selectedTab === "shop" && notificationsRenderShop) || <></>}
        {!notificationsRender && (
          <>
            <View
              style={{ width: "100%", height: GlobalVars.windowHeight / 4 }}
            />
            <LabelTextComponent
              size={16}
              color={GlobalVars.firstColor}
              text="Por el momento no tienes notificaciones."
            />
          </>
        )}
      </ScrollView>

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
        <PickerDropNotification
          id={notificationId}
          onClose={() => showDrop()}
          _jwt={_jwt}
          getRandomNumberDispatch={getRandomNumberDispatch}
        />
      </ModalTemplate>
      <ModalInvite
           openModal={isShowingInvite}
           text={'¡Ups!, esta sección requiere que poseas una cuenta de usuario. ¡Regístrate, es muy sencillo!'}
           goBack={() => {
            navigation.goBack()
            setShowingInvite(!isShowingInvite)
          }}
           cancelModal={() => setShowingInvite(!isShowingInvite)}
      />
    </WrappingViews>
  );
};

export default NotificationScreen;

import React, { useState, useEffect, useContext, useRef } from "react";

import * as Notifications from "expo-notifications";

import Storage from "../../helpers/localStorage";
import StoreContext from "../../helpers/globalStates";
import { SettingNotifications } from "../../helpers/validatePushToken";

import MainStack from "./MainStack";
import LoadStack from "./LoadStack";

const AppNavigator = ({ TabBottom }) => {
  const { _setJwt } = useContext(StoreContext.SecurityContext);

  const [redirect, setRedirect] = useState("Initial");
  const [finished, setFinished] = useState(false);

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    setTimeout(() => {
      SettingNotifications();
      VerifySession();
    }, 2000);

    // Este escucha está activo cuando una notificación
    // es recibida con la App en primer plano
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {});

    // Este escucha es disparado cuando un usuario interactua con una notificación con la App en primer o segundo plano
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const VerifySession = async () => {
    try {
      // await Storage.clearAll();
      let token = await Storage.getItem("_TOKEN_API");
      let response = token && token.length > 0 ? true : false;
      // console.log( {token}, {response} );
      if (response) {
        _setJwt(token);
        setRedirect("Home");
        setFinished(true);
      } else {
        setFinished(true);
      }
    } catch (error) {
      // Error retrieving data
      // console.log(error);
      setFinished(true);
    }
  };

  if (!finished) {
    return <LoadStack />;
  }

  return <MainStack TabBottom={TabBottom} redirect={redirect} />;
};

export default AppNavigator;

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import updateDataUser from "../updateDataUser";

export const validatePushToken = async (user, setUser, jwt) => {
  const _push_token = await registerForPushNotificationsAsync();

  if (user?.id && _push_token && user?.pushToken !== _push_token) {
    setUser({ ...user, pushToken: _push_token });
    const dataSend = {
      pushToken: _push_token,
      id: user.id,
    };
    updateDataUser.userPushToken(dataSend, jwt);
  }
};

export const SettingNotifications = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
};

export async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      //   console.log("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);
  } else {
    // alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

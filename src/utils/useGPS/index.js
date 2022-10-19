import * as Location from "expo-location";

const recoveringStateLocation = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return "denied";
    }

    let location = null;
    location = await Location.getCurrentPositionAsync({});
    return location || false;
  } catch (e) {
    return "error";
  }
};

export default recoveringStateLocation;

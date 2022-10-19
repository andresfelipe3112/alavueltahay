import { getDistance } from "geolib";

const distanceMax = 20;

const calculateDistances = async (gps1, gps2) => {
  return getDistance(
    { latitude: gps1.latitude, longitude: gps1.longitude },
    { latitude: gps2.latitude, longitude: gps2.longitude },
    5
  );
};

export default { calculateDistances, distanceMax };

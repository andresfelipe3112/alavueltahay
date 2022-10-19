import React from "react";
import { View, ActivityIndicator } from "react-native";

import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";

import GlobalVars from "../../../global/globalVars";

import LabelTextComponent from "../../atoms/LabelText";

import Styles from "./style";

const styles = Styles;

const LATITUD_DELTA = 0.0622;
const LONGITUDE_DELTA = LATITUD_DELTA; // + GlobalVars.windowHeight / GlobalVars.windowHeight;

const MapViewComponent = ({ coords = null, ...props }) => {
  const setCoordinates = (lat, long) => {
    if (props.onChangeCoords) {
      props.onChangeCoords({
        latitude: lat,
        longitude: long,
      });
    }
  };

  if (!coords || !coords?.latitude || !coords?.longitude)
    return <ActivityIndicator color={GlobalVars.orange} size="large" />;

  return (
    <View style={styles.viewMap}>
      <MapView
        style={styles.map}
        region={{
          latitude: coords?.latitude || 0.0,
          longitude: coords?.longitude || 0.0,
          latitudeDelta: LATITUD_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        // provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{
            latitude: coords.latitude,
            longitude: coords.longitude,
          }}
          title={"Tu posición"}
          pinColor={GlobalVars.orange}
          draggable={true}
          onDragStart={(e) => {}}
          onDragEnd={(e) => {
            setCoordinates(
              e.nativeEvent.coordinate.latitude,
              e.nativeEvent.coordinate.longitude
            );
          }}
        >
          <Callout>
            <LabelTextComponent
              text={"Tu posición"}
              color={GlobalVars.black}
              size={15}
            />
          </Callout>
        </Marker>
        <Circle
          center={{
            latitude: coords.latitude,
            longitude: coords.longitude,
          }}
          radius={1000}
        ></Circle>
      </MapView>
    </View>
  );
};

export default MapViewComponent;

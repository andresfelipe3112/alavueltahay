import React, { useState } from "react";
import { View, ScrollView } from "react-native";

import GlobalVars from "../../../global/globalVars";

import Styles from "./style";

// type Props = {|
//   persistentScrollbar?: boolean,
//   children?: React$Node,
// |} & View.propTypes;

const styles = Styles;

export default function SBScrollView({
  colorScrollBar = null,
  children,
  ...props
}) {
  const [nativeEvent, setNativeEvent] = useState();

  // if (Platform.OS === "android") {
  //   // Android supports the persistentScrollbar
  //   return (
  //     <ScrollView persistentScrollbar={true} indicatorStyle="white" {...props}>
  //       {children}
  //     </ScrollView>
  //   );
  // }

  const top = nativeEvent
    ? nativeEvent.contentOffset.y +
      (nativeEvent.contentOffset.y / nativeEvent.contentSize.height) *
        nativeEvent.layoutMeasurement.height
    : 0;

  return (
    <ScrollView
      scrollEventThrottle={5}
      persistentScrollbar={false}
      showsVerticalScrollIndicator={false}
      onScroll={(event) => setNativeEvent(event.nativeEvent)}
      {...props}
    >
      {children}

      <View
        style={[
          styles.viewScrollBar,
          {
            top,
            backgroundColor: colorScrollBar ? colorScrollBar : GlobalVars.white,
          },
        ]}
      />
    </ScrollView>
  );
}

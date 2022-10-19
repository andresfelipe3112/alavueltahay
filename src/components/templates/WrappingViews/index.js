import { Platform, View, SafeAreaView } from "react-native";

/** Styles */
import Styles from "./style";

const styles = Styles;
const WrappingViews = ({ children }) => {
  if (Platform.OS === "ios") {
    return <SafeAreaView style={styles.root}>{children}</SafeAreaView>;
  }

  return <View style={styles.root}>{children}</View>;
};

export default WrappingViews;

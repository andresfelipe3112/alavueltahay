import * as React from "react";

import {
  View,
  Modal,
  Animated,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

/** Import Global vars */
import GlobalVars from "../../../global/globalVars";

import { shuffleArray } from "../../../helpers/shuffleArr";
import recoveringStateLocation from "../../../utils/useGPS";
import distancesUtil from "../../../utils/calculateGPSdistances";

/** Import Mock */
import { GET_ALLS_PRODUCTS_SEARCH } from "../../../mock/productsBySearch";

/** Import Custom elements */
import InputSearch from "../../molecules/InputSearch";
import ResultSearchCard from "../../molecules/ResultSearchCard";

import Styles from "./style";
import LabelTextComponent from "../../atoms/LabelText";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const ModalSearch = ({ visible, onShow, _jwt = null, ...props }) => {
  const [search, setSearch] = React.useState("");
  const [results, setResult] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [coords, setCoords] = React.useState({});
  const [nearResults, setNearResults] = React.useState([]);

  React.useEffect(() => {
    setGPSLocation();
  }, []);

  React.useEffect(() => {
    if (search) {
      captureProducts(search);
    } else {
      setResult([]);
    }
  }, [search]);

  React.useEffect(() => {
    if (results.length) {
      if (searchWaiting) clearTimeout(searchWaiting);
      let searchWaiting = setTimeout(() => {
        searchWaiting = null;
        recoverNearbyPlaces();
      }, 1500);
    }
  }, [results]);

  const captureProducts = async (s) => {
    await setResult([]);
    await setNearResults([]);
    setIsLoading(true);
    const res = await GET_ALLS_PRODUCTS_SEARCH(s, _jwt);
    res && Array.isArray(res) ? setResult(res) : setResult([]);
    setIsLoading(false);
  };

  const setGPSLocation = async () => {
    let recover = await recoveringStateLocation();
    while (recover === "error" || !recover) {
      recover = await recoveringStateLocation();
    }
    setCoords({
      latitude: recover?.coords?.latitude,
      longitude: recover?.coords?.longitude,
    });
  };

  const recoverNearbyPlaces = async () => {
    await setNearResults([]);

    const arrTmp = await Promise.all(
      results.map(async (element, i) => {
        const res = await distancesUtil.calculateDistances(
          coords,
          element?.attributes?.entrepreneurship?.data?.attributes?.gps
        );

        const distanceBetween = res / 1000;

        if (distancesUtil.distanceMax >= distanceBetween) {
          // console.log(i, distanceBetween, distancesUtil.distanceMax);
          return element;
        } else {
          null;
        }
      })
    );

    const filtered = arrTmp.filter((e) => e && e !== null);

    const newShuffleArr = shuffleArray(filtered);

    await setNearResults(newShuffleArr);
  };

  const ResultsToSearch = () => {
    // render results
    let res = results.map((item, i) => {
      return (
        <ResultSearchCard
          key={"result_search_" + i}
          itemProduct={item}
          onShow={onShow}
        />
      );
    });

    return res;
  };

  const ResultsNearToSearch = () => {
    // render results
    let res = nearResults.map((item, i) => {
      return (
        <ResultSearchCard
          key={"result_search_near_" + i}
          itemProduct={item}
          onShow={onShow}
        />
      );
    });

    return res;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onShow();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/** Close Element */}
          <TouchableOpacity
            style={styles.closeElement}
            onPress={() => onShow()}
          >
             <View style={styles2.container}>
                <Image
                  style={styles2.stretch}
                  source={require("../../../../assets/chevron_down_alt.png")}
                />
              </View>
            {/* <AntDesign name="down" size={20} color={GlobalVars.firstColor} /> */}
          </TouchableOpacity>

          {/* Search Bar */}
          <View style={styles.viewInput}>
            <InputSearch
              label="Ingresa tu búsqueda"
              iconName={search?.length ? "x" : "search"}
              textvariable={search}
              setValue={(val) => setSearch(val)}
              isHeadingPosition
            />
          </View>

          <AnimatedScrollView
            style={styles.stylesResult}
            contentContainerStyle={styles.contentResult}
          >
            {isLoading ? (
              <></>
            ) : (
              <View style={styles.containerResultSet}>
                {nearResults.length > 0 && (
                  <LabelTextComponent
                    size={15}
                    text="Resultados cerca de tí"
                    color={GlobalVars.textGrayColor}
                  />
                )}
                <View style={styles.spacing} />
                {ResultsNearToSearch()}
              </View>
            )}

            <View style={styles.spacing} />

            {isLoading ? (
              <View style={styles.centeredSpinner}>
                <ActivityIndicator
                  animating={true}
                  size="large"
                  color={GlobalVars.blueOpaque}
                  style={{ marginVertical: 30 }}
                />
              </View>
            ) : (
              <View style={styles.containerResultSet}>
                {results.length > 0 && (
                  <LabelTextComponent
                    size={15}
                    text="Todos los resultados"
                    color={GlobalVars.textGrayColor}
                  />
                )}
                <View style={styles.spacing} />
                {ResultsToSearch()}
              </View>
            )}
          </AnimatedScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ModalSearch;

const styles2 = StyleSheet.create({
  container: {
    width: 33,
    height: 33,
  },
  stretch: {
    width: 33,
    height: 33,
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

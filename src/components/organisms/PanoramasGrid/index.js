import * as React from "react";
import { View, Animated, ScrollView, ActivityIndicator } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { GET_JUST_PANORAMAS } from "../../../mock/panoramas";

import { shuffleArray } from "../../../helpers/shuffleArr";
import distancesUtil from "../../../utils/calculateGPSdistances";

/** Import Componentes Custom */
import LabelTextComponent from "../../atoms/LabelText";
import PanoramaCard from "../../molecules/PanoramaCard";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function PanoramasGrid({
  jwt = null,
  filterText = "",
  showTitle = false,
  title = "",
  activeNears = false,
  gps = null,
}) {
  const navigation = useNavigation();

  const [result, setResult] = React.useState([]);
  const [resultfilter, setResultfilter] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [empty, setEmpty] = React.useState(false);

  const [nearResults, setNearResults] = React.useState([]);

  React.useEffect(() => {}, []);

  React.useEffect(() => {
    let isMount = true;

    if (isMount) {
      /** Get products */
      getPanoramas();
    }

    return () => {
      isMount = false;
    };
  }, []);

  React.useEffect(() => {
    let isMountRes = true;

    if (isMountRes) {
      if (result?.length) {
        SearchFilter(filterText);

        // near places
        if (activeNears) {
          if (searchWaiting) clearTimeout(searchWaiting);
          let searchWaiting = setTimeout(() => {
            searchWaiting = null;
            recoverNearbyPlaces();
          }, 1500);
        }
      } else {
        setResultfilter([]);
      }
    }

    return () => {
      isMountRes = false;
    };
  }, [result]);

  React.useEffect(() => {
    let isMounSearch = true;

    if (isMounSearch) {
      SearchFilter(filterText);
    }

    return () => {
      isMounSearch = false;
    };
  }, [filterText]);

  const getPanoramas = async () => {
    try {
      await setLoading(true);

      const res = await GET_JUST_PANORAMAS(jwt);

      if (res && res.length) {
        setLoading(false);
        setResult(res);
        setEmpty(false);
      } else {
        setLoading(false);
        setEmpty(true);
        setResult([]);
      }
    } catch (e) {
      // console.log("error", e);
      setLoading(false);
      setEmpty(true);
      setResult([]);
    }
  };

  const SearchFilter = (textSearch) => {
    if (textSearch) {
      const newData = result.filter(function (item) {
        const itemData = item?.attributes?.panorama.toUpperCase();
        const textData = textSearch.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setResultfilter(newData);
    } else {
      setResultfilter(result);
    }
  };

  const recoverNearbyPlaces = async () => {
    await setNearResults([]);

    const arrTmp = await Promise.all(
      result.map(async (element, i) => {
        const res = await distancesUtil.calculateDistances(
          gps,
          element?.attributes?.gps
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

  let cards = resultfilter.map((item, i) => {
    return <PanoramaCard key={`panorama_item_${i}`} item={item} isAllPans />;
  });

  let ResultsNearToSearch = nearResults.map((item, i) => {
    if (i > 3) {
      return (
        <PanoramaCard key={`panorama_item_near_${i}`} item={null} isAllPans />
      );
    } else {
      return (
        <PanoramaCard key={`panorama_item_near_${i}`} item={item} isAllPans />
      );
    }
  });

  return (
    <View style={styles.rootView}>
      <View style={styles.viewContainer}>
        {loading && (
          <ActivityIndicator
            style={{ alignSelf: "center", marginVertical: 30 }}
            size="large"
            color={GlobalVars.orange}
          />
        )}
        <AnimatedScrollView
          style={styles.stylesCarousel}
          contentContainerStyle={styles.contentCarousel}
        >
          {!loading && empty && (
            <LabelTextComponent
              text="Por el momento esta lista está vacía."
              color={GlobalVars.textGrayColor}
              size={16}
            />
          )}

          {(!loading && !empty && nearResults.length && (
            <>
              <LabelTextComponent
                text="Cerca de tí"
                color={GlobalVars.textGrayColor}
                size={16}
              />
              <View style={styles.spacingSections} />
              <View style={styles.wrapGrid}>
                {(!loading &&
                  !empty &&
                  nearResults.length &&
                  ResultsNearToSearch) || <></>}
              </View>
              <View style={styles.spacingSections} />
            </>
          )) || <></>}

          {(!loading && !empty && showTitle && (
            <>
              <LabelTextComponent
                text={title}
                color={GlobalVars.textGrayColor}
                size={16}
              />
              <View style={styles.spacingSections} />
            </>
          )) || <></>}
          <View style={styles.wrapGrid}>
            {(!loading && !empty && cards) || <></>}
          </View>
        </AnimatedScrollView>
      </View>
    </View>
  );
}

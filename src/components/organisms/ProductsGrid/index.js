import * as React from "react";
import {
  View,
  Animated,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import {
  GET_ALLS_PRODUCTS_CATEGORY,
  GET_ALLS_PRODUCTS,
} from "../../../mock/productsByCategory";
import { GET_ALLS_PRODUCTS_ENTREPRENEUR } from "../../../mock/productsByEntrepreneur";
import { GET_10_STAR_PRODUCTS_ENTREPRENEUR } from "../../../mock/productsByEntrepreneurFeatured";

import { shuffleArray } from "../../../helpers/shuffleArr";
import distancesUtil from "../../../utils/calculateGPSdistances";

/** Import Componentes Custom */
import LabelTextComponent from "../../atoms/LabelText";
import ProductCard from "../../molecules/ProductCard";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const CATEGORY_ALLS = 9999999;

export default function ProductsGrid({
  jwt = null,
  selectedCategory = null,
  entrepreneur = null,
  justFeatures = false,
  isMyShop = false,
  allActive = false,
  filterText = "",
  showTitle = false,
  title = "",
  activeNears = false,
  gps = null,
  isSpacing = false,
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
      getProducts();
    }

    return () => {
      isMount = false;
    };
  }, [selectedCategory, entrepreneur]);

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

  const getProducts = async () => {
    await setLoading(true);
    if (entrepreneur && justFeatures) {
      const res = await GET_10_STAR_PRODUCTS_ENTREPRENEUR(entrepreneur, jwt);
      if (res && res.length) {
        setLoading(false);
        setResult(res);
        setEmpty(false);
      } else {
        setLoading(false);
        setEmpty(true);
        setResult([]);
      }
    } else if (entrepreneur && !justFeatures) {
      const res = await GET_ALLS_PRODUCTS_ENTREPRENEUR(entrepreneur, jwt);

      if (res && res.length) {
        setLoading(false);
        setResult(res);
        setEmpty(false);
      } else {
        setLoading(false);
        setEmpty(true);
        setResult([]);
      }
    } else if (selectedCategory) {
      const res =
        selectedCategory === CATEGORY_ALLS
          ? await GET_ALLS_PRODUCTS(jwt)
          : await GET_ALLS_PRODUCTS_CATEGORY(selectedCategory, jwt);

      if (res && res.length) {
        setLoading(false);
        setResult(res);
        setEmpty(false);
      } else {
        setLoading(false);
        setEmpty(true);
        setResult([]);
      }
    } else {
      const res = await GET_ALLS_PRODUCTS_ENTREPRENEUR(entrepreneur, jwt);

      if (res && res.length) {
        setLoading(false);
        setResult(res);
        setEmpty(false);
      } else {
        setLoading(false);
        setEmpty(true);
        setResult([]);
      }
    }
  };

  const SearchFilter = (textSearch) => {
    if (textSearch) {
      const newData = result.filter(function (item) {
        const itemData = item?.attributes?.product.toUpperCase();
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
          element?.attributes?.entrepreneurship?.data?.attributes?.gps
        );
        console.log('res',res);
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
    if (isMyShop) {
      return <ProductCard key={`product_item_${i}`} item={item} isMyShop />;
    } else {
      return <ProductCard key={`product_item_${i}`} item={item} />;
    }
  });

  let ResultsNearToSearch = nearResults.map((item, i) => {
    if (i > 3)
      return <ProductCard key={`product_item_near_${i}`} item={null} />;

    if (isMyShop) {
      return (
        <ProductCard key={`product_item_near_${i}`} item={item} isMyShop />
      );
    } else {
      return <ProductCard key={`product_item_near_${i}`} item={item} />;
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
          contentContainerStyle={[
            styles.contentCarousel,
            { paddingHorizontal: isSpacing ? 10 : 0 },
          ]}
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

          {!loading && !empty && !allActive && (
            <TouchableOpacity
              style={styles.viewAll}
              onPress={() =>
                navigation.navigate("Products", { shopID: entrepreneur })
              }
            >
              <LabelTextComponent
                text="Ver todos"
                size={15}
                color={GlobalVars.textGrayColor}
              />
            </TouchableOpacity>
          )}
        </AnimatedScrollView>
      </View>
    </View>
  );
}

import * as React from "react";
import { View, Animated, ScrollView, ActivityIndicator } from "react-native";

import { GET_ALLS_ENTREPRENEURS } from "../../../mock/entrepreneurs";
import { GET_ENTREPRENEURS_FOR_CATEGORY } from "../../../mock/entrepreneursByCat";

/** Import Componentes Custom */
import LabelTextComponent from "../../atoms/LabelText";
import EntrepreneurCard from "../../molecules/EntrepreneurCard";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function EntrepreneursGrid({
  jwt = null,
  selectedCategory = null,
  filterText = "",
}) {
  const [result, setResult] = React.useState([]);
  const [resultfilter, setResultfilter] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [empty, setEmpty] = React.useState(false);

  React.useEffect(() => {
    /** Get products */
    getEntrepreneurs();
  }, []);

  React.useEffect(() => {
    /** Get products */
    getEntrepreneurs();
  }, [selectedCategory]);

  React.useEffect(() => {
    if (result && result.length) {
      SearchFilter(filterText);
    } else {
      setResultfilter([]);
    }
  }, [result]);

  React.useEffect(() => {
    SearchFilter(filterText);
  }, [filterText]);

  const getEntrepreneurs = async () => {
    await setLoading(true);
    if (selectedCategory) {
      const res = await GET_ENTREPRENEURS_FOR_CATEGORY(jwt, selectedCategory);

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
      const res = await GET_ALLS_ENTREPRENEURS(jwt);

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
        const itemData = item?.attributes?.entrepreneurship.toUpperCase();
        const textData = textSearch.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setResultfilter(newData);
    } else {
      setResultfilter(result);
    }
  };

  let cards = resultfilter.map((item, i) => {
    if (selectedCategory) {
      return (
        <EntrepreneurCard
          key={`entrepreneur_card__${i}`}
          item={item}
          isAllCats
        />
      );
    } else {
      return (
        <EntrepreneurCard key={`entrepreneur_card__${i}`} item={item} isLarge />
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
          {!loading && !empty && cards}
          {!loading && empty && (
            <LabelTextComponent
              text="Por el momento esta lista está vacía."
              color={GlobalVars.textGrayColor}
              size={16}
            />
          )}
        </AnimatedScrollView>
      </View>
    </View>
  );
}

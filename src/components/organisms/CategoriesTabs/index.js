import * as React from "react";
import { View, Animated, ScrollView } from "react-native";

import { GET_CATEGORIES } from "../../../mock/categoriesAuth";

/** Import Componentes Custom */
import LabelTab from "../../molecules/LabelTab";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const CATEGORY_ALLS = 9999999;

export default function CategoriesCarouselTabs({
  navigation,
  jwt = null,
  selected = null,
  ...props
}) {
  const [result, setResult] = React.useState([]);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    let isMount = true;

    if (isMount) {
      /** Get categories */
      getCategories();
    }

    return () => {
      isMount = false;
    };
  }, []);

  React.useEffect(() => {
    let isMountRes = true;

    if (isMountRes) {
      buildCards();
    }

    return () => {
      isMountRes = false;
    };
  }, [result, selected]);

  const getCategories = async () => {
    const res = await GET_CATEGORIES(jwt);
    if (res && res.length && selected) {
      const filtro = res.filter((item) => item.id === selected);
      const fromIndex = res.indexOf(filtro[0]);
      res.splice(fromIndex, 1);
      res.splice(0, 0, filtro[0]);
      setResult(res);
    } else if (res && res.length) {
      setResult(res);
    }
  };

  const returnAction = (id) => {
    if (props.changeSelection) {
      props.changeSelection(id);
    }
  };

  const buildCards = () => {
    let build = (result?.length &&
      result.map((item, i) => {
        if (!selected) {
          if (i === 0) {
            returnAction(CATEGORY_ALLS);
            return (
              <>
                <LabelTab
                  key={`tab_category_${CATEGORY_ALLS}`}
                  label="Todos"
                  id={CATEGORY_ALLS}
                  selected={selected}
                  returnAction={returnAction}
                  border
                />
                <LabelTab
                  key={`tab_category_${i}`}
                  label={item?.attributes?.category}
                  id={item?.id}
                  selected={selected}
                  returnAction={returnAction}
                />
              </>
            );
          } else {
            return (
              <LabelTab
                key={`tab_category_${i}`}
                label={item?.attributes?.category}
                id={item?.id}
                returnAction={returnAction}
                selected={selected}
              />
            );
          }
        } else {
          if (selected === item.id) {
            if (i === 0) {
              return (
                <>
                  <LabelTab
                    key={`tab_category_${i}`}
                    label={item?.attributes?.category}
                    id={item?.id}
                    selected={selected}
                    returnAction={returnAction}
                    border
                  />
                  <LabelTab
                    key={`tab_category_${CATEGORY_ALLS}`}
                    label="Todos"
                    id={CATEGORY_ALLS}
                    selected={selected}
                    returnAction={returnAction}
                  />
                </>
              );
            } else {
              return (
                <LabelTab
                  key={`tab_category_${i}`}
                  label={item?.attributes?.category}
                  id={item?.id}
                  selected={selected}
                  returnAction={returnAction}
                  border
                />
              );
            }
          } else {
            if (i === 0) {
              if (selected === CATEGORY_ALLS) {
                return (
                  <>
                    <LabelTab
                      key={`tab_category_${CATEGORY_ALLS}`}
                      label="Todos"
                      id={CATEGORY_ALLS}
                      selected={selected}
                      returnAction={returnAction}
                      border
                    />
                    <LabelTab
                      key={`tab_category_${i}`}
                      label={item?.attributes?.category}
                      id={item?.id}
                      selected={selected}
                      returnAction={returnAction}
                    />
                  </>
                );
              } else {
                return (
                  <>
                    <LabelTab
                      key={`tab_category_${CATEGORY_ALLS}`}
                      label="Todos"
                      id={CATEGORY_ALLS}
                      selected={selected}
                      returnAction={returnAction}
                    />
                    <LabelTab
                      key={`tab_category_${i}`}
                      label={item?.attributes?.category}
                      id={item?.id}
                      selected={selected}
                      returnAction={returnAction}
                    />
                  </>
                );
              }
            } else {
              return (
                <LabelTab
                  key={`tab_category_${i}`}
                  label={item?.attributes?.category}
                  id={item?.id}
                  selected={selected}
                  returnAction={returnAction}
                />
              );
            }
          }
        }
      })) || <></>;

    setCards(build);
  };

  return (
    <View style={styles.rootView}>
      <View style={styles.viewContainer}>
        <AnimatedScrollView
          style={styles.stylesCarousel}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={200}
          snapToInterval={2}
          decelerationRate="fast"
          bounces={false}
          bouncesZoom={true}
          pagingEnabled
          contentContainerStyle={styles.contentCarousel}
        >
          {cards}
        </AnimatedScrollView>
      </View>
    </View>
  );
}

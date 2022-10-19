import * as React from "react";
import { View, Animated, ScrollView } from "react-native";

import { GET_CATEGORIES_BY_USER } from "../../../mock/categoriesByUser";

/** Import Componentes Custom */
import TitleComponent from "../../atoms/Titles";
import CategoryCard from "../../molecules/CategoryCard";
import LabelTouchable from "../../molecules/LabelTouchable";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function CategoriesCarouselComponent({
  navigation,
  _jwt = null,
  isFavCats = false,
  isNearCats = false,
  isAllCats = false,
  ToRandomDispatch,
  ...props
}) {
  const [result, setResult] = React.useState([]);

  React.useEffect(() => {}, []);

  React.useEffect(() => {
    getCategoriesWhenCase();
  }, [ToRandomDispatch]);

  const getCategoriesWhenCase = async () => {
    if (isFavCats) {
      const res = await GET_CATEGORIES_BY_USER(_jwt);
      setResult(res);
    } else if (isNearCats) {
    } else if (isAllCats) {
    } else {
    }
  };

  let cards = (result?.length &&
    result.map((item, i) => {
      if (isFavCats) {
        return (
          <CategoryCard key={`category_card_${i}`} item={item} isFavCats />
        );
      } else if (isNearCats) {
        return (
          <CategoryCard key={`category_card_${i}`} item={item} isNearCats />
        );
      } else if (isAllCats) {
        return (
          <CategoryCard key={`category_card_${i}`} item={item} isAllCats />
        );
      }
    })) || <></>;

  return (
    <View style={styles.rootView}>
      <View style={styles.viewContainer}>
        <View
          style={[
            styles.headerContent,
            {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              width: GlobalVars.windowWidth,
            },
          ]}
        >
          <TitleComponent
            title={`Para ti`}
            color={GlobalVars.firstColor}
            size={24}
          />
          <LabelTouchable
            label={`Ver todo`}
            sizeText={20}
            color={GlobalVars.firstColor}
            onPress={() => navigation.navigate("Categories")}
            aditionalStyle={styles.viewAllLabel}
          />
        </View>
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
          {!result?.length && (
            <TitleComponent
              title={`Sin intereses por el momento.`}
              color={GlobalVars.textGrayColor}
              size={16}
            />
          )}
          {result?.length ? cards : <></>}
        </AnimatedScrollView>
      </View>
    </View>
  );
}

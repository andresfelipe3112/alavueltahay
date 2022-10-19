import * as React from "react";
import { View, Animated, ScrollView, TouchableOpacity } from "react-native";

import { GET_FEATURED_ENTREPRENEURS_FOR_CUSTOMERS } from "../../../mock/entrepreneursFeaturedForCustomers";
import { GET_JUST_5_ENTREPRENEURS_FOR_CUSTOMERS } from "../../../mock/entrepreneurs5FirstRowsForCustomers";

/** Import Componentes Custom */
import TitleComponent from "../../atoms/Titles";
import EntrepreneurCard from "../../molecules/EntrepreneurCard";
import ImageLocalComponent from "../../atoms/ImageLocalComponent";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function EntrepreneurCarousel({
  navigation,
  _jwt = null,
  type = "featured",
  onHandleType,
  ToRandomDispatch,
  ...props
}) {
  const [result, setResult] = React.useState([]);

  React.useEffect(() => {}, []);

  React.useEffect(() => {
    /** Get entrepreneurships */
    getEntrepreneursWhenCase();
  }, [type]);

  React.useEffect(() => {
    getEntrepreneursWhenCase();
  }, [ToRandomDispatch]);

  const getEntrepreneursWhenCase = async () => {
    let res = null;
    switch (type) {
      case "featured":
        res = await GET_FEATURED_ENTREPRENEURS_FOR_CUSTOMERS(_jwt);
        if (!res.length) {
          res = await GET_JUST_5_ENTREPRENEURS_FOR_CUSTOMERS(_jwt);
        }
        setResult(res);
        break;

      default:
        res = await GET_FEATURED_ENTREPRENEURS_FOR_CUSTOMERS(_jwt);
        setResult(res);
        break;
    }
  };

  let cards = (result?.length &&
    result.map((item, i) => {
      if (type === "featured") {
        return (
          <EntrepreneurCard
            key={`entrepreneur_card_${i}`}
            item={item}
            isFeatured
          />
        );
      }
    })) || <></>;

  return (
    <View style={styles.rootView}>
      <View style={styles.viewContainer}>
        <View style={styles.headerContent}>
          <TitleComponent
            title={`Siempre hay algo interesante`}
            color={GlobalVars.firstColor}
            size={24}
            customStyles={{ textAlign: "left" }}
          />
        </View>
        <View style={styles.contentRedesign}>
          <View style={styles.mainContent}>
            <View style={styles.featuredStyle}>
              <TouchableOpacity
                style={styles.optionMain}
                onPress={() => onHandleType("featured")}
              >
                <TitleComponent
                  size={24}
                  title={`Destacados`}
                  color={GlobalVars.white}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.allEntrepreneurs}>
              <View style={styles.centeredLogo}>
                <ImageLocalComponent
                  img={require("../../../../assets/images/alvh_logo.png")}
                  width={75}
                  height={75}
                />
              </View>
              <TouchableOpacity
                style={styles.buttonSearchShops}
                onPress={() => navigation.navigate("Entrepreneurs")}
              >
                <TitleComponent
                  size={13}
                  title={`Buscar negocios`}
                  color={GlobalVars.white}
                />
              </TouchableOpacity>
            </View>
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
            {cards}
          </AnimatedScrollView>
        </View>
      </View>
    </View>
  );
}

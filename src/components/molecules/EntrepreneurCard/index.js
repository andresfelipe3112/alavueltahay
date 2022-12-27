import React from "react";
import { View, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

import GlobalVars from "../../../global/globalVars";

import TitleComponent from "../../atoms/Titles";
import ImageUriComponent from "../../atoms/ImageUriComponent";

/** Import Styles for this Screen */
import Styles from "./style";
import truncateText from "../../../helpers/truncateText";

const styles = Styles;

export default function EntrepreneurCard({ item = null, ...props }) {
  const navigation = useNavigation();

  const returnAction = () => {
    navigation.navigate("Shop", { shop: item });
  };

  if (!item) return <></>;

  if (props.isFeatured) {
    return (
      <TouchableOpacity
        style={styles.containerCardIsFeatured}
        onPress={() => returnAction()}
      >
        {item?.attributes?.avatar && !item?.attributes?.imageFirst?.data && (
          <ImageUriComponent
            radius={0}
            mode="cover"
            img={{
              uri: item?.attributes?.avatar?.data?.attributes?.uriAvatar,
            }}
            width="100%"
            height="70%"
            borderTopRadius={25}
          />
        )}

        {!item?.attributes?.avatar?.data && item?.attributes?.imageFirst?.data && (
          <ImageUriComponent
            radius={0}
            mode="cover"
            img={{
              uri: item?.attributes?.imageFirst?.data?.attributes?.uri,
            }}
            width="100%"
            height="70%"
            borderTopRadius={25}
          />
        )}

        {item?.attributes?.avatar?.data && item?.attributes?.imageFirst?.data && (
          <ImageUriComponent
            radius={0}
            mode="cover"
            img={{
              uri: item?.attributes?.imageFirst?.data?.attributes?.uri,
            }}
            width="100%"
            height="70%"
            borderTopRadius={25}
          />
        )}
        <View style={styles.contentCardIsFeatured}>
          <View style={styles.aditionalInfo}>
            <TitleComponent
              title={item?.attributes?.category?.data?.attributes?.category}
              color={GlobalVars.textGrayColor}
              size={10}
              customStyles={{ textTransform: "uppercase" }}
            />
          </View>
          <View style={{ width: "100%", height: 5 }} />
          <View style={[styles.aditionalInfo, {}]}>
            <TitleComponent
               title={item?.attributes?.entrepreneurship}
              color={GlobalVars.textGrayColor}
              size={13}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  if (props.isAllCats) {
    return (
      <View style={styles.containerCardIsAllCats}>
        <TouchableOpacity
          style={styles.containerTouchableInAll}
          onPress={() => returnAction()}
        >
          {/* <ImageUriComponent
            radius={0}
            mode="cover"
            img={{
              uri: item?.attributes?.imageFirst?.data?.attributes?.uri,
            }}
            width="100%"
            height={GlobalVars.windowWidth / 5}
            borderTopRadius={25}
          /> */}
          {item?.attributes?.avatar && !item?.attributes?.imageFirst?.data && (
            <ImageUriComponent
              radius={0}
              mode="cover"
              img={{
                uri: item?.attributes?.avatar?.data?.attributes?.uriAvatar,
              }}
              width="100%"
              height={GlobalVars.windowWidth / 5}
              borderTopRadius={25}
            />
          )}

          {!item?.attributes?.avatar?.data &&
            item?.attributes?.imageFirst?.data && (
              <ImageUriComponent
                radius={0}
                mode="cover"
                img={{
                  uri: item?.attributes?.imageFirst?.data?.attributes?.uri,
                }}
                width="100%"
                height={GlobalVars.windowWidth / 5}
                borderTopRadius={25}
              />
            )}

          {item?.attributes?.avatar?.data &&
            item?.attributes?.imageFirst?.data && (
              <ImageUriComponent
                radius={0}
                mode="cover"
                img={{
                  uri: item?.attributes?.imageFirst?.data?.attributes?.uri,
                }}
                width="100%"
                height={GlobalVars.windowWidth / 5}
                borderTopRadius={25}
              />
            )}
          <View style={styles.contentCardIsAll}>
            <TitleComponent
              title={item?.attributes?.entrepreneurship}
              color={GlobalVars.textGrayColor}
              size={14}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  if (props.isLarge) {
    return (
      <View style={[styles.containerCardIsLarge, { maxHeight:false ?  GlobalVars.windowWidth / 1.70 :GlobalVars.windowWidth / 2 }]}>
        <TouchableOpacity
          style={styles.containerTouchableIsLarge}
          onPress={() => returnAction()}
        >
          {/* <ImageUriComponent
            radius={0}
            mode="cover"
            img={{
              uri: item?.attributes?.imageFirst?.data?.attributes?.uri,
            }}
            width="100%"
            height={GlobalVars.windowWidth / 3}
            borderTopRadius={25}
          /> */}
          {item?.attributes?.avatar && !item?.attributes?.imageFirst?.data && (
            <ImageUriComponent
              radius={0}
              mode="cover"
              img={{
                uri: item?.attributes?.avatar?.data?.attributes?.uriAvatar,
              }}
              width="100%"
              height={GlobalVars.windowWidth / 3}
              borderTopRadius={25}
            />
          )}

          {!item?.attributes?.avatar?.data &&
            item?.attributes?.imageFirst?.data && (
              <ImageUriComponent
                radius={0}
                mode="cover"
                img={{
                  uri: item?.attributes?.imageFirst?.data?.attributes?.uri,
                }}
                width="100%"
                height={GlobalVars.windowWidth / 3}
                borderTopRadius={25}
              />
            )}

          {item?.attributes?.avatar?.data &&
            item?.attributes?.imageFirst?.data && (
              <ImageUriComponent
                radius={0}
                mode="cover"
                img={{
                  uri: item?.attributes?.imageFirst?.data?.attributes?.uri,
                }}
                width="100%"
                height={GlobalVars.windowWidth / 3}
                borderTopRadius={25}
              />
            )}
          <View style={styles.contentCardIsLarge}>
            <TitleComponent
              title={truncateText(item?.attributes?.entrepreneurship, 30)}
              color={GlobalVars.textGrayColor}
              size={14}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

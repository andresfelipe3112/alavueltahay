import React, { useState, useEffect } from "react";

import { View, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from "react-native";

import Checkbox from "expo-checkbox";

import { Select } from "native-base";

import { Entypo, AntDesign } from "@expo/vector-icons";

import GlobalVars from "../../../global/globalVars";

import { hoursCollection } from "../../../mock/hoursCollection";

import updateDataEntrepreneur from "../../../helpers/updateDataEntrepreneur";

import LabelTextComponent from "../../atoms/LabelText";
import ButtonComponent from "../../atoms/ButtonComponent";

import Styles from "./style";
import { Cancel } from "../../molecules/cancel";

const styles = Styles;

const PickerHoursShop = ({
  isEntrepreneurUpdate = false,
  _jwt = null,
  entrepreneur = null,
  hoursT,
  ...props
}) => {
  const { onClose, getRandomNumberDispatch } = props;

  const [continuousHours, setContinuousHours] = useState(
    hoursT.continuousHours ?? false
  );

  const [hours, setHours] = useState(hoursT);
  const [errMsg, setErrMsg] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMount = true;
    if (isMount) {
      setHours({ ...hoursT });
    }

    return () => {
      isMount = false;
    };
  }, []);

  // const captureWorkingTime = async () => {
  //   setHours({
  //     open: "08:00",
  //     close: "17:00",
  //   });
  // };

  const saveHours = async () => {
    try {
      setLoading(true);
      if (
        !hours &&
        ((!continuousHours && !hours.open && !hours.close) ||
          (continuousHours && !hours.morning && !hours.evernoon))
      ) {
        setErrMsg("Debe seleccionar un horario válido.");
        setShowErr(true);
        setLoading(false);
        setTimeout(() => {
          setShowErr(false);
        }, 1200);
      } else {
        const res = await updateDataEntrepreneur.entrepreneurHours(
          {
            id: entrepreneur.id,
            hours,
            continuousHours,
          },
          _jwt
        );

        if (res) {
          setLoading(false);
          onClose();
          getRandomNumberDispatch();
        } else {
          setErrMsg("Ocurrió un error durante la actualización de datos");
          setShowErr(true);
          setTimeout(() => {
            setShowErr(false);
          }, 1200);
          setLoading(false);
        }
      }
    } catch (e) {
      setErrMsg("Ocurrió un error durante la actualización de datos.");
      setShowErr(true);
      setLoading(false);
      setTimeout(() => {
        setShowErr(false);
      }, 1200);
    }
  };

  const optionsHours = (hoursCollection.length &&
    hoursCollection.map((hour) => {
      return (
        <Select.Item
          key={"hour_" + hour?.id}
          label={hour?.hour}
          value={hour?.hour}
        />
      );
    })) || <></>;

  return (
    <View style={styles.view}>
      {!loading && (
        <LabelTextComponent
        style={{top:-25, alignSelf: "center", left: -5}}
          text="Horario de atención"
          color={GlobalVars.blueOpaque}
          size={20}
        />
      )}
      {loading && (
        <ActivityIndicator
          color={GlobalVars.orange}
          size="large"
          style={{ alignSelf: "center" }}
        />
      )}

      {showErr && errMsg && (
        <TouchableOpacity onPress={() => setShowErr(false)}>
          <LabelTextComponent
            text={errMsg}
            color={GlobalVars.googleColor}
            size={13}
          />
        </TouchableOpacity>
      )}

      {!loading && (
        <View style={styles.containerScroll}>
          {!continuousHours && (
            <>
              <View style={styles.rowHour}>
                <LabelTextComponent
                  text="Desde: "
                  color={GlobalVars.blueOpaque}
                  size={15}
                />
                <View style={styles.columnSeparator} />
                <Select
                  selectedValue={hours?.open || hoursCollection[48].hour}
                  accessibilityLabel="Apertura"
                  placeholder="Apertura"
                  fontFamily={GlobalVars.fontFamily}
                  width={GlobalVars.windowWidth / 2}
                  color={GlobalVars.white}
                  borderColor={GlobalVars.orange}
                  backgroundColor={GlobalVars.orange}
                  _selectedItem={{
                    bg: "orange.100",
                    endIcon: (
                      <AntDesign
                        name="check"
                        size={20}
                        color={GlobalVars.orange}
                      />
                    ),
                    borderColor: GlobalVars.orange,
                  }}
                  _hover={{
                    backgroundColor: GlobalVars.blueOpaque,
                    color: GlobalVars.white,
                  }}
                  customDropdownIconProps={{
                    color: GlobalVars.white,
                    marginRight: 2,
                  }}
                  onValueChange={(itemValue) =>
                    setHours({ ...hours, open: itemValue })
                  }
                >
                  {optionsHours}
                </Select>
              </View>
              <View style={styles.rowHour}>
                <LabelTextComponent
                  text="Hasta: "
                  color={GlobalVars.blueOpaque}
                  size={15}
                />
                <View style={styles.columnSeparator} />
                <Select
                  selectedValue={hours?.close || hoursCollection[48].hour}
                  accessibilityLabel="Apertura"
                  placeholder="Apertura"
                  fontFamily={GlobalVars.fontFamily}
                  width={GlobalVars.windowWidth / 2}
                  color={GlobalVars.white}
                  borderColor={GlobalVars.orange}
                  backgroundColor={GlobalVars.orange}
                  _selectedItem={{
                    bg: "orange.100",
                    endIcon: (
                      <AntDesign
                        name="check"
                        size={20}
                        color={GlobalVars.orange}
                      />
                    ),
                    borderColor: GlobalVars.orange,
                  }}
                  _hover={{
                    backgroundColor: GlobalVars.blueOpaque,
                    color: GlobalVars.white,
                  }}
                  customDropdownIconProps={{
                    color: GlobalVars.white,
                    marginRight: 2,
                  }}
                  onValueChange={(itemValue) =>
                    setHours({ ...hours, close: itemValue })
                  }
                >
                  {optionsHours}
                </Select>
              </View>
            </>
          )}

          {continuousHours && (
            <>
              <View style={styles.rowHour}>
                <LabelTextComponent
                  text="Mañana: "
                  color={GlobalVars.blueOpaque}
                  size={15}
                />
                <View style={styles.columnSeparator} />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Select
                    selectedValue={
                      hours?.morning?.open || hoursCollection[48].hour
                    }
                    accessibilityLabel="Apertura"
                    placeholder="Apertura"
                    fontFamily={GlobalVars.fontFamily}
                    width={GlobalVars.windowWidth / 4}
                    color={GlobalVars.white}
                    borderColor={GlobalVars.orange}
                    backgroundColor={GlobalVars.orange}
                    _selectedItem={{
                      bg: "orange.100",
                      endIcon: (
                        <AntDesign
                          name="check"
                          size={20}
                          color={GlobalVars.orange}
                        />
                      ),
                      borderColor: GlobalVars.orange,
                    }}
                    _hover={{
                      backgroundColor: GlobalVars.blueOpaque,
                      color: GlobalVars.white,
                    }}
                    customDropdownIconProps={{
                      color: GlobalVars.white,
                      marginRight: 2,
                    }}
                    onValueChange={(itemValue) =>
                      setHours({
                        ...hours,
                        morning: { ...hours.morning, open: itemValue },
                      })
                    }
                  >
                    {optionsHours}
                  </Select>
                  <View style={styles.columnSeparator} />
                  <Select
                    selectedValue={
                      hours?.morning?.close || hoursCollection[48].hour
                    }
                    accessibilityLabel="Cierre"
                    placeholder="Cierre"
                    fontFamily={GlobalVars.fontFamily}
                    width={GlobalVars.windowWidth / 4}
                    color={GlobalVars.white}
                    borderColor={GlobalVars.orange}
                    backgroundColor={GlobalVars.orange}
                    _selectedItem={{
                      bg: "orange.100",
                      endIcon: (
                        <AntDesign
                          name="check"
                          size={20}
                          color={GlobalVars.orange}
                        />
                      ),
                      borderColor: GlobalVars.orange,
                    }}
                    _hover={{
                      backgroundColor: GlobalVars.blueOpaque,
                      color: GlobalVars.white,
                    }}
                    customDropdownIconProps={{
                      color: GlobalVars.white,
                      marginRight: 2,
                    }}
                    onValueChange={(itemValue) =>
                      setHours({
                        ...hours,
                        morning: { ...hours.morning, close: itemValue },
                      })
                    }
                  >
                    {optionsHours}
                  </Select>
                </View>
              </View>

              <View style={styles.rowHour}>
                <LabelTextComponent
                  text="Tarde: "
                  color={GlobalVars.blueOpaque}
                  size={15}
                />
                <View style={styles.columnSeparator} />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Select
                    selectedValue={
                      hours?.evernoon?.open || hoursCollection[48].hour
                    }
                    accessibilityLabel="Apertura"
                    placeholder="Apertura"
                    fontFamily={GlobalVars.fontFamily}
                    width={GlobalVars.windowWidth / 4}
                    color={GlobalVars.white}
                    borderColor={GlobalVars.orange}
                    backgroundColor={GlobalVars.orange}
                    _selectedItem={{
                      bg: "orange.100",
                      endIcon: (
                        <AntDesign
                          name="check"
                          size={20}
                          color={GlobalVars.orange}
                        />
                      ),
                      borderColor: GlobalVars.orange,
                    }}
                    _hover={{
                      backgroundColor: GlobalVars.blueOpaque,
                      color: GlobalVars.white,
                    }}
                    customDropdownIconProps={{
                      color: GlobalVars.white,
                      marginRight: 2,
                    }}
                    onValueChange={(itemValue) =>
                      setHours({
                        ...hours,
                        evernoon: { ...hours.evernoon, open: itemValue },
                      })
                    }
                  >
                    {optionsHours}
                  </Select>
                  <View style={styles.columnSeparator} />
                  <Select
                    selectedValue={
                      hours?.evernoon?.close || hoursCollection[48].hour
                    }
                    accessibilityLabel="Cierre"
                    placeholder="Cierre"
                    fontFamily={GlobalVars.fontFamily}
                    width={GlobalVars.windowWidth / 4}
                    color={GlobalVars.white}
                    borderColor={GlobalVars.orange}
                    backgroundColor={GlobalVars.orange}
                    _selectedItem={{
                      bg: "orange.100",
                      endIcon: (
                        <AntDesign
                          name="check"
                          size={20}
                          color={GlobalVars.orange}
                        />
                      ),
                      borderColor: GlobalVars.orange,
                    }}
                    _hover={{
                      backgroundColor: GlobalVars.blueOpaque,
                      color: GlobalVars.white,
                    }}
                    customDropdownIconProps={{
                      color: GlobalVars.white,
                      marginRight: 2,
                    }}
                    onValueChange={(itemValue) =>
                      setHours({
                        ...hours,
                        evernoon: { ...hours.evernoon, close: itemValue },
                      })
                    }
                  >
                    {optionsHours}
                  </Select>
                </View>
              </View>
            </>
          )}

          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingTop: 10,
                paddingBottom: 20,
              }}
              onPress={() => setContinuousHours(!continuousHours)}
            >
              <Checkbox
                style={styles.checkbox}
                value={continuousHours}
                onValueChange={() => setContinuousHours(!continuousHours)}
                color={
                  continuousHours
                    ? GlobalVars.firstColor
                    : GlobalVars.textGrayColor
                }
              />
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 20,
                  color: GlobalVars.firstColor,
                  fontFamily: GlobalVars.fontFamily,
                }}
              >
                Mañana y tarde
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* {!loading && (
        <ButtonComponent
          text="Jornada tradicional"
          color={GlobalVars.orange}
          textColor={GlobalVars.white}
          Action={() => captureWorkingTime()}
        />
      )} */}

      {!loading &&
        hours &&
        ((hours.open && hours.close) || (hours.morning && hours.evernoon)) && (
          <ButtonComponent
            text="Guardar"
            color={GlobalVars.orange}
            textColor={GlobalVars.white}
            Action={() => saveHours()}
          />
        )}

      <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
      <Cancel/>
      </TouchableOpacity>
    </View>
  );
};

export default PickerHoursShop;

const styles2 = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
  },
  stretch: {
    width: 30,
    height: 30,
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

import React, { useState, useEffect } from "react";

import { View, TouchableOpacity, ActivityIndicator } from "react-native";

import { Checkbox } from "native-base";

import { Entypo } from "@expo/vector-icons";

import GlobalVars from "../../../global/globalVars";

import { daysCollection } from "../../../mock/daysCollection";

import updateDataEntrepreneur from "../../../helpers/updateDataEntrepreneur";

import LabelTextComponent from "../../atoms/LabelText";
import ButtonComponent from "../../atoms/ButtonComponent";
import ScrollView from "../../templates/ScrollView";

import Styles from "./style";
import { Cancel } from "../../molecules/cancel";

const styles = Styles;

const PickerDaysShop = ({
  isEntrepreneurUpdate = false,
  _jwt = null,
  entrepreneur = null,
  ...props
}) => {
  const { onClose, getRandomNumberDispatch } = props;

  const [days, setDays] = useState(props.officeDays || []);
  const [errMsg, setErrMsg] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const captureWorkingWeek = async () => {
    setDays(["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES"]);
  };

  const saveDays = async () => {
    try {
      setLoading(true);
      if (!days && !days.length) {
        setErrMsg("Debe seleccionar al menos 1 día.");
        setShowErr(true);
        setLoading(false);
        setTimeout(() => {
          setShowErr(false);
        }, 1200);
      } else {
        const res = await updateDataEntrepreneur.entrepreneurDays(
          {
            id: entrepreneur.id,
            workDays: days,
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

  const optionsDays = (daysCollection.length &&
    daysCollection.map((day) => {
      return (
        <View key={"days_" + day?.id} style={styles.checBoxView}>
          <Checkbox
            value={day?.name}
            my={2}
            bgColor={GlobalVars.orange}
            borderColor={GlobalVars.orange}
            colorScheme="orange"
            borderWidth="2"
            _checked={{
              color: GlobalVars.blueOpaque,
              borderColor: GlobalVars.orange,
            }}
            _pressed={{ tintColor: GlobalVars.orange }}
            _text={{ color: GlobalVars.blueOpaque }}
            _hover={{ borderColor: GlobalVars.orange }}
          >
            {day?.name}
          </Checkbox>
        </View>
      );
    })) || <></>;

  return (
    <View style={[styles.view,{paddingTop:20}]}>
      {!loading && (
        <LabelTextComponent
        style={{top:Platform.OS === 'ios' ? -5 : -17, alignSelf: "center", left:-10}}
          text="Días de atención"
          color={GlobalVars.blueOpaque}
          size={20}
          customStyleBtn={{ textAlign: "left" }}
        />
      )}
      {loading && <ActivityIndicator color={GlobalVars.orange} size="large" />}

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
          <ScrollView
            style={styles.scrolling}
            contentContainerStyle={styles.wrapScrollView}
            colorScrollBar={GlobalVars.orange}
          >
            <Checkbox.Group
              style={styles.checkGroupBoxView}
              defaultValue={days}
              value={days}
              onChange={(newValues) => {
                setDays(newValues);
              }}
            >
              {!optionsDays && (
                <ActivityIndicator
                  color={GlobalVars.orange}
                  size="large"
                  style={{ alignSelf: "center" }}
                />
              )}
              {optionsDays}
            </Checkbox.Group>
          </ScrollView>
        </View>
      )}

      {!loading && (
        <ButtonComponent
          text="Semana laboral"
          color={GlobalVars.orange}
          textColor={GlobalVars.white}
          Action={() => captureWorkingWeek()}
        />
      )}

      {!loading && days && days.length && (
        <ButtonComponent
          text="Guardar"
          color={GlobalVars.orange}
          textColor={GlobalVars.white}
          Action={() => saveDays()}
        />
      )}

      <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
      <Cancel/>
      </TouchableOpacity>
    </View>
  );
};

export default PickerDaysShop;

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { Image } from "expo-image";
import { Datepicker as RNKDatepicker } from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";

const NuevoContrato = () => {
  const [baseInputFieldDatePicker, setBaseInputFieldDatePicker] =
    useState(undefined);
  const [baseInputFieldDatePicker1, setBaseInputFieldDatePicker1] =
    useState(undefined);
  const navigation = useNavigation();

  return (
    <View style={styles.nuevoContrato}>
      <View style={[styles.statusBar, styles.barFlexBox]} />
      <View style={[styles.navigationBar, styles.frame4SpaceBlock]}>
        <View style={[styles.largeTitleBar, styles.pressableFlexBox]}>
          <TouchableOpacity
            style={styles.arrowLeft}
            activeOpacity={0.2}
            onPress={() => navigation.navigate("Lista")}
          >
            <Image
              style={[styles.icon, styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/arrowleft1.png")}
            />
          </TouchableOpacity>
          <View style={styles.largeTitleGrp}>
            <Text style={styles.pageTitle}>Nuevo Contrato</Text>
          </View>
        </View>
      </View>
      <View style={[styles.frame, styles.frameFlexBox]}>
        <View style={styles.textInput}>
          <View style={styles.label}>
            <Text style={[styles.label1, styles.label1Typo]}>
              Titulo Contrato
            </Text>
          </View>
          <TextInput style={[styles.baseInputField, styles.baseSpaceBlock]} />
        </View>
      </View>
      <View style={[styles.frame, styles.frameFlexBox]}>
        <View style={styles.textInput}>
          <View style={styles.label}>
            <Text style={[styles.label1, styles.label1Typo]}>Fecha inicio</Text>
          </View>
          <RNKDatepicker
            style={styles.baseInputField1}
            date={baseInputFieldDatePicker}
            onSelect={setBaseInputFieldDatePicker}
            controlStyle={styles.baseInputFieldDatePickerValue}
          />
        </View>
      </View>
      <View style={[styles.frame, styles.frameFlexBox]}>
        <View style={styles.textInput}>
          <View style={styles.label}>
            <Text style={[styles.label1, styles.label1Typo]}>Fecha fin</Text>
          </View>
          <RNKDatepicker
            style={styles.baseInputField1}
            date={baseInputFieldDatePicker1}
            onSelect={setBaseInputFieldDatePicker1}
            controlStyle={styles.baseInputFieldDatePicker1Value}
          />
        </View>
      </View>
      <View style={[styles.frame3, styles.frameFlexBox]}>
        <View style={styles.textInput3}>
          <View style={styles.label}>
            <Text style={[styles.label1, styles.label1Typo]}>
              Descripcion del contrato
            </Text>
          </View>
          <TextInput
            style={[styles.baseInputField3, styles.baseSpaceBlock]}
            multiline={true}
            secureTextEntry={false}
          />
        </View>
      </View>
      <View style={[styles.frame4, styles.frame4SpaceBlock]}>
        <LinearGradient
          style={styles.baseButton}
          locations={[0, 1]}
          colors={["#9b40bf", "#f344f7"]}
        >
          <Pressable style={[styles.pressable, styles.iconLayout]}>
            <Text style={[styles.buttonText, styles.label1Typo]}>
              Crear Contrato
            </Text>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  baseInputFieldDatePickerValue: {},
  baseInputFieldDatePicker1Value: {},
  barFlexBox: {
    backgroundColor: Color.blurLight,
    alignSelf: "stretch",
    alignItems: "center",
  },
  frame4SpaceBlock: {
    marginTop: 13,
    overflow: "hidden",
    justifyContent: "center",
  },
  pressableFlexBox: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  iconLayout: {
    height: "100%",
    overflow: "hidden",
  },
  frameFlexBox: {
    paddingVertical: 0,
    marginTop: 13,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  label1Typo: {
    fontFamily: FontFamily.paragraphMediumLarge,
    fontWeight: "500",
    lineHeight: 24,
    fontSize: FontSize.paragraphRegularLarge_size,
  },
  baseSpaceBlock: {
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_base,
    borderWidth: 1.5,
    borderColor: Color.colorGray_100,
    borderStyle: "solid",
    marginTop: 4,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    backgroundColor: Color.monochromatic10,
  },
  statusBar: {
    height: 37,
    width: 390,
    justifyContent: "center",
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  arrowLeft: {
    width: 24,
    height: 24,
  },
  pageTitle: {
    fontSize: FontSize.header1_size,
    lineHeight: 32,
    fontWeight: "600",
    fontFamily: FontFamily.header2,
    textAlign: "center",
    color: Color.fontWhite,
  },
  largeTitleGrp: {
    marginLeft: 4,
    justifyContent: "center",
    flex: 1,
  },
  largeTitleBar: {
    height: 76,
    paddingLeft: Padding.p_base,
    paddingTop: Padding.p_9xs,
    paddingRight: Padding.p_5xs,
    paddingBottom: Padding.p_xs,
  },
  navigationBar: {
    backgroundColor: Color.blurLight,
    alignSelf: "stretch",
    alignItems: "center",
  },
  label1: {
    textAlign: "left",
    color: Color.fontWhite,
  },
  label: {
    alignSelf: "stretch",
    justifyContent: "center",
  },
  baseInputField: {
    height: 50,
    marginTop: 4,
    borderRadius: Border.br_81xl,
  },
  textInput: {
    alignSelf: "stretch",
  },
  frame: {
    paddingHorizontal: Padding.p_mini,
  },
  baseInputField1: {
    marginTop: 4,
  },
  baseInputField3: {
    borderRadius: 20,
    marginTop: 4,
    overflow: "hidden",
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_base,
    borderWidth: 1.5,
    borderColor: Color.colorGray_100,
    borderStyle: "solid",
    flex: 1,
  },
  textInput3: {
    alignSelf: "stretch",
    flex: 1,
  },
  frame3: {
    height: 290,
    paddingHorizontal: Padding.p_3xs,
  },
  buttonText: {
    color: Color.monochromatic10,
    textAlign: "center",
    flex: 1,
  },
  pressable: {
    justifyContent: "space-between",
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_xl,
    backgroundColor: Color.gradientDown,
    borderRadius: Border.br_81xl,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  baseButton: {
    height: 73,
  },
  frame4: {
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_mini,
    width: 390,
  },
  nuevoContrato: {
    shadowColor: "rgba(180, 188, 203, 0.24)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 24,
    elevation: 24,
    shadowOpacity: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.monochromatic10,
    width: "100%",
    flex: 1,
  },
});

export default NuevoContrato;

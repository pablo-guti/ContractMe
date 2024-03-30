import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import ContentRow9 from "../components/ContentRow9";
import ContentRow8 from "../components/ContentRow8";
import { FontFamily, Color, Padding, Border, FontSize } from "../GlobalStyles";

const Lista = () => {
  const navigation = useNavigation();

  const [selectedTab, setSelectedTab] = useState("Mis Contratos");

  const renderScrollView = () => {
    if (selectedTab === "Mis Contratos") {
      return (
        <ScrollView
          style={styles.scrollGroupActivo}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollGroupActivoScrollViewContent}
        >
          <ContentRow9 />
          <ContentRow8 />
          <ContentRow8 />
          <ContentRow8 />
          <ContentRow8 />
          <ContentRow8 />
          <ContentRow8 />
          <ContentRow8 />
        </ScrollView>
      );
    } else if (selectedTab === "Para firmar") {
      return (
        <ScrollView
          style={styles.scrollGroupActivo}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollGroupActivoScrollViewContent}
        >
          <ContentRow9 />
          <ContentRow8 />
          <ContentRow8 />
        </ScrollView>
      );
    } else if (selectedTab === "Finalizado") {
      return (
        <ScrollView
          style={styles.scrollGroupActivo}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollGroupActivoScrollViewContent}
        >
          <ContentRow9 />
        </ScrollView>
      );
    }
  };

  return (
    <View style={[styles.lista, styles.copyFlexBox]}>
      <View style={styles.statusBar} />
      <View style={styles.navigationBar}>
        <View style={[styles.largeTitleBar, styles.contentFlexBox]}>
          <TouchableOpacity
            style={styles.leftAction}
            activeOpacity={0.2}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require("../assets/left-action2.png")}
            />
          </TouchableOpacity>
          <View style={[styles.largeTitleGrp, styles.copyFlexBox]}>
            <Text style={[styles.pageTitle, styles.pageTitleTypo]}>
              Contratos
            </Text>
          </View>
          <View style={[styles.rightActions, styles.contentFlexBox]}>
            <TouchableOpacity
              style={styles.leftAction}
              activeOpacity={0.2}
              onPress={() => navigation.navigate("NuevoContrato")}
            >
              <Image
                style={styles.icon}
                contentFit="cover"
                source={require("../assets/icon-button4.png")}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.tabGrp, styles.tabGrpFlexBox]}>
          <TouchableOpacity
            style={[
              styles.tabSelected,
              styles.tabFlexBox,
              selectedTab === "Mis Contratos"
                ? styles.tabSelected
                : styles.tabUnselected,
            ]}
            onPress={() => setSelectedTab("Mis Contratos")}
          >
            <Text
              style={[
                styles.misContratos,
                styles.rowTypo,
                selectedTab === "Mis Contratos"
                  ? styles.misContratosBlanco
                  : styles.misContratosNegro,
              ]}
            >{`Mis Contratos `}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab1Unselected,
              styles.tabFlexBox,
              selectedTab === "Para firmar"
                ? styles.tab1Selected
                : styles.tab1Unselected,
            ]}
            onPress={() => setSelectedTab("Para firmar")}
          >
            <Text
              style={[
                styles.paraFirmarNegro,
                styles.rowTypo,
                selectedTab === "Para firmar"
                  ? styles.paraFirmarBlanco
                  : styles.paraFirmarNegro,
              ]}
            >{`Para firmar `}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab1Unselected,
              styles.tabFlexBox,
              selectedTab === "Finalizado"
                ? styles.tab1Selected
                : styles.tab1Unselected,
            ]}
            onPress={() => setSelectedTab("Finalizado")}
          >
            <Text
              style={[
                styles.paraFirmar,
                styles.rowTypo,
                selectedTab === "Finalizado"
                  ? styles.firmadoBlanco
                  : styles.firmadoNegro,
              ]}
            >
              Finalizado
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {renderScrollView()}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollGroupActivoScrollViewContent: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  copyFlexBox: {
    justifyContent: "center",
    flex: 1,
  },
  contentFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  pageTitleTypo: {
    textAlign: "left",
    fontFamily: FontFamily.header6,
    fontWeight: "600",
    color: Color.fontWhite,
    alignSelf: "stretch",
  },
  tabGrpFlexBox: {
    paddingHorizontal: Padding.p_base,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  tabFlexBox: {
    paddingVertical: Padding.p_9xs,
    paddingHorizontal: Padding.p_xs,
    borderRadius: Border.br_5xl,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rowTypo: {
    fontFamily: FontFamily.paragraphRegularSmall,
    textAlign: "left",
  },
  imagePosition: {
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,
    position: "absolute",
  },
  rowLayout: {
    lineHeight: 24,
    fontSize: FontSize.header6_size,
  },
  statusBar: {
    height: 37,
    backgroundColor: Color.blurLight,
    alignSelf: "stretch",
  },
  icon: {
    borderRadius: Border.br_81xl,
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  leftAction: {
    width: 40,
    height: 40,
  },
  pageTitle: {
    fontSize: FontSize.header1_size,
    lineHeight: 32,
  },
  largeTitleGrp: {
    marginLeft: 4,
  },
  rightActions: {
    justifyContent: "flex-end",
    marginLeft: 4,
  },
  largeTitleBar: {
    height: 76,
    paddingLeft: Padding.p_base,
    paddingTop: Padding.p_9xs,
    paddingRight: Padding.p_5xs,
    paddingBottom: Padding.p_xs,
    alignSelf: "stretch",
  },
  misContratosBlanco: {
    color: Color.monochromatic10,
    lineHeight: 24,
    fontSize: FontSize.header6_size,
  },
  misContratosNegro: {
    color: Color.fontWhite,
    lineHeight: 24,
    fontSize: FontSize.header6_size,
  },
  tabSelected: {
    backgroundColor: Color.brand05,
  },
  tabUnselected: {
    backgroundColor: Color.blurLight,
  },
  paraFirmarNegro: {
    lineHeight: 24,
    fontSize: FontSize.header6_size,
    color: Color.fontWhite,
    fontFamily: FontFamily.paragraphRegularSmall,
  },
  paraFirmarBlanco: {
    lineHeight: 24,
    fontSize: FontSize.header6_size,
    color: Color.monochromatic10,
    fontFamily: FontFamily.paragraphRegularSmall,
  },
  firmadoNegro: {
    lineHeight: 24,
    fontSize: FontSize.header6_size,
    color: Color.fontWhite,
    fontFamily: FontFamily.paragraphRegularSmall,
  },
  firmadoBlanco: {
    lineHeight: 24,
    fontSize: FontSize.header6_size,
    color: Color.monochromatic10,
    fontFamily: FontFamily.paragraphRegularSmall,
  },

  tab1Selected: {
    marginLeft: 8,
    backgroundColor: Color.brand05,
  },
  tab1Unselected: {
    marginLeft: 8,
    backgroundColor: Color.blurLight,
  },
  tabGrp: {
    paddingTop: Padding.p_3xs,
    paddingBottom: Padding.p_mini,
  },
  navigationBar: {
    width: 386,
    height: 133,
    marginTop: 15,
    backgroundColor: Color.blurLight,
  },
  imageIcon: {
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
  },
  imageBlurEffect: {
    backgroundColor: Color.colorGray_300,
    display: "none",
  },
  imageGradientOverlay: {
    backgroundColor: Color.gradientDown,
    display: "none",
  },
  imageGroup: {
    borderRadius: Border.br_5xs,
    width: 72,
    height: 72,
    display: "none",
    overflow: "hidden",
  },
  rowHeadline: {
    textTransform: "capitalize",
    textAlign: "left",
    fontFamily: FontFamily.header6,
    fontWeight: "600",
    color: Color.fontWhite,
    alignSelf: "stretch",
  },
  rowDescription: {
    lineHeight: 24,
    fontSize: FontSize.header6_size,
    color: Color.fontWhite,
    fontFamily: FontFamily.paragraphRegularSmall,
    alignSelf: "stretch",
  },
  rowHelperText: {
    fontSize: FontSize.paragraphRegularSmall_size,
    lineHeight: 20,
    color: Color.colorLimegreen,
    alignSelf: "stretch",
  },
  copy: {
    marginLeft: 12,
  },
  content: {
    flex: 1,
  },
  arrowRightIcon: {
    width: 24,
    height: 24,
    marginLeft: 8,
    overflow: "hidden",
  },
  contentRow: {
    paddingVertical: Padding.p_xs,
    backgroundColor: Color.monochromatic10,
    paddingHorizontal: Padding.p_base,
  },
  scrollGroupActivo: {
    marginTop: 15,
    alignSelf: "stretch",
    flex: 1,
  },
  lista: {
    shadowColor: "rgba(180, 188, 203, 0.24)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 24,
    elevation: 24,
    shadowOpacity: 1,
    height: 812,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: Color.monochromatic10,
  },
});

export default Lista;

import * as React from "react";
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

  return (
    <View style={[styles.lista1, styles.copyFlexBox]}>
      <View style={styles.statusBar} />
      <View style={[styles.navigationBar, styles.navigationBarSpaceBlock]}>
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
          <View style={[styles.tab, styles.tabFlexBox]}>
            <Text
              style={[styles.misContratos, styles.rowTypo]}
            >{`Mis Contratos `}</Text>
          </View>
          <View style={[styles.tab1, styles.tabFlexBox]}>
            <Text
              style={[styles.paraFirmar, styles.rowTypo]}
            >{`Para firmar `}</Text>
          </View>
          <View style={[styles.tab1, styles.tabFlexBox]}>
            <Text style={[styles.paraFirmar, styles.rowTypo]}>Finalizado</Text>
          </View>
        </View>
      </View>
      <ScrollView
        style={[styles.scrollGroupActivo, styles.navigationBarSpaceBlock]}
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
        <View style={[styles.contentRow, styles.tabGrpFlexBox]}>
          <View style={[styles.content, styles.contentFlexBox]}>
            <View style={styles.imageGroup}>
              <Image
                style={[styles.imageIcon, styles.imagePosition]}
                contentFit="cover"
                source={require("../assets/image.png")}
              />
              <View style={[styles.imageBlurEffect, styles.imagePosition]} />
              <LinearGradient
                style={[styles.imageGradientOverlay, styles.imagePosition]}
                locations={[0, 1]}
                colors={["rgba(26, 26, 26, 0.77)", "rgba(26, 26, 26, 0)"]}
              />
            </View>
            <View style={[styles.copy, styles.copyFlexBox]}>
              <Text style={[styles.rowHeadline, styles.rowLayout]}>
                Titulo Contrato
              </Text>
              <Text style={[styles.rowDescription, styles.rowTypo]}>
                Fecha Inicio-Fecha Fin
              </Text>
              <Text style={[styles.rowHelperText, styles.rowTypo]}>Activo</Text>
            </View>
          </View>
          <Image
            style={styles.arrowRightIcon}
            contentFit="cover"
            source={require("../assets/arrowright.png")}
          />
        </View>
        <View style={[styles.contentRow, styles.tabGrpFlexBox]}>
          <View style={[styles.content, styles.contentFlexBox]}>
            <View style={styles.imageGroup}>
              <Image
                style={[styles.imageIcon, styles.imagePosition]}
                contentFit="cover"
                source={require("../assets/image.png")}
              />
              <View style={[styles.imageBlurEffect, styles.imagePosition]} />
              <LinearGradient
                style={[styles.imageGradientOverlay, styles.imagePosition]}
                locations={[0, 1]}
                colors={["rgba(26, 26, 26, 0.77)", "rgba(26, 26, 26, 0)"]}
              />
            </View>
            <View style={[styles.copy, styles.copyFlexBox]}>
              <Text style={[styles.rowHeadline, styles.rowLayout]}>
                Titulo Contrato
              </Text>
              <Text style={[styles.rowDescription, styles.rowTypo]}>
                Fecha Inicio-Fecha Fin
              </Text>
              <Text style={[styles.rowHelperText, styles.rowTypo]}>Activo</Text>
            </View>
          </View>
          <Image
            style={styles.arrowRightIcon}
            contentFit="cover"
            source={require("../assets/arrowright.png")}
          />
        </View>
        <View style={[styles.contentRow, styles.tabGrpFlexBox]}>
          <View style={[styles.content, styles.contentFlexBox]}>
            <View style={styles.imageGroup}>
              <Image
                style={[styles.imageIcon, styles.imagePosition]}
                contentFit="cover"
                source={require("../assets/image.png")}
              />
              <View style={[styles.imageBlurEffect, styles.imagePosition]} />
              <LinearGradient
                style={[styles.imageGradientOverlay, styles.imagePosition]}
                locations={[0, 1]}
                colors={["rgba(26, 26, 26, 0.77)", "rgba(26, 26, 26, 0)"]}
              />
            </View>
            <View style={[styles.copy, styles.copyFlexBox]}>
              <Text style={[styles.rowHeadline, styles.rowLayout]}>
                Titulo Contrato
              </Text>
              <Text style={[styles.rowDescription, styles.rowTypo]}>
                Fecha Inicio-Fecha Fin
              </Text>
              <Text style={[styles.rowHelperText, styles.rowTypo]}>Activo</Text>
            </View>
          </View>
          <Image
            style={styles.arrowRightIcon}
            contentFit="cover"
            source={require("../assets/arrowright.png")}
          />
        </View>
      </ScrollView>
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
  navigationBarSpaceBlock: {
    marginTop: 15,
    alignSelf: "stretch",
  },
  contentFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  pageTitleTypo: {
    textAlign: "left",
    fontFamily: FontFamily.header2,
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
    fontSize: FontSize.paragraphRegularLarge_size,
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
  misContratos: {
    color: Color.monochromatic10,
    lineHeight: 24,
    fontSize: FontSize.paragraphRegularLarge_size,
  },
  tab: {
    backgroundColor: Color.brand05,
  },
  paraFirmar: {
    lineHeight: 24,
    fontSize: FontSize.paragraphRegularLarge_size,
    color: Color.fontWhite,
    fontFamily: FontFamily.paragraphRegularSmall,
  },
  tab1: {
    marginLeft: 8,
    backgroundColor: Color.blurLight,
  },
  tabGrp: {
    paddingVertical: 0,
  },
  navigationBar: {
    height: 118,
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
    fontFamily: FontFamily.header2,
    fontWeight: "600",
    color: Color.fontWhite,
    alignSelf: "stretch",
  },
  rowDescription: {
    lineHeight: 24,
    fontSize: FontSize.paragraphRegularLarge_size,
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
    flex: 1,
  },
  lista1: {
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

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
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";

const Info = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.info}>
      <View style={[styles.statusBar, styles.barLayout]} />
      <View style={[styles.navigationBar, styles.barLayout]}>
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
            <Text style={[styles.pageTitle, styles.pageTitleTypo]}>
              Titulo Contrato
            </Text>
            <Text style={styles.pageSubtitleTypo}>Fecha Inicio-Fecha Fin</Text>
          </View>
        </View>
      </View>
      <ScrollView
        style={styles.scrollGroup}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollGroupScrollViewContent}
      >
        <Text style={[styles.descripcion, styles.pageTitleTypo]}>
          Descripcion
        </Text>
        <Text
          style={[styles.loremIpsumDolor, styles.pageSubtitleTypo]}
        >{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. `}</Text>
        <LinearGradient
          style={styles.baseButton}
          locations={[0, 1]}
          colors={["#9b40bf", "#f344f7"]}
        >
          <Pressable style={[styles.pressable, styles.iconLayout]}>
            <Text style={styles.buttonText}>Firmar Contrato</Text>
          </Pressable>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollGroupScrollViewContent: {
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  barLayout: {
    width: 390,
    backgroundColor: Color.blurLight,
  },
  pressableFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  pageTitleTypo: {
    textAlign: "left",
    color: Color.fontWhite,
    fontFamily: FontFamily.header2,
    fontWeight: "600",
    alignSelf: "stretch",
  },
  pageSubtitleTypo: {
    fontFamily: FontFamily.paragraphRegularSmall,
    lineHeight: 24,
    fontSize: FontSize.paragraphRegularLarge_size,
    textAlign: "left",
    color: Color.fontWhite,
    alignSelf: "stretch",
  },
  statusBar: {
    height: 37,
  },
  icon: {
    overflow: "hidden",
  },
  arrowLeft: {
    width: 24,
    height: 24,
  },
  pageTitle: {
    fontSize: FontSize.header1_size,
    lineHeight: 32,
  },
  largeTitleGrp: {
    justifyContent: "center",
    marginLeft: 4,
    flex: 1,
  },
  largeTitleBar: {
    height: 76,
    paddingLeft: Padding.p_base,
    paddingTop: Padding.p_9xs,
    paddingRight: Padding.p_5xs,
    paddingBottom: Padding.p_xs,
    alignSelf: "stretch",
  },
  navigationBar: {
    marginTop: 2,
    overflow: "hidden",
  },
  descripcion: {
    fontSize: FontSize.header2_size,
  },
  loremIpsumDolor: {
    marginTop: 16,
  },
  buttonText: {
    fontWeight: "500",
    fontFamily: FontFamily.paragraphMediumLarge,
    color: Color.monochromatic10,
    textAlign: "center",
    lineHeight: 24,
    fontSize: FontSize.paragraphRegularLarge_size,
    flex: 1,
  },
  pressable: {
    borderRadius: Border.br_81xl,
    justifyContent: "space-between",
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_mini,
    backgroundColor: Color.gradientDown,
    alignItems: "center",
    flexDirection: "row",
  },
  baseButton: {
    width: 360,
    height: 64,
    marginTop: 16,
  },
  scrollGroup: {
    alignSelf: "stretch",
    marginTop: 2,
    flex: 1,
  },
  info: {
    backgroundColor: Color.monochromatic10,
    shadowColor: "rgba(180, 188, 203, 0.24)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 24,
    elevation: 24,
    shadowOpacity: 1,
    height: 812,
    width: "100%",
    flex: 1,
  },
});

export default Info;

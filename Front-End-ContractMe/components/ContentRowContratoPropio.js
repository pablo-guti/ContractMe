import * as React from "react";
import {
  Pressabonle,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, Border, FontSize, Padding } from "../GlobalStyles";

const ContentRowContratoPropio = ({
  titulo,
  fechaInicio,
  fechaFin,
  id,
  account,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.contentRow, styles.contentFlexBox]}
      activeOpacity={0.2}
      onPress={() =>
        navigation.navigate("Modificar", {
          idContrato: id.toString(),
          account: account,
        })
      }
    >
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
        <View style={styles.copy}>
          <Text style={styles.rowHeadline}>{titulo}</Text>
          <Text style={[styles.rowDescription, styles.rowTypo]}>
            {fechaInicio}-{fechaFin}
          </Text>
        </View>
      </View>
      <Image
        style={styles.arrowRightIcon}
        contentFit="cover"
        source={require("../assets/arrowright.png")}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contentFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  imagePosition: {
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,
    position: "absolute",
  },
  rowTypo: {
    fontFamily: FontFamily.paragraphRegularSmall,
    textAlign: "left",
    alignSelf: "stretch",
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
    fontWeight: "600",
    fontFamily: FontFamily.header2,
    textAlign: "left",
    color: Color.fontWhite,
    lineHeight: 24,
    fontSize: FontSize.paragraphRegularLarge_size,
    alignSelf: "stretch",
  },
  rowDescription: {
    color: Color.fontWhite,
    lineHeight: 24,
    fontSize: FontSize.paragraphRegularLarge_size,
    fontFamily: FontFamily.paragraphRegularSmall,
  },
  rowHelperText: {
    fontSize: FontSize.paragraphRegularSmall_size,
    lineHeight: 20,
    color: Color.colorLimegreen,
  },
  copy: {
    justifyContent: "center",
    marginLeft: 12,
    flex: 1,
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
    backgroundColor: Color.monochromatic10,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_xs,
    alignSelf: "stretch",
    flexDirection: "row",
  },
});

export default ContentRowContratoPropio;

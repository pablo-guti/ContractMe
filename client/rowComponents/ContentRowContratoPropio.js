import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, Border, FontSize, Padding } from "../GlobalStyles";

const parseDateString = (dateString) => {
  const [day, month, year] = dateString.split("/");
  return new Date(year, month - 1, day);
};

const ContentRowContratoPropio = ({
  titulo,
  fechaInicio,
  fechaFin,
  id,
  account,
  estado,
}) => {
  const navigation = useNavigation();

  const now = new Date();

  const fechaFinConverted = parseDateString(fechaFin);

  const getEstadoStyle = (estado) => {
    if (now > fechaFinConverted) {
      estado = 3n;
    }
    switch (estado) {
      case 0n:
        return { style: styles.estadoActivo, text: "Activo" };
      case 1n:
        return { style: styles.estadoSolicitado, text: "Solicitado" };
      case 2n:
        return { style: styles.estadoFirmado, text: "Firmado" };
      case 3n:
        return { style: styles.estadoExpirado, text: "Expirado" };
      default:
        return { style: {}, text: "Desconocido" };
    }
  };

  const { style: estadoStyle, text: estadoText } = getEstadoStyle(estado);

  return (
    <TouchableOpacity
      style={[styles.contentRow, styles.contentFlexBox]}
      activeOpacity={0.2}
      onPress={() =>
        navigation.navigate("ContratoPropio", {
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
            {fechaInicio} - {fechaFin}
          </Text>
          <Text style={[styles.rowEstado, estadoStyle]}>
            Estado: {estadoText}
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
  rowEstado: {
    fontSize: FontSize.paragraphRegularSmall_size,
    lineHeight: 20,
    fontFamily: FontFamily.paragraphRegularSmall,
    textAlign: "left",
    alignSelf: "stretch",
  },
  estadoActivo: {
    color: "green",
  },
  estadoFirmado: {
    color: "orange",
  },
  estadoExpirado: {
    color: "red",
  },
  estadoSolicitado: {
    color: "blue",
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

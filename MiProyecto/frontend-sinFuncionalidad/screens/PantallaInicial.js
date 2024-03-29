import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";

const PantallaInicial = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.pantallaInicial, styles.buttonFlexBox1]}>
      <View style={[styles.frame, styles.frameFlexBox]}>
        <View style={styles.titulologo}>
          <Text style={[styles.contractme, styles.contractmeFlexBox]}>
            ContractMe
          </Text>
          <Image
            style={styles.image1Icon}
            contentFit="cover"
            source={require("../assets/image-1.png")}
          />
        </View>
        <Pressable style={[styles.content, styles.buttonFlexBox]}>
          <View style={styles.copy}>
            <Text style={styles.comienzaACrear}>{`Comienza a crear contratos 
con Blockchain`}</Text>
          </View>
          <Text style={[styles.utilizaLaRed, styles.contractmeFlexBox]}>
            Utiliza la red de Blockchain para crear y firmar contratos de manera
            transparente y fiable
          </Text>
          <View style={styles.inputAndButton}>
            <TouchableOpacity
              style={[styles.button, styles.buttonFlexBox]}
              activeOpacity={0.2}
              onPress={() => navigation.navigate("SignIn")}
            >
              <Text style={styles.comenzar}>Comenzar</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonFlexBox1: {
    flexDirection: "row",
    justifyContent: "center",
  },
  frameFlexBox: {
    overflow: "hidden",
    alignItems: "center",
  },
  contractmeFlexBox: {
    textAlign: "center",
    color: Color.colorBlack,
  },
  buttonFlexBox: {
    paddingVertical: 0,
    alignSelf: "stretch",
    alignItems: "center",
  },
  contractme: {
    fontSize: FontSize.size_5xl,
    letterSpacing: -0.2,
    lineHeight: 36,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textAlign: "center",
    color: Color.colorBlack,
  },
  image1Icon: {
    width: 126,
    height: 123,
    marginTop: 11,
  },
  titulologo: {
    justifyContent: "center",
    alignItems: "center",
  },
  comienzaACrear: {
    fontSize: FontSize.size_lg,
    lineHeight: 27,
    alignSelf: "stretch",
    textAlign: "center",
    color: Color.colorBlack,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    flex: 1,
  },
  copy: {
    height: 53,
    alignItems: "center",
  },
  utilizaLaRed: {
    lineHeight: 21,
    fontFamily: FontFamily.interRegular,
    display: "flex",
    alignItems: "flex-end",
    width: 370,
    height: 58,
    marginTop: 24,
    fontSize: FontSize.paragraphRegularSmall_size,
    justifyContent: "center",
  },
  comenzar: {
    lineHeight: 20,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.monochromatic10,
    textAlign: "left",
    fontSize: FontSize.paragraphRegularSmall_size,
  },
  button: {
    borderRadius: Border.br_5xs,
    backgroundColor: Color.colorBlack,
    height: 40,
    paddingHorizontal: Padding.p_base,
    justifyContent: "center",
    flexDirection: "row",
  },
  inputAndButton: {
    width: 327,
    marginTop: 24,
  },
  content: {
    paddingHorizontal: Padding.p_5xl,
    marginTop: 26,
    flex: 1,
  },
  frame: {
    width: 339,
    height: 482,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  pantallaInicial: {
    backgroundColor: Color.monochromatic10,
    width: "100%",
    height: 812,
    paddingHorizontal: Padding.p_lg,
    paddingVertical: 155,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    flex: 1,
  },
});

export default PantallaInicial;

import * as React from "react";
import {
  View,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { Image } from "expo-image";
import { TextInput as RNPTextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, Border, FontSize, FontFamily } from "../GlobalStyles";

const SignIn = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.signIn}>
      <View style={styles.frame}>
        <TouchableOpacity
          style={styles.arrowLeft}
          activeOpacity={0.2}
          onPress={() => navigation.navigate("PantallaInicial")}
        >
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/arrowleft.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.frame1}>
        <View style={styles.titulologo}>
          <Text style={[styles.contractme, styles.contractmeFlexBox]}>
            ContractMe
          </Text>
          <Image
            style={styles.image1Icon}
            contentFit="cover"
            source={require("../assets/image-11.png")}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.copy}>
            <Text style={[styles.iniciarSesion, styles.contractmeFlexBox]}>
              Iniciar Sesion
            </Text>
            <Text style={[styles.ingresaDireccinDe, styles.contractmeFlexBox]}>
              Ingresa dirección de la cartera y contraseña
            </Text>
          </View>
          <RNPTextInput
            style={[styles.field, styles.fieldFlexBox]}
            placeholder="Direccion de la cartera/ Nombre de usuario"
            mode="flat"
            placeholderTextColor="#828282"
            theme={{
              fonts: {
                regular: { fontFamily: "Inter", fontWeight: "Regular" },
              },
              colors: { text: "#828282" },
            }}
          />
          <RNPTextInput
            style={[styles.field, styles.fieldFlexBox]}
            placeholder="Contraseña"
            disabled={false}
            error={false}
            mode="flat"
            placeholderTextColor="#828282"
            theme={{
              fonts: {
                regular: { fontFamily: "Inter", fontWeight: "Regular" },
              },
              colors: { text: "#828282" },
            }}
          />
          <TouchableOpacity
            style={[styles.button, styles.fieldFlexBox]}
            activeOpacity={0.2}
            onPress={() => navigation.navigate("Lista")}
          >
            <Text style={styles.iniciarSesion1}>Iniciar Sesion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contractmeFlexBox: {
    textAlign: "center",
    color: Color.colorBlack,
  },
  fieldFlexBox: {
    marginTop: 24,
    paddingHorizontal: Padding.p_base,
    flexDirection: "row",
    height: 40,
    borderRadius: Border.br_5xs,
    alignSelf: "stretch",
    alignItems: "center",
  },
  icon: {
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  arrowLeft: {
    width: 24,
    height: 24,
  },
  frame: {
    width: 339,
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: 0,
    overflow: "hidden",
    justifyContent: "center",
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
  iniciarSesion: {
    fontSize: FontSize.size_lg,
    lineHeight: 27,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textAlign: "center",
    color: Color.colorBlack,
  },
  ingresaDireccinDe: {
    lineHeight: 21,
    fontFamily: FontFamily.interRegular,
    marginTop: 2,
    fontSize: FontSize.paragraphRegularSmall_size,
  },
  copy: {
    alignItems: "center",
  },
  field: {
    borderStyle: "solid",
    borderColor: Color.colorGainsboro,
    borderWidth: 1,
    paddingVertical: Padding.p_5xs,
    backgroundColor: Color.monochromatic10,
  },
  iniciarSesion1: {
    lineHeight: 20,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.monochromatic10,
    textAlign: "left",
    fontSize: FontSize.paragraphRegularSmall_size,
  },
  button: {
    backgroundColor: Color.colorBlack,
    paddingVertical: 0,
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: Padding.p_5xl,
    marginTop: 26,
    paddingVertical: 0,
    alignItems: "center",
  },
  frame1: {
    height: 438,
    justifyContent: "flex-end",
    marginTop: 40,
    alignSelf: "stretch",
    overflow: "hidden",
    alignItems: "center",
  },
  signIn: {
    flex: 1,
    height: 812,
    paddingHorizontal: Padding.p_lg,
    paddingVertical: 28,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: Color.monochromatic10,
  },
});

export default SignIn;

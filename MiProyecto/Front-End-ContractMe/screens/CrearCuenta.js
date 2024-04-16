import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { TextInput as RNPTextInput } from "react-native-paper";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, Border, FontSize, FontFamily } from "../GlobalStyles";

const CrearCuenta = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.crearCuenta, styles.iconLayout]}>
      <View style={[styles.content, styles.contentPosition]}>
        <View style={styles.copy}>
          <Text style={[styles.registrarse, styles.contractmeFlexBox]}>
            Registrarse
          </Text>
          <Text style={[styles.ingresaNuevoUsuario, styles.contractmeFlexBox]}>
            Ingresa nuevo usuario, direccion de la cartera y contraseña
          </Text>
        </View>
        <View style={styles.inputAndButton}>
          <RNPTextInput
            style={[styles.field, styles.fieldBorder]}
            placeholder="Usuario"
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
            style={[styles.field1, styles.field1SpaceBlock]}
            placeholder="Direccion de la cartera"
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
            style={[styles.field1, styles.field1SpaceBlock]}
            placeholder="Contraseña"
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
            style={[styles.button, styles.frameFlexBox]}
            activeOpacity={0.2}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text style={styles.crearCuenta1}>Crear Cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.frame, styles.frameFlexBox]}>
        <TouchableOpacity
          style={[styles.arrowLeft, styles.contentPosition]}
          activeOpacity={0.2}
          onPress={() => navigation.navigate("PantallaInicial")}
        >
          <Image
            style={[styles.icon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/arrowleft.png")}
          />
        </TouchableOpacity>
        <View style={[styles.titulologo, styles.frameFlexBox]}>
          <Text style={[styles.contractme, styles.contractmeFlexBox]}>
            ContractMe
          </Text>
          <Image
            style={styles.image1Icon}
            contentFit="cover"
            source={require("../assets/image-1.png")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    width: "100%",
    overflow: "hidden",
  },
  contentPosition: {
    left: "50%",
    top: "50%",
  },
  contractmeFlexBox: {
    textAlign: "center",
    color: Color.colorBlack,
  },
  fieldBorder: {
    paddingVertical: Padding.p_5xs,
    borderWidth: 1,
    borderColor: Color.colorGainsboro,
    borderStyle: "solid",
    alignItems: "center",
    backgroundColor: Color.monochromatic10,
  },
  field1SpaceBlock: {
    marginTop: 16,
    paddingHorizontal: Padding.p_base,
    flexDirection: "row",
    height: 40,
    borderRadius: Border.br_5xs,
    alignSelf: "stretch",
  },
  frameFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  registrarse: {
    fontSize: FontSize.size_lg,
    lineHeight: 27,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    color: Color.colorBlack,
  },
  ingresaNuevoUsuario: {
    lineHeight: 21,
    fontFamily: FontFamily.interRegular,
    width: 341,
    height: 21,
    marginTop: 2,
    fontSize: FontSize.paragraphRegularSmall_size,
  },
  copy: {
    alignItems: "center",
  },
  field: {
    paddingHorizontal: Padding.p_base,
    flexDirection: "row",
    height: 40,
    borderRadius: Border.br_5xs,
    alignSelf: "stretch",
    paddingVertical: Padding.p_5xs,
    borderWidth: 1,
    borderColor: Color.colorGainsboro,
    borderStyle: "solid",
  },
  field1: {
    paddingVertical: Padding.p_5xs,
    borderWidth: 1,
    borderColor: Color.colorGainsboro,
    borderStyle: "solid",
    alignItems: "center",
    backgroundColor: Color.monochromatic10,
    marginTop: 16,
  },
  crearCuenta1: {
    lineHeight: 20,
    fontWeight: "500",
    fontFamily: FontFamily.smallText,
    color: Color.monochromatic10,
    textAlign: "left",
    fontSize: FontSize.paragraphRegularSmall_size,
  },
  button: {
    backgroundColor: Color.colorBlack,
    marginTop: 16,
    paddingHorizontal: Padding.p_base,
    flexDirection: "row",
    height: 40,
    borderRadius: Border.br_5xs,
    alignSelf: "stretch",
    paddingVertical: 0,
  },
  inputAndButton: {
    width: 327,
    marginTop: 24,
  },
  content: {
    marginTop: -10,
    marginLeft: -194.5,
    height: 302,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: 0,
    alignItems: "center",
    position: "absolute",
  },
  icon: {
    marginTop: -12,
    marginLeft: -162.5,
    height: "100%",
    overflow: "hidden",
  },
  arrowLeft: {
    width: 24,
    height: 24,
    marginRight: 301,
  },
  contractme: {
    fontSize: FontSize.size_5xl,
    letterSpacing: -0.2,
    lineHeight: 36,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    color: Color.colorBlack,
  },
  image1Icon: {
    width: 126,
    height: 123,
    marginTop: 11,
  },
  titulologo: {
    marginTop: 8,
  },
  frame: {
    top: 156,
    left: 25,
    width: 325,
    height: 202,
    position: "absolute",
    overflow: "hidden",
  },
  crearCuenta: {
    flex: 1,
    height: 812,
    overflow: "hidden",
    backgroundColor: Color.monochromatic10,
    width: "100%",
  },
});

export default CrearCuenta;

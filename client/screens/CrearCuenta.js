import React, { useState } from "react";
import Web3 from "web3";
import { WEB3_PROVIDER_URL } from "../global";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dni, setDni] = useState("");

  //Evento de registro de usuarios
  const handleRegister = async () => {
    if (username == "Clear") {
      handleClearAll();
      window.alert("Todos los usuarios eliminados");
      return;
    }
    const web3 = new Web3(new Web3.providers.HttpProvider(WEB3_PROVIDER_URL));
    const accounts = await web3.eth.getAccounts();
    const storedUsers = await AsyncStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    if (!username || !password || !dni) {
      window.alert("Por favor, complete todos los campos");
      return;
    }

    const isValidDNI = (dni) => {
      const dniRegex = /^\d{8}[a-zA-Z]$/;
      return dniRegex.test(dni);
    };

    if (!isValidDNI(dni)) {
      window.alert("DNI inválido. Debe tener 8 números seguidos de 1 letra.");
      return;
    }

    if (password.length < 4) {
      window.alert("La contraseña debe tener al menos 4 caracteres.");
      return;
    }

    if (users.find((user) => user.username === username)) {
      window.alert("El nombre de usuario ya existe");
      return;
    }

    const usedAccounts = users.map((user) => user.account);
    const availableAccount = accounts.find(
      (acc) => !usedAccounts.includes(acc)
    );

    if (!availableAccount) {
      window.alert("No hay cuentas disponibles");
      return;
    }

    users.push({ username, password, dni, account: availableAccount });
    await AsyncStorage.setItem("users", JSON.stringify(users));

    window.alert(
      "Usuario registrado con dirección de cartera:" + availableAccount
    );

    navigation.navigate("SignIn");
  };

  const handleClearAll = async () => {
    try {
      await AsyncStorage.clear();
      console.log("Todos los ítems eliminados");
    } catch (error) {
      console.error("Error al eliminar todos los ítems", error);
    }
  };

  return (
    <View style={styles.signIn}>
      <View style={styles.frame}>
        <View style={styles.frame1}>
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
        <View style={[styles.titulologo, styles.contentSpaceBlock]}>
          <Text style={[styles.contractme, styles.contractmeFlexBox]}>
            ContractMe
          </Text>
          <Image
            style={styles.image1Icon}
            contentFit="cover"
            source={require("../assets/image-11.png")}
          />
        </View>
        <View style={[styles.content, styles.contentSpaceBlock]}>
          <View style={styles.copy}>
            <Text style={[styles.iniciarSesion, styles.contractmeFlexBox]}>
              Registrarse
            </Text>
            <Text style={[styles.ingresaDireccinDe, styles.contractmeFlexBox]}>
              Ingresa usuario, contraseña y dni
            </Text>
          </View>
          <RNPTextInput
            style={[styles.field, styles.fieldFlexBox]}
            placeholder="Usuario         "
            mode="flat"
            value={username}
            onChangeText={(text) => setUsername(text)}
            placeholderTextColor="#828282"
            theme={{
              fonts: {
                regular: { fontWeight: "Regular" },
              },
              colors: { text: "#828282" },
            }}
          />
          <RNPTextInput
            style={[styles.field, styles.fieldFlexBox]}
            placeholder="DNI                  "
            disabled={false}
            error={false}
            value={dni}
            onChangeText={(text) => setDni(text)}
            mode="flat"
            placeholderTextColor="#828282"
            theme={{
              fonts: {
                regular: { fontWeight: "Regular" },
              },
              colors: { text: "#828282" },
            }}
          />
          <RNPTextInput
            style={[styles.field, styles.fieldFlexBox]}
            placeholder="Contraseña          "
            disabled={false}
            error={false}
            onChangeText={(text) => setPassword(text)}
            mode="flat"
            secureTextEntry
            placeholderTextColor="#828282"
            theme={{
              fonts: {
                regular: { fontWeight: "Regular" },
              },
              colors: { text: "#828282" },
            }}
          />
          <TouchableOpacity
            style={[styles.button, styles.fieldFlexBox]}
            activeOpacity={0.2}
            onPress={handleRegister}
          >
            <Text style={styles.iniciarSesion1}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentSpaceBlock: {
    marginTop: 26,
    alignItems: "center",
  },
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
  frame1: {
    width: 339,
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: 0,
    height: 24,
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
    paddingVertical: 0,
  },
  frame: {
    height: 653,
    justifyContent: "flex-end",
    overflow: "hidden",
    alignSelf: "stretch",
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

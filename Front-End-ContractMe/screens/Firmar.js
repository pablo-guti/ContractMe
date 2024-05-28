import React, { useState, useEffect, useCallback } from "react";
import { WEB3_PROVIDER_URL } from "../global";
import {
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import Web3 from "web3";
import MyContract from "../contracts/MyContract.json";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";

const EUR_TO_ETH_RATE = 0.00042; // Ejemplo: 1 EUR = 0.00042 ETH

const Firmar = ({ route }) => {
  const navigation = useNavigation();
  const { idContrato, userAccount } = route.params;

  /****************************************************************************************/
  /*Conexión con blockchain y obtención del contrato*/

  const [titulo, setTitulo] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [account, setAccount] = useState("");
  const [firmante, setFirmante] = useState("");
  const [moneda, setMoneda] = useState("ETH");

  const connectToBlockchain = useCallback(async () => {
    try {
      const web3 = new Web3(new Web3.providers.HttpProvider(WEB3_PROVIDER_URL));
      const networkID = await web3.eth.net.getId();
      const network = MyContract.networks[networkID];
      const contract = new web3.eth.Contract(
        MyContract.abi,
        network && network.address
      );
      const contrato = await contract.methods.getContrato(idContrato).call();

      // Obtener la dirección del propietario del contrato
      const owner = await contract.methods.getOwner(idContrato).call();
      setAccount(owner);

      setTitulo(contrato.titulo);
      setFechaInicio(contrato.fechaInicio);
      setFechaFin(contrato.fechaFin);
      const precioEnEth = Web3.utils.fromWei(contrato.precio, "ether");
      setPrecio(precioEnEth); // Convertir de Wei a Ether
      setDescripcion(contrato.descripcion);
      setFirmante(contrato.firmante);
    } catch (error) {
      console.error("Error detallado:", error.message);
    }
  }, [idContrato]);

  useEffect(() => {
    connectToBlockchain();
  }, [connectToBlockchain]);
  /**********************************************************************************/

  const handleFirmar = async () => {
    if (firmante !== "0x0000000000000000000000000000000000000000") {
      alert("El contrato ya ha sido firmado");
      return;
    }

    try {
      const web3 = new Web3(new Web3.providers.HttpProvider(WEB3_PROVIDER_URL));
      const networkID = await web3.eth.net.getId();
      const network = MyContract.networks[networkID];
      const contract = new web3.eth.Contract(
        MyContract.abi,
        network && network.address
      );
      const precioEnWei = Web3.utils.toWei(precio, "ether");
      await contract.methods.firmarContrato(idContrato).send({
        from: userAccount,
        value: precioEnWei,
        gas: "1000000",
      });
      alert("Contrato firmado exitosamente");
      connectToBlockchain(); // Refresh the contract details
    } catch (error) {
      console.error("Error al firmar el contrato:", error.message);
      alert("Error al firmar el contrato");
    }
  };

  const handleMonedaChange = (moneda) => {
    setMoneda(moneda);
  };

  const displayPrecio = () => {
    if (moneda === "EUR") {
      return (parseFloat(precio) / EUR_TO_ETH_RATE).toFixed(2);
    }
    return precio;
  };

  return (
    <View style={[styles.firmar, styles.firmarFlexBox]}>
      <View style={[styles.statusBar, styles.barLayout]} />
      <View style={[styles.navigationBar, styles.barLayout]}>
        <View style={styles.largeTitleBar}>
          <TouchableOpacity
            style={styles.arrowLeft}
            activeOpacity={0.2}
            onPress={() =>
              navigation.navigate("Lista", { account: userAccount })
            }
          >
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require("../assets/arrowleft1.png")}
            />
          </TouchableOpacity>
          <View style={styles.frame}>
            <Text style={[styles.pageTitle, styles.label1FlexBox]}>
              Firmar Contrato
            </Text>
          </View>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userText}> Propietario: {account}</Text>
        </View>
      </View>
      <ScrollView
        style={styles.scrollGroup}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollGroupScrollViewContent}
      >
        <View style={[styles.frame1, styles.frameSpaceBlock]}>
          <View style={styles.textInput}>
            <View style={styles.label}>
              <Text style={[styles.label1, styles.label1Typo]}>Titulo</Text>
            </View>
            <View style={[styles.baseInputField, styles.baseSpaceBlock]}>
              <Text style={[styles.inputPlaceholder, styles.inputTypo]}>
                {titulo}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.frame2, styles.frameFlexBox]}>
          <View style={styles.textInput}>
            <View style={styles.label}>
              <Text style={[styles.label1, styles.label1Typo]}>
                Fecha inicio
              </Text>
            </View>
            <View style={[styles.baseInputField1, styles.baseSpaceBlock]}>
              <Text style={[styles.inputPlaceholder, styles.inputTypo]}>
                {fechaInicio}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.frame2, styles.frameFlexBox]}>
          <View style={styles.textInput}>
            <View style={styles.label}>
              <Text style={[styles.label1, styles.label1Typo]}>Fecha fin</Text>
            </View>
            <View style={[styles.baseInputField1, styles.baseSpaceBlock]}>
              <Text style={[styles.inputPlaceholder, styles.inputTypo]}>
                {fechaFin}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.frame2, styles.frameFlexBox]}>
          <View style={styles.textInput}>
            <View style={styles.label}>
              <Text style={[styles.label1, styles.label1Typo]}>
                Precio ({moneda})
              </Text>
            </View>
            <View style={[styles.baseInputField1, styles.baseSpaceBlock]}>
              <Text style={[styles.inputPlaceholder, styles.inputTypo]}>
                {displayPrecio()}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.frame5, styles.frameFlexBox]}>
          <View style={styles.textInput4}>
            <View style={styles.label}>
              <Text style={[styles.label1, styles.label1Typo]}>
                Descripcion del contrato
              </Text>
            </View>
            <View style={[styles.baseInputField4, styles.baseSpaceBlock]}>
              <Text style={[styles.inputPlaceholder4, styles.inputTypo]}>
                {descripcion}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.frame5, styles.frameFlexBox]}>
          <View style={styles.label}>
            <Text style={[styles.label1, styles.label1Typo]}>Moneda</Text>
          </View>
          <View style={styles.monedaSelector}>
            <TouchableOpacity
              style={[
                styles.monedaButton,
                moneda === "EUR" ? styles.selectedButton : {},
              ]}
              onPress={() => handleMonedaChange("EUR")}
            >
              <Text
                style={[
                  styles.monedaButtonText,
                  moneda === "EUR" ? styles.selectedButtonText : {},
                ]}
              >
                EUR
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.monedaButton,
                moneda === "ETH" ? styles.selectedButton : {},
              ]}
              onPress={() => handleMonedaChange("ETH")}
            >
              <Text
                style={[
                  styles.monedaButtonText,
                  moneda === "ETH" ? styles.selectedButtonText : {},
                ]}
              >
                ETH
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.frame5, styles.frameFlexBox]}>
          <LinearGradient
            style={styles.baseButton}
            locations={[0, 1]}
            colors={["#9b40bf", "#f344f7"]}
          >
            <Pressable style={styles.pressable} onPress={handleFirmar}>
              <Text style={[styles.buttonText, styles.label1Typo]}>Firmar</Text>
            </Pressable>
          </LinearGradient>
        </View>
        <View style={[styles.frame5, styles.frameFlexBox]}>
          <Text style={styles.label1}>Firmante:</Text>
          <Text style={styles.inputTypo}>
            {firmante === "0x0000000000000000000000000000000000000000"
              ? "No firmado aún"
              : firmante}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  monedaSelector: {
    flexDirection: "row",
    marginTop: 10,
  },
  monedaButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedButton: {
    backgroundColor: "#9b40bf",
  },
  monedaButtonText: {
    fontSize: 16,
    color: "#000",
  },
  selectedButtonText: {
    color: "#fff",
  },

  userInfo: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.blurLight,
  },
  userText: {
    fontSize: 12,
    color: Color.fontWhite,
    fontFamily: FontFamily.paragraphRegularSmall,
  },
  scrollGroupScrollViewContent: {
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  firmarFlexBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  barLayout: {
    width: 390,
    backgroundColor: Color.blurLight,
  },
  label1FlexBox: {
    textAlign: "left",
    color: Color.fontWhite,
  },
  inputTypo: {
    fontFamily: FontFamily.paragraphRegularSmall,
    lineHeight: 20,
    fontSize: FontSize.header6_size,
    textAlign: "left",
    color: Color.fontWhite,
  },
  frameSpaceBlock: {
    paddingVertical: 0,
    alignItems: "center",
  },
  label1Typo: {
    fontFamily: FontFamily.paragraphMediumLarge,
    fontWeight: "500",
    lineHeight: 24,
    fontSize: FontSize.header6_size,
  },
  baseSpaceBlock: {
    marginTop: 4,
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_base,
    borderWidth: 1.5,
    borderColor: Color.colorGray_100,
    borderStyle: "solid",
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    backgroundColor: Color.monochromatic10,
  },
  frameFlexBox: {
    marginTop: 16,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  statusBar: {
    height: 37,
    alignSelf: "stretch",
    justifyContent: "center",
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
  pageTitle: {
    fontSize: FontSize.header1_size,
    lineHeight: 32,
    fontWeight: "600",
    fontFamily: FontFamily.header6,
    alignSelf: "stretch",
  },
  pageSubtitle: {
    alignSelf: "stretch",
  },
  frame: {
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
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  navigationBar: {
    marginTop: 13,
    overflow: "hidden",
  },
  label1: {
    textAlign: "left",
    color: Color.fontWhite,
  },
  label: {
    alignSelf: "stretch",
    justifyContent: "center",
  },
  inputPlaceholder: {
    flex: 1,
  },
  baseInputField: {
    height: 50,
    marginTop: 4,
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_base,
    borderWidth: 1.5,
    borderColor: Color.colorGray_100,
    borderStyle: "solid",
    borderRadius: Border.br_81xl,
  },
  textInput: {
    alignSelf: "stretch",
  },
  frame1: {
    paddingHorizontal: Padding.p_mini,
    height: 83,
    paddingVertical: 0,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  baseInputField1: {
    height: 50,
    marginTop: 4,
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_base,
    borderWidth: 1.5,
    borderColor: Color.colorGray_100,
    borderStyle: "solid",
    borderRadius: Border.br_81xl,
    overflow: "hidden",
  },
  frame2: {
    paddingVertical: 0,
    alignItems: "center",
    paddingHorizontal: Padding.p_mini,
    height: 83,
  },
  inputPlaceholder4: {
    alignSelf: "stretch",
    flex: 1,
  },
  baseInputField4: {
    borderRadius: Border.br_xl,
    marginTop: 4,
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_base,
    borderWidth: 1.5,
    borderColor: Color.colorGray_100,
    borderStyle: "solid",
    overflow: "hidden",
    flex: 1,
  },
  textInput4: {
    alignSelf: "stretch",
    flex: 1,
  },
  frame5: {
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_mini,
    overflow: "hidden",
    flex: 1,
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
    height: "100%",
    flexDirection: "row",
    overflow: "hidden",
    alignSelf: "stretch",
    alignItems: "center",
  },
  baseButton: {
    height: 73,
  },
  frame6: {
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_mini,
    overflow: "hidden",
    flex: 1,
  },
  scrollGroup: {
    marginTop: 13,
    alignSelf: "stretch",
    flex: 1,
  },
  firmar: {
    shadowColor: "rgba(180, 188, 203, 0.24)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 24,
    elevation: 24,
    shadowOpacity: 1,
    height: 813,
    justifyContent: "center",
    width: "100%",
    backgroundColor: Color.monochromatic10,
    alignItems: "center",
    flex: 1,
  },
});

export default Firmar;

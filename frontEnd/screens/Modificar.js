import React, { useState, useEffect, useCallback } from "react";
import { WEB3_PROVIDER_URL } from "../global";
import {
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Image } from "expo-image";
import Web3 from "web3";
import MyContract from "../contracts/MyContract.json";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur";

const EUR_TO_ETH_RATE = 0.00028; // Ejemplo: 1 EUR = 0.00042 ETH

const Modificar = ({ route }) => {
  const [firmante, setFirmante] = useState("");
  const [owner, setOwner] = useState("");
  const [ownerInfo, setOwnerInfo] = useState(null);
  const [firmanteInfo, setFirmanteInfo] = useState(null);
  const [estado, setEstado] = useState("");

  /*Conexion a la blockchain*/
  const connectToBlockchain = useCallback(async () => {
    try {
      const web3 = new Web3(new Web3.providers.HttpProvider(WEB3_PROVIDER_URL));
      const accounts = await web3.eth.getAccounts();
      const networkID = await web3.eth.net.getId();
      const network = MyContract.networks[networkID];
      const contract = new web3.eth.Contract(
        MyContract.abi,
        network && network.address
      );
      const contractsReturned = await contract.methods.getAllContracts().call();

      const contrato = contractsReturned.find(
        (c) => c.id === BigInt(idContrato)
      );

      // Obtener la dirección del propietario del contrato
      const owner = await contract.methods.getOwner(idContrato).call();
      setOwner(owner);

      // Obtener información del propietario y del firmante
      const storedUsers = await AsyncStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      const ownerUserInfo = users.find((user) => user.account === owner);
      const firmanteUserInfo = users.find(
        (user) => user.account === contrato.firmante
      );

      setOwnerInfo(ownerUserInfo);
      setFirmanteInfo(firmanteUserInfo);
      setFirmante(contrato["firmante"]);

      const now = new Date() + 1;
      const fechaInicio = parseDateString(contrato["fechaInicio"]);
      const fechaFin = parseDateString(contrato["fechaFin"]);
      let estado;

      if (
        contrato["firmante"] !== "0x0000000000000000000000000000000000000000"
      ) {
        estado = "firmado";
      } else if (now > fechaFin) {
        estado = "expirado";
      } else {
        estado = "activo";
      }
      setEstado(estado);

      setFormData({
        titulo: contrato["titulo"],
        fechaInicio: parseDateString(contrato["fechaInicio"]),
        fechaFin: parseDateString(contrato["fechaFin"]),
        precio: Web3.utils
          .fromWei(contrato.precio.toString(), "ether")
          .toString(),

        descripcion: contrato["descripcion"],
        moneda: "ETH",
      });
    } catch (error) {
      alert("No se ha podido conectar a la blockchain");
    }
  }, [idContrato]);

  useEffect(() => {
    connectToBlockchain();
  }, [connectToBlockchain]);
  /*********************************************************** */

  const navigation = useNavigation();
  const { idContrato, account } = route.params;

  const [formData, setFormData] = useState({
    titulo: "",
    fechaInicio: new Date(),
    fechaFin: new Date(),
    precio: "",
    descripcion: "",
    moneda: "ETH", // Moneda seleccionada
  });

  const [showInicioPicker, setShowInicioPicker] = useState(false);
  const [showFinPicker, setShowFinPicker] = useState(false);
  const [eurToETH, setEurToEth] = useState(null);

  const fetchEthToEurRate = useCallback(async () => {
    try {
      const response = await axios.get(API_URL);
      const rate = response.data.ethereum.eur;
      setEurToEth(1 / rate);
    } catch (error) {
      setEurToEth(EUR_TO_ETH_RATE);
    }
  }, []);

  useEffect(() => {
    fetchEthToEurRate();
  }, [fetchEthToEurRate]);

  const parseDateString = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return new Date(year, month - 1, day);
  };

  const formatDateString = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleMonedaChange = (moneda) => {
    if (formData.moneda !== moneda) {
      let precioConvertido;
      if (moneda === "EUR") {
        precioConvertido = (parseFloat(formData.precio) / eurToETH).toString();
      } else {
        precioConvertido = (parseFloat(formData.precio) * eurToETH).toString();
      }
      setFormData({ ...formData, moneda, precio: precioConvertido });
    }
  };

  const displayPrecio = () => {
    if (formData.precio === "") return "";
    const precio = parseFloat(formData.precio);
    return isNaN(precio) ? "" : precio.toString();
  };

  const validateForm = () => {
    const { titulo, fechaInicio, fechaFin, precio, descripcion } = formData;

    if (!titulo || !fechaInicio || !fechaFin || !precio || !descripcion) {
      alert("Todos los campos son obligatorios");
      return false;
    }

    if (fechaInicio < new Date() + 1) {
      alert("La fecha de inicio no puede ser menor a la actual");
      return false;
    }

    if (fechaFin < new Date() + 1) {
      alert("La fecha de fin no puede ser menor a la actual");
      return false;
    }

    if (fechaInicio > fechaFin) {
      alert("La fecha de inicio no puede ser posterior a la fecha final");
      return false;
    }

    if (isNaN(precio) || parseFloat(precio) <= 0) {
      alert("El precio debe ser un número mayor a 0");
      return false;
    }

    return true;
  };

  const handleModificar = async () => {
    if (!validateForm()) {
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

      let precioEnWei;
      let precioFinal = parseFloat(formData.precio).toString();

      if (formData.moneda === "EUR") {
        const precioEnEth = parseFloat(precioFinal) * eurToETH;
        precioEnWei = Web3.utils.toWei(precioEnEth.toString(), "ether");
      } else {
        precioEnWei = Web3.utils.toWei(precioFinal, "ether");
      }

      await contract.methods
        .modificarContrato(
          idContrato,
          formData.titulo,
          formData.descripcion,
          precioEnWei,
          formatDateString(formData.fechaInicio),
          formatDateString(formData.fechaFin)
        )
        .send({ from: account, gas: "1000000" });

      alert("Contrato modificado exitosamente");
      navigation.navigate("Lista", { account });
    } catch (error) {
      console.error("Error al modificar el contrato:", error);
      alert("Error al modificar el contrato");
    }
  };

  const getEstadoStyle = (estado) => {
    switch (estado) {
      case "activo":
        return styles.estadoActivo;
      case "firmado":
        return styles.estadoFirmado;
      case "expirado":
        return styles.estadoExpirado;
      default:
        return {};
    }
  };

  return (
    <View style={[styles.firmar, styles.firmarFlexBox]}>
      <View style={[styles.statusBar, styles.barLayout]} />
      <View style={[styles.navigationBar, styles.barLayout]}>
        <View style={styles.largeTitleBar}>
          <TouchableOpacity
            style={styles.arrowLeft}
            activeOpacity={0.2}
            onPress={() => navigation.navigate("Lista", { account })}
          >
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require("../assets/arrowleft1.png")}
            />
          </TouchableOpacity>
          <View style={styles.frame}>
            <Text style={[styles.pageTitle, styles.label1FlexBox]}>
              Modificación de Contrato
            </Text>
          </View>
        </View>
        <View style={styles.userInfo}>
          <Text style={[styles.userText, getEstadoStyle(estado)]}>
            {" "}
            Estado: {estado}
          </Text>
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
            <TextInput
              style={[styles.baseInputField, styles.baseSpaceBlock]}
              value={formData.titulo}
              onChangeText={(text) => handleInputChange("titulo", text)}
            />
          </View>
        </View>
        <View style={[styles.frame2, styles.frameFlexBox]}>
          <View style={styles.textInput}>
            <View style={styles.label}>
              <Text style={[styles.label1, styles.label1Typo]}>
                Fecha inicio
              </Text>
            </View>
            <TouchableOpacity onPress={() => setShowInicioPicker(true)}>
              <TextInput
                style={[styles.baseInputField1, styles.baseSpaceBlock]}
                value={formatDateString(formData.fechaInicio)}
                editable={false}
              />
            </TouchableOpacity>
            {showInicioPicker && (
              <DateTimePicker
                value={formData.fechaInicio}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || formData.fechaInicio;
                  setShowInicioPicker(false);
                  handleInputChange("fechaInicio", currentDate);
                }}
              />
            )}
          </View>
        </View>
        <View style={[styles.frame2, styles.frameFlexBox]}>
          <View style={styles.textInput}>
            <View style={styles.label}>
              <Text style={[styles.label1, styles.label1Typo]}>Fecha fin</Text>
            </View>
            <TouchableOpacity onPress={() => setShowFinPicker(true)}>
              <TextInput
                style={[styles.baseInputField1, styles.baseSpaceBlock]}
                value={formatDateString(formData.fechaFin)}
                editable={false}
              />
            </TouchableOpacity>
            {showFinPicker && (
              <DateTimePicker
                value={formData.fechaFin}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || formData.fechaFin;
                  setShowFinPicker(false);
                  handleInputChange("fechaFin", currentDate);
                }}
              />
            )}
          </View>
        </View>
        <View style={[styles.frame2, styles.frameFlexBox]}>
          <View style={styles.textInput}>
            <View style={styles.label}>
              <Text style={[styles.label1, styles.label1Typo]}>
                Precio ({formData.moneda})
              </Text>
            </View>
            <TextInput
              style={[styles.baseInputField1, styles.baseSpaceBlock]}
              value={displayPrecio()}
              onChangeText={(text) => handleInputChange("precio", text)}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={[styles.frame5, styles.frameFlexBox]}>
          <View style={styles.textInput4}>
            <View style={styles.label}>
              <Text style={[styles.label1, styles.label1Typo]}>
                Descripcion del contrato
              </Text>
            </View>
            <TextInput
              style={[styles.baseInputField4, styles.baseSpaceBlock]}
              value={formData.descripcion}
              onChangeText={(text) => handleInputChange("descripcion", text)}
              multiline={true}
            />
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
                formData.moneda === "EUR" ? styles.selectedButton : {},
              ]}
              onPress={() => handleMonedaChange("EUR")}
            >
              <Text
                style={[
                  styles.monedaButtonText,
                  formData.moneda === "EUR" ? styles.selectedButtonText : {},
                ]}
              >
                EUR
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.monedaButton,
                formData.moneda === "ETH" ? styles.selectedButton : {},
              ]}
              onPress={() => handleMonedaChange("ETH")}
            >
              <Text
                style={[
                  styles.monedaButtonText,
                  formData.moneda === "ETH" ? styles.selectedButtonText : {},
                ]}
              >
                ETH
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.userInfoSection}>
          <View style={styles.separator} />
          <View style={styles.userInfoBlock}>
            <Text style={styles.userInfoTitle}>Firmante</Text>
            <Text style={styles.userInfoText}>
              {firmante === "0x0000000000000000000000000000000000000000" ? (
                "No firmado aún"
              ) : firmanteInfo ? (
                <>
                  Usuario: {firmanteInfo.username} {"\n"}
                  DNI: {firmanteInfo.dni} {"\n"}
                  Dirección: {firmanteInfo.account}
                </>
              ) : (
                "Información no disponible"
              )}
            </Text>
          </View>
        </View>

        {estado != "firmado" && (
          <View style={[styles.frame5, styles.frameFlexBox]}>
            <LinearGradient
              style={styles.baseButton}
              locations={[0, 1]}
              colors={["#9b40bf", "#f344f7"]}
            >
              <Pressable style={styles.pressable} onPress={handleModificar}>
                <Text style={[styles.buttonText, styles.label1Typo]}>
                  Guardar Cambios
                </Text>
              </Pressable>
            </LinearGradient>
          </View>
        )}
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
    color: "#666",
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
  userInfoSection: {
    marginTop: 20,
    padding: 10,
    alignSelf: "stretch",
  },
  userInfoBlock: {
    paddingVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  userInfoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: Color.fontWhite,
  },
  userInfoText: {
    fontSize: 16,
    color: Color.fontWhite,
  },
  estadoActivo: {
    color: "green",
    fontSize: 16,
    fontWeight: "bold",
  },
  estadoFirmado: {
    color: "orange",
    fontSize: 16,
    fontWeight: "bold",
  },
  estadoExpirado: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Modificar;

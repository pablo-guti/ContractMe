import "../global";
import { WEB3_PROVIDER_URL } from "../global";
import "react-native-get-random-values";
import React, { useState, useEffect, useCallback } from "react";
import Web3, { ETH_DATA_FORMAT } from "web3";
import MyContract from "../contracts/MyContract.json";
import {
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
import axios from "axios";

const API_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur";

const EUR_TO_ETH_RATE = 0.00028;

const getContract = async (web3) => {
  const networkID = await web3.eth.net.getId();
  const network = MyContract.networks[networkID];
  return new web3.eth.Contract(MyContract.abi, network && network.address);
};

const NuevoContrato = ({ route }) => {
  const [MyContract, setMyContract] = useState();

  /****************************************************************************************/
  /*Conexión con blockchain y obtención del contrato*/
  useEffect(() => {
    const connectToBlockchain = async () => {
      try {
        const web3 = new Web3(
          new Web3.providers.HttpProvider(WEB3_PROVIDER_URL)
        );
        const contract = await getContract(web3);
        setMyContract(contract);
      } catch (error) {
        alert("No se ha podido conectar a la blockchain");
      }
    };

    connectToBlockchain();
  }, []);

  /****************************************************************************************/

  const [showInicioPicker, setShowInicioPicker] = useState(false);
  const [showFinPicker, setShowFinPicker] = useState(false);
  const [eurToETH, setEurToEth] = useState(null);

  const navigation = useNavigation();
  const { account } = route.params;

  const [formData, setFormData] = useState({
    tituloContrato: "",
    fechaInicio: new Date(),
    fechaFin: new Date(),
    precio: "",
    descripcionContrato: "",
    moneda: "EUR", // Moneda seleccionada
  });

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

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleInputChangeText = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleDateChange = (date, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: date,
    });
  };

  const handleMonedaChange = (moneda) => {
    setFormData({
      ...formData,
      moneda,
    });
  };

  const validateForm = () => {
    const {
      tituloContrato,
      fechaInicio,
      fechaFin,
      precio,
      descripcionContrato,
    } = formData;

    // Verificación de campos vacíos
    if (
      !tituloContrato ||
      !fechaInicio ||
      !fechaFin ||
      !precio ||
      !descripcionContrato
    ) {
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

    // Verificación de fechas
    if (fechaInicio > fechaFin) {
      alert("La fecha de inicio no puede ser posterior a la fecha final");
      return false;
    }

    // Verificación del precio
    if (isNaN(precio)) {
      alert("El precio solo puede contener números");
      return false;
    }

    return true;
  };

  async function handleCreateContract() {
    if (!validateForm()) {
      return;
    }
    try {
      let precioEnWei;
      if (formData.moneda === "EUR") {
        const precioEnEth = parseFloat(formData.precio) * eurToETH;
        console.log(precioEnEth);
        precioEnWei = Web3.utils.toWei(precioEnEth.toString(), "ether");
      } else {
        precioEnWei = Web3.utils.toWei(formData.precio, "ether");
      }

      await MyContract.methods
        .crearContrato(
          formData.tituloContrato,
          formData.descripcionContrato,
          precioEnWei,
          formatDate(formData.fechaInicio),
          formatDate(formData.fechaFin)
        )
        .send({ from: account, gas: "1000000" });
      alert("Contrato creado");
      navigation.navigate("Lista", { account: account });
    } catch (error) {
      alert("Error al crear el contrato");
    }
  }

  return (
    <View style={styles.nuevoContrato}>
      <View style={[styles.statusBar, styles.barFlexBox]} />
      <View style={[styles.navigationBar, styles.scrollGroupSpaceBlock]}>
        <View style={styles.largeTitleBar}>
          <TouchableOpacity
            style={styles.arrowLeft}
            activeOpacity={0.2}
            onPress={() => navigation.navigate("Lista", { account: account })}
          >
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require("../assets/arrowleft1.png")}
            />
          </TouchableOpacity>
          <View style={styles.largeTitleGrp}>
            <Text style={styles.pageTitle}>Nuevo Contrato</Text>
          </View>
        </View>
      </View>
      <ScrollView
        style={[styles.scrollGroup, styles.scrollGroupSpaceBlock]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollGroupScrollViewContent}
      >
        <View style={[styles.frame, styles.frameSpaceBlock]}>
          <View style={styles.textInput}>
            <View style={styles.label}>
              <Text style={[styles.label1, styles.label1Typo]}>
                Titulo Contrato
              </Text>
            </View>
            <TextInput
              style={[styles.baseInputField, styles.baseSpaceBlock]}
              onChangeText={(text) =>
                handleInputChangeText("tituloContrato", text)
              }
            />
          </View>
        </View>
        <View style={[styles.frame1, styles.frameFlexBox]}>
          <View style={styles.textInput}>
            <View style={styles.label}>
              <Text style={[styles.label1, styles.label1Typo]}>
                Fecha inicio
              </Text>
            </View>
            <TouchableOpacity onPress={() => setShowInicioPicker(true)}>
              <TextInput
                style={[styles.baseInputField1, styles.baseSpaceBlock]}
                value={formatDate(formData.fechaInicio)}
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
                  handleDateChange(currentDate, "fechaInicio");
                }}
              />
            )}
          </View>
        </View>
        <View style={[styles.frame1, styles.frameFlexBox]}>
          <View style={styles.textInput}>
            <View style={styles.label}>
              <Text style={[styles.label1, styles.label1Typo]}>Fecha fin</Text>
            </View>
            <TouchableOpacity onPress={() => setShowFinPicker(true)}>
              <TextInput
                style={[styles.baseInputField1, styles.baseSpaceBlock]}
                value={formatDate(formData.fechaFin)}
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
                  handleDateChange(currentDate, "fechaFin");
                }}
              />
            )}
          </View>
        </View>
        <View style={[styles.frame1, styles.frameFlexBox]}>
          <View style={[styles.textInput]}>
            <View style={styles.label}>
              <Text style={[styles.label1, styles.label1Typo]}>
                Precio ({formData.moneda})
              </Text>
            </View>
            <TextInput
              style={[styles.baseInputField3, styles.baseSpaceBlock]}
              keyboardType="number-pad"
              onChangeText={(text) => handleInputChangeText("precio", text)}
            />
          </View>
        </View>
        <View style={[styles.frame4, styles.frameFlexBox]}>
          <View style={styles.textInput4}>
            <View style={styles.label}>
              <Text style={[styles.label1, styles.label1Typo]}>
                Descripcion del contrato
              </Text>
            </View>
            <TextInput
              style={[styles.baseInputField4, styles.baseSpaceBlock]}
              multiline={true}
              secureTextEntry={false}
              onChangeText={(text) =>
                handleInputChangeText("descripcionContrato", text)
              }
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
        <View style={[styles.frame5, styles.frameFlexBox]}>
          <LinearGradient
            style={styles.baseButton}
            locations={[0, 1]}
            colors={["#9b40bf", "#f344f7"]}
          >
            <Pressable style={styles.pressable} onPress={handleCreateContract}>
              <Text style={[styles.buttonText, styles.label1Typo]}>
                Crear Contrato
              </Text>
            </Pressable>
          </LinearGradient>
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
  baseInputFieldDatePickerValue: {},
  baseInputFieldDatePicker1Value: {},
  scrollGroupScrollViewContent: {
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  barFlexBox: {
    backgroundColor: Color.blurLight,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollGroupSpaceBlock: {
    marginTop: 13,
    alignSelf: "stretch",
  },
  frameSpaceBlock: {
    paddingVertical: 0,
    alignItems: "center",
  },
  label1Typo: {
    fontFamily: FontFamily.paragraphMediumLarge,
    fontWeight: "500",
    lineHeight: 24,
    fontSize: FontSize.paragraphMediumLarge_size,
  },
  baseSpaceBlock: {
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_base,
    borderWidth: 1.5,
    borderColor: Color.colorGray_100,
    borderStyle: "solid",
    marginTop: 4,
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
    width: 390,
    height: 37,
    alignSelf: "stretch",
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
    textAlign: "center",
    color: Color.fontWhite,
  },
  largeTitleGrp: {
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
    height: 64,
    overflow: "hidden",
    backgroundColor: Color.blurLight,
    justifyContent: "center",
    alignItems: "center",
  },
  label1: {
    textAlign: "left",
    color: Color.fontWhite,
  },
  label: {
    alignSelf: "stretch",
    justifyContent: "center",
  },
  baseInputField: {
    marginTop: 4,
    height: 50,
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
  frame: {
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
  frame1: {
    paddingVertical: 0,
    alignItems: "center",
    paddingHorizontal: Padding.p_mini,
    height: 83,
  },
  baseInputField3: {
    marginTop: 4,
    height: 50,
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_base,
    borderWidth: 1.5,
    borderColor: Color.colorGray_100,
    borderStyle: "solid",
    borderRadius: Border.br_81xl,
    overflow: "hidden",
  },
  baseInputField4: {
    borderRadius: 20,
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
  frame4: {
    height: 205,
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: 0,
    alignItems: "center",
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
  frame5: {
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_mini,
    overflow: "hidden",
    flex: 1,
  },
  scrollGroup: {
    flex: 1,
  },
  nuevoContrato: {
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
    alignItems: "center",
    width: "100%",
    backgroundColor: Color.monochromatic10,
    flex: 1,
  },
});

export default NuevoContrato;

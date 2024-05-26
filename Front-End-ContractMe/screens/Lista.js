import React, { useState, useEffect, useCallback } from "react";
import { WEB3_PROVIDER_URL } from "../global";
import {
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";
import Web3 from "web3";
import MyContract from "../contracts/MyContract.json";
import { Image } from "expo-image";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ContentRowContratoPropio from "../components/ContentRowContratoPropio";
import ContentRowContratoParaFirmar from "../components/ContentRowContratoParaFirmar";
import { FontFamily, Color, Padding, Border, FontSize } from "../GlobalStyles";

const Lista = ({ route }) => {
  /****************************************************************************************/
  /*Conexión con blockchain y obtención del contrato*/

  const { account } = route.params;
  const [contractsToSign, setContractsToSign] = useState([]);
  const [ownerContracts, setOwnerContracts] = useState([]);
  const [refresh, setRefresh] = useState(false); // Nuevo estado para la recarga

  const connectToBlockchain = useCallback(async () => {
    try {
      const web3 = new Web3(new Web3.providers.HttpProvider(WEB3_PROVIDER_URL));
      const accounts = await web3.eth.getAccounts();
      const ownerAddress = accounts[0];
      const networkID = await web3.eth.net.getId();
      const network = MyContract.networks[networkID];
      const contract = new web3.eth.Contract(
        MyContract.abi,
        network && network.address
      );

      try {
        //All Contracts
        const contractsToSign = await contract.methods
          .getAllContractsToSign(account)
          .call();
        setContractsToSign(contractsToSign);
      } catch (error) {
        setContractsToSign([]);
      }

      try {
        //Owner Contracts
        const ownerContracts = await contract.methods
          .getAllContractsByOwner(account)
          .call();

        setOwnerContracts(ownerContracts);
      } catch (error) {
        setOwnerContracts([]);
      }
    } catch (error) {
      console.error("Error al conectar a la blockchain:", error);
      console.error("Error detallado:", error.message);
    }
  }, []);

  useEffect(() => {
    connectToBlockchain();
  }, [connectToBlockchain, refresh]);
  /**********************************************************************************/

  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("Mis Contratos");

  const handleRefresh = () => {
    // Cambiar el estado para forzar una recarga
    setRefresh((prevState) => !prevState);
  };

  const renderScrollView = () => {
    try {
      // Renderizado según la pestaña seleccionada
      if (selectedTab === "Mis Contratos") {
        if (ownerContracts.length === 0) {
          throw new Error("Aun no has creado ningún contrato");
        }
        return (
          <ScrollView
            style={styles.scrollGroupActivo}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollGroupActivoScrollViewContent}
          >
            {ownerContracts.map((contract, index) => (
              <ContentRowContratoPropio
                key={index}
                titulo={contract["titulo"]}
                fechaInicio={contract["fechaInicio"]}
                fechaFin={contract["fechaFin"]}
                id={contract["id"]}
                account={account}
              />
            ))}
          </ScrollView>
        );
      } else if (selectedTab === "Para firmar") {
        if (contractsToSign.length === 0) {
          throw new Error("Aun no existen contratos para poder firmar");
        }
        return (
          <ScrollView
            style={styles.scrollGroupActivo}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollGroupActivoScrollViewContent}
          >
            {contractsToSign.map((contract, index) => (
              <ContentRowContratoParaFirmar
                key={index}
                titulo={contract["titulo"]}
                fechaInicio={contract["fechaInicio"]}
                fechaFin={contract["fechaFin"]}
                id={contract["id"]}
                account={account}
              />
            ))}
          </ScrollView>
        );
      } else if (selectedTab === "Finalizado") {
        return (
          <ScrollView
            style={styles.scrollGroupActivo}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollGroupActivoScrollViewContent}
          >
            <ContentRowContratoParaFirmar />
          </ScrollView>
        );
      }
    } catch (error) {
      return (
        <View style={styles.noContractsContainer}>
          <Text style={styles.noContractsText}>{error.message}</Text>
        </View>
      );
    }
  };

  return (
    <View style={[styles.lista, styles.copyFlexBox]}>
      <View style={styles.statusBar} />

      <View style={styles.navigationBar}>
        <View style={styles.userInfo}>
          <Text style={styles.userText}> Cartera: {account}</Text>
        </View>

        <View style={[styles.largeTitleBar, styles.contentFlexBox]}>
          <TouchableOpacity
            style={styles.leftAction}
            activeOpacity={0.2}
            onPress={() => navigation.navigate("PantallaInicial")}
          >
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require("../assets/left-action2.png")}
            />
          </TouchableOpacity>
          <View style={[styles.largeTitleGrp, styles.copyFlexBox]}>
            <Text style={[styles.pageTitle, styles.pageTitleTypo]}>
              Contratos
            </Text>
          </View>

          <View style={[styles.rightActions, styles.contentFlexBox]}>
            <TouchableOpacity
              style={styles.leftAction}
              activeOpacity={0.2}
              onPress={handleRefresh}
            >
              <Image
                style={styles.icon}
                contentFit="cover"
                source={require("../assets/reload.png")}
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.rightActions, styles.contentFlexBox]}>
            <TouchableOpacity
              style={styles.leftAction}
              activeOpacity={0.2}
              onPress={() =>
                navigation.navigate("NuevoContrato", { account: account })
              }
            >
              <Image
                style={styles.icon}
                contentFit="cover"
                source={require("../assets/icon-button4.png")}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.tabGrp, styles.tabGrpFlexBox]}>
          <TouchableOpacity
            style={[
              styles.tabSelected,
              styles.tabFlexBox,
              selectedTab === "Mis Contratos"
                ? styles.tabSelected
                : styles.tabUnselected,
            ]}
            onPress={() => setSelectedTab("Mis Contratos")}
          >
            <Text
              style={[
                styles.misContratos,
                styles.rowTypo,
                selectedTab === "Mis Contratos"
                  ? styles.misContratosBlanco
                  : styles.misContratosNegro,
              ]}
            >{`Mis Contratos `}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab1Unselected,
              styles.tabFlexBox,
              selectedTab === "Para firmar"
                ? styles.tab1Selected
                : styles.tab1Unselected,
            ]}
            onPress={() => setSelectedTab("Para firmar")}
          >
            <Text
              style={[
                styles.paraFirmarNegro,
                styles.rowTypo,
                selectedTab === "Para firmar"
                  ? styles.paraFirmarBlanco
                  : styles.paraFirmarNegro,
              ]}
            >{`Para firmar `}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab1Unselected,
              styles.tabFlexBox,
              selectedTab === "Finalizado"
                ? styles.tab1Selected
                : styles.tab1Unselected,
            ]}
            onPress={() => setSelectedTab("Finalizado")}
          >
            <Text
              style={[
                styles.paraFirmar,
                styles.rowTypo,
                selectedTab === "Finalizado"
                  ? styles.firmadoBlanco
                  : styles.firmadoNegro,
              ]}
            >
              Finalizado
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {renderScrollView()}
    </View>
  );
};

const styles = StyleSheet.create({
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
  scrollGroupActivoScrollViewContent: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  copyFlexBox: {
    justifyContent: "center",
    flex: 1,
  },
  contentFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  pageTitleTypo: {
    textAlign: "left",
    fontFamily: FontFamily.header6,
    fontWeight: "600",
    color: Color.fontWhite,
    alignSelf: "stretch",
  },
  tabGrpFlexBox: {
    paddingHorizontal: Padding.p_base,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  tabFlexBox: {
    paddingVertical: Padding.p_9xs,
    paddingHorizontal: Padding.p_xs,
    borderRadius: Border.br_5xl,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rowTypo: {
    fontFamily: FontFamily.paragraphRegularSmall,
    textAlign: "left",
  },
  image2Icon: {
    width: 71,
    height: 33,
    marginLeft: 4,
  },
  imagePosition: {
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,
    position: "absolute",
  },
  rowLayout: {
    lineHeight: 24,
    fontSize: FontSize.header6_size,
  },
  statusBar: {
    height: 37,
    backgroundColor: Color.blurLight,
    alignSelf: "stretch",
  },
  icon: {
    borderRadius: Border.br_81xl,
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  leftAction: {
    width: 40,
    height: 40,
  },
  pageTitle: {
    fontSize: FontSize.header1_size,
    lineHeight: 32,
  },
  largeTitleGrp: {
    marginLeft: 4,
  },
  rightActions: {
    justifyContent: "flex-end",
    marginLeft: 4,
  },
  largeTitleBar: {
    height: 76,
    paddingLeft: Padding.p_base,
    paddingTop: Padding.p_9xs,
    paddingRight: Padding.p_5xs,
    paddingBottom: Padding.p_xs,
    alignSelf: "stretch",
  },
  misContratosBlanco: {
    color: Color.monochromatic10,
    lineHeight: 24,
    fontSize: FontSize.header6_size,
  },
  misContratosNegro: {
    color: Color.fontWhite,
    lineHeight: 24,
    fontSize: FontSize.header6_size,
  },
  tabSelected: {
    backgroundColor: Color.brand05,
  },
  tabUnselected: {
    backgroundColor: Color.blurLight,
  },
  paraFirmarNegro: {
    lineHeight: 24,
    fontSize: FontSize.header6_size,
    color: Color.fontWhite,
    fontFamily: FontFamily.paragraphRegularSmall,
  },
  paraFirmarBlanco: {
    lineHeight: 24,
    fontSize: FontSize.header6_size,
    color: Color.monochromatic10,
    fontFamily: FontFamily.paragraphRegularSmall,
  },
  firmadoNegro: {
    lineHeight: 24,
    fontSize: FontSize.header6_size,
    color: Color.fontWhite,
    fontFamily: FontFamily.paragraphRegularSmall,
  },
  firmadoBlanco: {
    lineHeight: 24,
    fontSize: FontSize.header6_size,
    color: Color.monochromatic10,
    fontFamily: FontFamily.paragraphRegularSmall,
  },

  tab1Selected: {
    marginLeft: 8,
    backgroundColor: Color.brand05,
  },
  tab1Unselected: {
    marginLeft: 8,
    backgroundColor: Color.blurLight,
  },
  tabGrp: {
    paddingTop: Padding.p_3xs,
    paddingBottom: Padding.p_mini,
  },
  navigationBar: {
    width: 386,
    height: 133,
    marginTop: 15,
    backgroundColor: Color.blurLight,
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
    textAlign: "left",
    fontFamily: FontFamily.header6,
    fontWeight: "600",
    color: Color.fontWhite,
    alignSelf: "stretch",
  },
  rowDescription: {
    lineHeight: 24,
    fontSize: FontSize.header6_size,
    color: Color.fontWhite,
    fontFamily: FontFamily.paragraphRegularSmall,
    alignSelf: "stretch",
  },
  rowHelperText: {
    fontSize: FontSize.paragraphRegularSmall_size,
    lineHeight: 20,
    color: Color.colorLimegreen,
    alignSelf: "stretch",
  },
  copy: {
    marginLeft: 12,
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
    paddingVertical: Padding.p_xs,
    backgroundColor: Color.monochromatic10,
    paddingHorizontal: Padding.p_base,
  },
  scrollGroupActivo: {
    marginTop: 15,
    alignSelf: "stretch",
    flex: 1,
  },
  lista: {
    shadowColor: "rgba(180, 188, 203, 0.24)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 24,
    elevation: 24,
    shadowOpacity: 1,
    height: 812,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: Color.monochromatic10,
  },
  noContractsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noContractsText: {
    fontSize: 16,
    color: "gray",
  },
});

export default Lista;

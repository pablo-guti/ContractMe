const Stack = createNativeStackNavigator();
import "./global";
import "react-native-get-random-values";
import Web3 from "web3";
import MyContract from "./contracts/MyContract.json";
import React, { useState, useEffect, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import PantallaInicial from "./screens/PantallaInicial";
import Info from "./screens/Info";
import Lista from "./screens/Lista";
import SignIn from "./screens/SignIn";
import Firmar from "./screens/Firmar";
import NuevoContrato from "./screens/NuevoContrato";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { IconRegistry, ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  Button,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const getContract = async (web3) => {
  const networkID = await web3.eth.net.getId();
  const network = MyContract.networks[networkID];
  return new web3.eth.Contract(MyContract.abi, network && network.address);
};

const App = () => {
  /****************************************************************************************/
  /*Conexión con blockchain y obtención del contrato*/

  const [account, setAccount] = useState();
  const [MyContract, setMyContract] = useState();

  useEffect(() => {
    const connectToBlockchain = async () => {
      try {
        //Conexión con la blockchain
        const web3 = new Web3(
          new Web3.providers.HttpProvider("http://192.168.1.35:7545")
        );
        const accounts = await web3.eth.getAccounts();
        const ownerAdress = accounts[0];
        const contract = await getContract(web3);
        setAccount(ownerAdress);
        setMyContract(contract);
      } catch (error) {
        console.error("Error al conectar a la blockchain:", error);
        // Agregar más información sobre el error
        console.error("Error detallado:", error.message);
      }
    };

    connectToBlockchain();
  }, []);

  /**********************************************************************************/

  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  const Stack = createStackNavigator();
  const [listaKey, setListaKey] = useState(0); // Estado para la clave de la pantalla Lista

  // Función para actualizar la clave de la pantalla Lista
  const refreshLista = () => {
    setListaKey((prevKey) => prevKey + 1);
  };

  const [fontsLoaded, error] = useFonts({
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "GothicA1-Regular": require("./assets/fonts/GothicA1-Regular.ttf"),
    "GothicA1-Medium": require("./assets/fonts/GothicA1-Medium.ttf"),
    "GothicA1-SemiBold": require("./assets/fonts/GothicA1-SemiBold.ttf"),
  });

  function MaterialIcon({ name, style }) {
    const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
    return (
      <MIcon name={name} size={height} color={tintColor} style={iconStyle} />
    );
  }

  const IconProvider = (name) => ({
    toReactElement: (props) => MaterialIcon({ name, ...props }),
  });

  function createIconsMap() {
    return new Proxy(
      {},
      {
        get(target, name) {
          return IconProvider(name);
        },
      }
    );
  }
  const MaterialIconsPack = {
    name: "material",
    icons: createIconsMap(),
  };

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <IconRegistry icons={[MaterialIconsPack]} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          {hideSplashScreen ? (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="PantallaInicial"
                component={PantallaInicial}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="NuevoContrato"
                component={NuevoContrato}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Lista"
                key={"Lista_" + listaKey}
                component={Lista}
                options={{ headerShown: false }}
                listeners={{ focus: () => refreshLista() }}
              />
              <Stack.Screen
                name="Info"
                component={Info}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Firmar"
                component={Firmar}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          ) : null}
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};
export default App;

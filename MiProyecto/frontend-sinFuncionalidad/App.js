const Stack = createNativeStackNavigator();
import "./global";
import "react-native-get-random-values";
import Web3 from "web3";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import PantallaInicial from "./screens/PantallaInicial";
import Info from "./screens/Info";
import Lista from "./screens/Lista";
import SignIn from "./screens/SignIn";
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

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState();

  useEffect(() => {
    async function load() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert(
          "No se detectó ningún proveedor de Ethereum. Por favor, instala MetaMask en tu navegador."
        );
      }

      const web3 = window.web3;
      const accounts = await web3.eth.requestAccounts();
      const ownerAddress = accounts[0];

      setWeb3(web3);
      setAccount(ownerAddress);
      console.log(account);
    }

    load();
  }, []);

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
                name="Info"
                component={Info}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Lista"
                component={Lista}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="NuevoContrato"
                component={NuevoContrato}
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

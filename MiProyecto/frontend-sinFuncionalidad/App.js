const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import PantallaInicial from "./screens/PantallaInicial";
import ContentRow from "./components/ContentRow";
import ContentRow1 from "./components/ContentRow1";
import ContentRow2 from "./components/ContentRow2";
import ContentRow3 from "./components/ContentRow3";
import ContentRow4 from "./components/ContentRow4";
import ContentRow5 from "./components/ContentRow5";
import ContentRow6 from "./components/ContentRow6";
import ContentRow7 from "./components/ContentRow7";
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
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

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

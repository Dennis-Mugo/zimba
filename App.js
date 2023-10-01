import { StatusBar, StyleSheet, Text, View } from "react-native";
import MainNavigator from "./navigation/MainNavigator";
import AppNavigator from "./navigation/AppNavigator";
import { ZimbaProvider } from "./context/context";
import { useFonts } from "expo-font";
import fonts from "./constants/fonts";
import { useCallback } from "react";
import CustomColors from "./constants/colors";

export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <StatusBar />
      <ZimbaProvider>
        <AppNavigator />
      </ZimbaProvider>
    </>
  );
}

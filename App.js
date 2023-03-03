import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { registerRootComponent } from "expo";
import PreLoader from "./screens/PreLoader";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import TabNav from "./components/TabNav";
import AppContext from "./components/AppContext";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <AppContext>
      <StatusBar style="dark" className="bg-[#ff3131]" />
      {loading ? <PreLoader setLoading={setLoading} /> : <TabNav />}
    </AppContext>
  );
}

// AppRegistry.registerComponent("Appname", () => App);
// registerRootComponent(App);

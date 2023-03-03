import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import DownloadsScreen from "../screens/DownloadsScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import StackNav from "./StackNav";
import SearchStacks from "./SearchStacks";
import { AppState } from "./AppContext";

const TabNav = () => {
  const Tab = createBottomTabNavigator();
  const { state } = useContext(AppState);
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "ios-home" : "ios-home-outline";
            } else if (route.name === "Search") {
              iconName = focused ? "ios-search" : "ios-search-outline";
            } else if (route.name === "Downloads") {
              iconName = focused ? "download" : "download-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "black",
          tabBarStyle: {
            backgroundColor: "#ff3131",
            height: 60,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={StackNav}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchStacks}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Downloads"
          component={DownloadsScreen}
          options={{
            tabBarBadge: state.downloads.length,
            tabBarBadgeStyle: { backgroundColor: "black" },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNav;

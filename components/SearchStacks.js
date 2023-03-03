import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../screens/SearchScreen";
import SearchResult from "../screens/SearchResult";

const SearchStacks = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="SearchResult" component={SearchResult} />
    </Stack.Navigator>
  );
};

export default SearchStacks;

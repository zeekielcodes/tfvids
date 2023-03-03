import { View, Text, TextInput } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import * as Progress from "react-native-progress";

const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const searchMovie = () => {
    setSearching(true);
    axios
      .get(`https://tfvids.onrender.com/search?query=${search}&engine=fzmovies`)
      .then((response) => {
        navigation.navigate("SearchResult", { response, search });
        setSearching(false);
      })
      //   .then((data) => setMovies(data))
      .catch((error) => console.log(error));
  };

  return (
    <View className="flex-1 bg-black">
      <View className="h-[100px] relative p-4 bg-[#ff3131]">
        <TextInput
          placeholder="Search a movie"
          className="w-full h-[40px] px-2 absolute bottom-2 left-2 right-2 placeholder:text-white text-white font-Pop text-base"
          value={search}
          clearButtonMode="always"
          onEndEditing={searchMovie}
          onChangeText={(e) => setSearch(e)}
        />
      </View>
      <View className="flex-1 justify-center items-center">
        {searching ? (
          <Progress.CircleSnail
            className=""
            indeterminate={true}
            size={50}
            color={["white", "#ff3131", "green"]}
          />
        ) : (
          <Ionicons name="search" size={150} color="gray" />
        )}
      </View>
    </View>
  );
};

export default SearchScreen;

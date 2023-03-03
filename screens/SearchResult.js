import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import SingleMovie from "../components/SingleMovie";
import axios from "axios";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as Progress from "react-native-progress";

const SearchResult = ({ navigation }) => {
  const [searchMovie, setSearchResult] = useState([]);
  const [page, setPage] = useState(1);

  const {
    params: { response, search },
  } = useRoute();

  console.log(response.data);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Search Results for ${search}`,
      headerStyle: {
        backgroundColor: "#ff3131",
      },
    });
  }, []);

  useEffect(() => {
    console.log(response.data);
    const passed = response.data.filter((item) => item.Title);
    setSearchResult(passed);
  }, []);

  //   useEffect(() => {
  //     fetch(`https://tfvids.onrender.com/search?query=${search}&page=${page}`)
  //       .then((response) => console.log(response))
  //       //   .then((data) => setMovies(data))
  //       .catch((error) => console.log(error));
  //   }, [page]);

  if (searchMovie.length < 1) {
    return (
      <View className="flex-1 bg-black p-4 justify-center items-center">
        <Text className="text-white text-lg font-Pop">
          No search result for "{search}"
        </Text>
        {/* <TouchableOpacity className="bg-[#ff3131] px-4 py-2 mt-4 rounded">
          <Text className="text-lg text-white">Deeper search</Text>
        </TouchableOpacity> */}
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black p-4 justify-center items-center">
      <FlatList
        data={searchMovie}
        renderItem={({ item }) => <SingleMovie movie={item} />}
        keyExtractor={(item) => item.Index}
        numColumns={2}
        ListEmptyComponent={
          <View className="items-center p-6 justify-between flex-1">
            <Progress.Circle
              className=""
              indeterminate={true}
              size={50}
              color={["#ff3131", "green", "blue"]}
            />
          </View>
        }
        onEndReached={() => setPage(page + 1)}
      />
    </View>
  );
};

export default SearchResult;

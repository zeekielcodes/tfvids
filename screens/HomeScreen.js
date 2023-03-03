import { SafeAreaView, ScrollView, FlatList, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleMovie from "../components/SingleMovie";
import Trending from "../components/Trending";
import * as Progress from "react-native-progress";

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://tfvids-node.onrender.com/getData/?page=${page}&engine=nkiri,fzmovies`
      )
      .then((response) => setMovies(response.data))

      .catch((error) => console.log(error));
  }, [page]);
  return (
    <SafeAreaView className="bg-black flex-1">
      <View className="p-4 flex-1">
        <Text className="text-xl mb-4 font-Pop text-white">Movies List</Text>

        <FlatList
          data={movies}
          renderItem={({ item }) => <SingleMovie movie={item} />}
          keyExtractor={(item) => item.Index}
          numColumns={2}
          onEndReached={() => setPage(page + 1)}
          ListEmptyComponent={
            <View className="items-center p-6 justify-between flex-1">
              <Progress.CircleSnail
                className=""
                indeterminate={true}
                size={50}
                color={["white", "#ff3131", "green"]}
              />
            </View>
          }
        />
        {/* <Trending /> */}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

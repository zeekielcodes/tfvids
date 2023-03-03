import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const SingleMovie = ({ movie }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Movie", { movie })}>
      <View className="w-[150px] h-[200px] mx-2 my-2 rounded-md overflow-hidden">
        <Image
          source={{
            uri: movie.CoverPhotoLink,
          }}
          className="w-full h-[200px]"
        />
        <Text className="bg-gray-400 text-black rounded-md px-2 py-1 text-sm uppercase absolute bottom-2 left-2">
          {movie.Size}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SingleMovie;

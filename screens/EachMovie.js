import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Platform,
  PermissionsAndroid,
  Image,
} from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppState } from "../components/AppContext";

const EachMovie = ({ navigation }) => {
  const { dispatch } = useContext(AppState);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const {
    params: { movie },
  } = useRoute();

  const downloadMovie = async () => {
    // const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    // if (status !== "granted") {
    //   alert("Sorry, we need permissions to make this work!");
    // }
    dispatch({ type: "startDownload", payload: movie });
  };

  return (
    <View className="flex-1 bg-black">
      <Image
        source={{
          uri: movie.CoverPhotoLink,
        }}
        className="h-1/2 w-full object-center object-fill"
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="h-[40px] w-[40px] bg-[#ff3131] justify-center items-center rounded-full absolute top-8 left-3"
      >
        <Ionicons name="arrow-back-sharp" size={30} color="black" />
      </TouchableOpacity>
      <ScrollView className="flex-1">
        <Text className="text-2xl mt-3 text-white font-Pop mx-4">
          {movie.Title}
        </Text>
        <Text className="text-base my-3 text-white font-Pop mx-4">
          {movie.Description}
        </Text>
        <Text className="text-base text-white font-Pop mx-4">
          Size: {movie.Size}
        </Text>
        <Text className="text-base text-white font-Pop mx-4 my-3">
          Uploaded: {movie.UploadDate}
        </Text>
        <Text className="bg-[#ff3131] mx-4 mb-3 text-black font-Pop p-2 justify-self-start self-start rounded-md">
          {movie.Source}
        </Text>
        <View className="mx-4">
          <TouchableOpacity
            onPress={downloadMovie}
            className="w-full justify-center items-center bg-white rounded-sm h-[40px]"
          >
            <Text className="text-lg justify-center items-center text-black font-Pop">
              <Ionicons name="download" size={30} color="black" /> Download
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default EachMovie;

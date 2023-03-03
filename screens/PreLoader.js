import { View, SafeAreaView, Text, Image } from "react-native";
import React, { useEffect } from "react";
import * as Progress from "react-native-progress";

const PreLoader = ({ setLoading }) => {
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-black justify-center items-center">
      <Image
        source={require("../assets/logo.png")}
        className="h-[250px] w-[250px]"
      />
      <View className="absolute bottom-12 items-center space-y-6">
        <Progress.Pie
          className=""
          indeterminate={true}
          size={50}
          color={"#ff3131"}
        />
        <Text className="text-white font-Pop">
          &copy; {new Date().getFullYear()} Powered by The Face
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default PreLoader;

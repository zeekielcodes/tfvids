import { View, Text, FlatList } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { AppState } from "../components/AppContext";
import DownloadItem from "../components/DownloadItem";

const DownloadsScreen = ({ navigation }) => {
  const { state } = useContext(AppState);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Downloads",
      headerStyle: {
        backgroundColor: "#ff3131",
      },
    });
  }, []);

  const Separate = () => {
    return <View className="my-1"></View>;
  };
  return (
    <View className="p-4 flex-1 bg-black">
      <FlatList
        data={state.downloads}
        renderItem={({ item }) => <DownloadItem info={item} />}
        keyExtractor={(item) => item.Index}
        ItemSeparatorComponent={Separate}
      />
    </View>
  );
};

export default DownloadsScreen;

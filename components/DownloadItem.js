import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Platform,
  PermissionsAndroid,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import * as Progress from "react-native-progress";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState } from "./AppContext";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

const DownloadItem = ({ info }) => {
  const [downloadProgress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pauseText, setText] = useState("Downloading...");
  const { dispatch } = useContext(AppState);
  console.log(downloadProgress);
  //   const downloadFile = () => {
  //     const uri = "http://techslides.com/demos/sample-videos/small.mp4";
  //     let fileUri = FileSystem.documentDirectory + "small.mp4";
  //     FileSystem.downloadAsync(uri, fileUri)
  //       .then(({ uri }) => {
  //         this.saveFile(uri);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   };

  //   saveFile = async (fileUri) => {
  //     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //     if (status === "granted") {
  //       const asset = await MediaLibrary.createAssetAsync(fileUri);
  //       await MediaLibrary.createAlbumAsync("Download", asset, false);
  //     }
  //   };

  //.............................

  const callback = (downloadProgress) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setProgress((progress * 100).toFixed(0));
  };

  const downloadResumable = useRef(
    FileSystem.createDownloadResumable(
      `${info.DownloadLink}`,
      FileSystem.documentDirectory + `${info.Title}`,
      {},
      callback
    )
  );

  const download = async () => {
    try {
      const { uri } = await downloadResumable.current.downloadAsync();
      console.log("Finished downloading to ", uri);
      setText("Downloading...");
      const asset = await MediaLibrary.createAssetAsync(uri);
      const downloadFolder = await MediaLibrary.getAlbumAsync("Download");
      await MediaLibrary.addAssetsToAlbumAsync(asset, downloadFolder, false);
      console.log("Saved to media library:", asset);
    } catch (e) {
      console.error(e);
    }
  };

  const pauseDownload = async () => {
    try {
      await downloadResumable.current.pauseAsync();
      setPaused(true);
      setText("Download paused.");
      console.log("Paused download operation, saving for future retrieval");
      const savable = downloadResumable.savable();
      console.log("Download resumable savable:", savable);
      AsyncStorage.setItem("pausedDownload", JSON.stringify(savable));
      //   AsyncStorage.setItem(
      //     "pausedDownload",
      //     JSON.stringify(downloadResumable.current.savable())
      //   );
    } catch (e) {
      console.error(e);
    }
  };

  const resumeDownload = async () => {
    try {
      //   const downloadSnapshotJson = await AsyncStorage.getItem("pausedDownload");
      //   if (downloadSnapshotJson) {
      //     const downloadSnapshot = JSON.parse(downloadSnapshotJson);
      //     downloadResumable = new FileSystem.DownloadResumable(
      //       downloadSnapshot.url,
      //       downloadSnapshot.fileUri,
      //       downloadSnapshot.options,
      //       callback,
      //       downloadSnapshot.resumeData
      //     );
      const { uri } = await downloadResumable.current.resumeAsync();
      setPaused(false);
      setText("Downloading...");
      console.log("Finished downloading to ", uri);
      const asset = await MediaLibrary.createAssetAsync(uri);
      const downloadFolder = await MediaLibrary.getAlbumAsync("Download");
      await MediaLibrary.addAssetsToAlbumAsync(asset, downloadFolder, false);
      console.log("Saved to media library:", asset);

      // try {
      //   const { uri } = await downloadResumable.current.resumeAsync();
      //   console.log("Finished downloading to ", uri);
    } catch (e) {
      console.error(e);
    }
  };

  const cancelDownload = async () => {
    await downloadResumable.current.cancelAsync();
    setText("Download cancelled.");
    // dispatch({ type: "cancelDownload", payload: info });
    console.log("Canceled:", uri);
  };

  //To resume a download across app restarts, assuming the the DownloadResumable.savable() object was stored:
  const continueDownload = async () => {
    const downloadSnapshotJson = await AsyncStorage.getItem("pausedDownload");
    const downloadSnapshot = JSON.parse(downloadSnapshotJson);
    const downloadResumable = new FileSystem.DownloadResumable(
      downloadSnapshot.url,
      downloadSnapshot.fileUri,
      downloadSnapshot.options,
      callback,
      downloadSnapshot.resumeData
    );
    try {
      const { uri } = await downloadResumable.resumeAsync();
      console.log("Finished downloading to ", uri);
    } catch (e) {
      console.error(e);
    }
  };

  //   const downloadDirectory = FileSystem.documentDirectory + "Download/";
  //   const downloadPath = FileSystem.documentDirectory + "small.mp4";

  //   const downloadResumable = FileSystem.createDownloadResumable(
  //     "http://techslides.com/demos/sample-videos/small.mp4",
  //     downloadPath,
  //     {},
  //     callback
  //   );

  //   const download = async () => {
  //     try {
  //       const dirInfo = await FileSystem.getInfoAsync(downloadDirectory);
  //       if (!dirInfo.exists) {
  //         await FileSystem.makeDirectoryAsync(downloadDirectory, {
  //           intermediates: true,
  //         });
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }

  // downloadResumable = FileSystem.createDownloadResumable(
  //   "http://techslides.com/demos/sample-videos/small.mp4",
  //   downloadPath,
  //   {},
  //   callback
  // );

  //     try {
  //       const { uri } = await downloadResumable.downloadAsync();
  //       console.log("Finished downloading to ", uri);
  // const asset = await MediaLibrary.createAssetAsync(uri);
  // await MediaLibrary.createAlbumAsync("Download", asset, false);
  // console.log("Saved to media library:", asset);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };

  //   const pauseDownload = async () => {
  //     try {
  //       await downloadResumable.pauseAsync();
  //       console.log("Paused download operation, saving for future retrieval");
  //       const savable = downloadResumable.savable();
  //       console.log("Download resumable savable:", savable);
  //       AsyncStorage.setItem("pausedDownload", JSON.stringify(savable));
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };

  //   const resumeDownload = async () => {
  //   try {
  //     const downloadSnapshotJson = await AsyncStorage.getItem("pausedDownload");
  //     if (downloadSnapshotJson) {
  //       const downloadSnapshot = JSON.parse(downloadSnapshotJson);
  //       downloadResumable = new FileSystem.DownloadResumable(
  //         downloadSnapshot.url,
  //         downloadSnapshot.fileUri,
  //         downloadSnapshot.options,
  //         callback,
  //         downloadSnapshot.resumeData
  //       );
  //       const { uri } = await downloadResumable.resumeAsync();
  //       console.log("Finished downloading to ", uri);
  //       const asset = await MediaLibrary.createAssetAsync(uri);
  //       const downloadFolder = await MediaLibrary.getAlbumAsync("Download");
  //       await MediaLibrary.addAssetsToAlbumAsync(
  //         [asset],
  //         downloadFolder,
  //         false
  //       );
  //       console.log("Saved to media library:", asset);
  //     }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };

  useEffect(() => {
    console.log("This", downloadResumable);
    download();
  }, []);

  //   const downloadFile = async () => {

  //     //To resume a download across app restarts, assuming the the DownloadResumable.savable() object was stored:
  //     const downloadSnapshotJson = await AsyncStorage.getItem("pausedDownload");
  //     const downloadSnapshot = JSON.parse(downloadSnapshotJson);
  //     var downloadResumable = new FileSystem.DownloadResumable(
  //       downloadSnapshot.url,
  //       downloadSnapshot.fileUri,
  //       downloadSnapshot.options,
  //       callback,
  //       downloadSnapshot.resumeData
  //     );

  //     try {
  //       const { uri } = await downloadResumable.resumeAsync();
  //       console.log("Finished downloading to ", uri);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };

  //   const pauseDownload = async () => {
  //     // const { uri } = await downloadResumable.pauseAsync();
  //     try {
  //       await downloadResumable.pauseAsync();
  //       console.log("Paused download operation, saving for future retrieval");
  //       AsyncStorage.setItem(
  //         "pausedDownload",
  //         JSON.stringify(downloadResumable.savable())
  //       );
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };

  //   const resumeDownload = async () => {
  //     try {
  //       const { uri } = await downloadResumable.resumeAsync();
  //       console.log("Finished downloading to ", uri);
  //       // Save the downloaded file to the device's media library
  //       const asset = await MediaLibrary.createAssetAsync(uri);
  //       const downloadFolder = await MediaLibrary.getAlbumAsync("Download");
  //       await MediaLibrary.addAssetsToAlbumAsync([asset], downloadFolder, false);
  //       console.log("Saved to media library:", asset);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };

  //   const Separator = () => <View style={styles.itemSeparator} />;
  const LeftSwipeActions = () => {
    return (
      <View className="flex-1 justify-center p-3 bg-white w-full rounded-md">
        <Text className="text-2xl font-bold font-Pop">Delete</Text>
      </View>
    );
  };
  const rightSwipeActions = () => {
    return (
      <View
        style={{
          backgroundColor: "#ff8303",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            color: "#1b1a17",
            paddingHorizontal: 10,
            fontWeight: "600",
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}
        >
          Delete
        </Text>
      </View>
    );
  };
  const swipeFromLeftOpen = () => {
    dispatch({ type: "cancelDownload", payload: info });
  };
  const swipeFromRightOpen = () => {
    alert("Swipe from right");
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderLeftActions={LeftSwipeActions}
        // renderRightActions={rightSwipeActions}
        // onSwipeableRightOpen={swipeFromRightOpen}
        onSwipeableLeftOpen={swipeFromLeftOpen}
      >
        <View className="h-[100px] rounded overflow-hidden flex-row space-x-2 items-center bg-[#ff3131] w-full">
          <Image
            source={{
              uri: info.CoverPhotoLink,
            }}
            className="h-full w-[100px]"
          />
          <View className="flex-1">
            <Text className="font-Pop text-lg">{info.Title}</Text>
            <Progress.Bar
              className="my-2"
              progress={downloadProgress / 100}
              size={50}
              color="black"
            />
            <View className="flex-row w-full justify-between items-center">
              <Text className="font-Pop text-sm text-gray-300">
                {downloadProgress < 100 && pauseText}{" "}
                {downloadProgress === 100 && "Download complete."}
              </Text>
              <Text className="font-Pop text-sm text-gray-300">
                {downloadProgress}%
              </Text>
            </View>
          </View>
          <View className="p-1">
            {!paused ? (
              <TouchableOpacity onPress={pauseDownload}>
                <Ionicons name="pause-circle-sharp" size={30} color="black" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={resumeDownload}>
                <Ionicons name="play-circle-sharp" size={30} color="black" />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={cancelDownload}>
              <Ionicons name="close-circle-sharp" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default DownloadItem;

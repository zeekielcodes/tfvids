import { View, Text } from "react-native";
import React, { useEffect } from "react";

const Trending = () => {
  //   useEffect(() => {
  // fetch("https://tfvidss.onrender.com/getData/?page=1&engine=fzmovies")
  //   .then((resp) => resp.json())
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((error) => console.log(error));
  // fetch("https://tfvids.onrender.com/download/highest/", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //       body: JSON.stringify({
  //         filter_by: "weeks",
  //         filter_num: 4,
  //         top: 10,
  //       }),
  //     })
  //       .then((resp) => resp.json())
  //       .then((data) => console.log(data))
  //       .catch((error) => console.log(error));
  //   }, []);
  return (
    <View>
      <Text>Trending</Text>
    </View>
  );
};

export default Trending;

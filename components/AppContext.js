import { View, Text } from "react-native";
import React, { createContext, useReducer } from "react";

export const AppState = createContext();

const initial = {
  downloads: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "startDownload":
      return {
        ...state,
        downloads: [...state.downloads, action.payload],
      };

    case "cancelDownload":
      const updatedList = state.downloads.filter(
        (item) => item.Index !== action.payload.Index
      );
      return {
        ...state,
        downloads: updatedList,
      };
  }
};

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);
  const shared = { state, dispatch };
  return <AppState.Provider value={shared}>{children}</AppState.Provider>;
};

export default AppContext;

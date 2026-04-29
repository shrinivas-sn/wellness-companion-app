import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export function useAsyncStorage(key) {
  const [data, setData] = useState(null);

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue !== null) {
        setData(JSON.parse(jsonValue));
      } else {
        setData(null);
      }
    } catch (e) {
      console.error("Error loading data", e);
    }
  };

  const saveData = async (newValue) => {
    try {
      const jsonValue = JSON.stringify(newValue);
      await AsyncStorage.setItem(key, jsonValue);
      setData(newValue);
    } catch (e) {
      console.error("Error saving data", e);
    }
  };

  return { data, loadData, saveData };
}

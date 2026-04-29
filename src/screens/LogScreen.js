import * as ImagePicker from "expo-image-picker";
import { useCallback, useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet } from "react-native";
import { useAsyncStorage } from "../hooks/useAsyncStorage";
import CustomButton from "../components/CustomButton";
import InputText from "../components/InputText";
import MoodPicker from "../components/MoodPickerEmoji";
import ScreenWrapper from "../components/ScreenWrapper";

export default function LogScreen() {
  const [steps, setSteps] = useState("");
  const [water, setWater] = useState("");
  const [sleep, setSleep] = useState("");
  const [mood, setMood] = useState("");
  const [photo, setPhoto] = useState(null);

  const { data, loadData, saveData } = useAsyncStorage("wellness_logs");

  useEffect(() => {
    loadData();
  }, []);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Denied",
        "We need access to your camera roll to add a photo!",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!steps || !water || !sleep || !mood) {
      Alert.alert("Hold on!", "Please fill out all fields and pick a mood.");
      return;
    }

    const newEntry = {
      steps,
      water,
      sleep,
      mood,
      photo,
      date: new Date().toISOString(),
    };

    const updatedLogs = data ? [...data, newEntry] : [newEntry];
    saveData(updatedLogs);

    Alert.alert("Success!", "Data saved for today.");

    setSteps("");
    setWater("");
    setSleep("");
    setMood("");
    setPhoto(null);
  };

  return (
    <ScreenWrapper>
      <ScrollView style={styles.inputform}>
        <InputText
          placeholder="Enter daily steps"
          onChangeText={setSteps}
          value={steps}
          keyboardType="numeric"
        />
        <InputText
          placeholder="Enter water intake"
          onChangeText={setWater}
          value={water}
          keyboardType="numeric"
        />
        <InputText
          placeholder="Enter sleep hours"
          onChangeText={setSleep}
          value={sleep}
          keyboardType="numeric"
        />

        <MoodPicker mood={mood} setMood={setMood} />

        <CustomButton title="Pick an Optional Photo" onPress={pickImage} />

        {photo && <Image source={{ uri: photo }} style={styles.imagePreview} />}

        <CustomButton title="Save Data" onPress={handleSave} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  inputform: {
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    margin: 10,
    width: "90%",
  },
  imagePreview: {
    width: 200,
    height: 200,
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});

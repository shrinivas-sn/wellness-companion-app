import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import InputText from "../components/InputText";
import ScreenWrapper from "../components/ScreenWrapper";
import { useAsyncStorage } from "../hooks/useAsyncStorage";

export default function SettingsScreen() {
  const [name, setName] = useState("");
  const [stepsGoal, setStepsGoal] = useState("");
  const [waterGoal, setWaterGoal] = useState("");
  const [sleepGoal, setSleepGoal] = useState("");

  const { data, loadData, saveData } = useAsyncStorage("user_settings");

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setStepsGoal(data.stepsGoal || "");
      setWaterGoal(data.waterGoal || "");
      setSleepGoal(data.sleepGoal || "");
    }
  }, [data]);

  const handleSave = () => {
    if (!name) {
      Alert.alert("Missing Info", "Please enter your name.");
      return;
    }
    const settings = { name, stepsGoal, waterGoal, sleepGoal };
    saveData(settings);
    Alert.alert("Saved!", `Welcome, ${name}! Your goals have been updated.`);
  };

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👤 User Profile</Text>
          <InputText
            placeholder="Enter your name"
            onChangeText={setName}
            value={name}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Daily Goals</Text>
          <Text style={styles.label}>Steps Goal</Text>
          <InputText
            placeholder="e.g. 10000"
            onChangeText={setStepsGoal}
            value={stepsGoal}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Water Goal (glasses)</Text>
          <InputText
            placeholder="e.g. 8"
            onChangeText={setWaterGoal}
            value={waterGoal}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Sleep Goal (hours)</Text>
          <InputText
            placeholder="e.g. 8"
            onChangeText={setSleepGoal}
            value={sleepGoal}
            keyboardType="numeric"
          />
        </View>

        <CustomButton title="Save Settings" onPress={handleSave} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  section: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginLeft: 10,
    marginTop: 6,
  },
});

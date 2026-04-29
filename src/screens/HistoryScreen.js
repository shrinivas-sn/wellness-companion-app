import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useAsyncStorage } from "../hooks/useAsyncStorage";

export default function HistoryScreen() {
  const { data, loadData, saveData } = useAsyncStorage("wellness_logs");

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const handleDelete = (indexToDelete) => {
    const newData = data.filter((_, index) => index !== indexToDelete);
    saveData(newData);
  };

  // This is the red button that appears when you swipe left
  const renderRightActions = (index) => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(index)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  const renderLogItem = ({ item, index }) => (
    <Swipeable renderRightActions={() => renderRightActions(index)}>
      <View style={styles.card}>
        <Text style={styles.dateText}>
          Date: {new Date(item.date).toLocaleDateString()}
        </Text>
        <Text>Mood: {item.mood}</Text>
        <Text>Steps: {item.steps}</Text>
        <Text>Sleep: {item.sleep} hrs</Text>
        <Text>Water: {item.water} glasses</Text>
      </View>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      {!data || data.length === 0 ? (
        <Text style={styles.emptyText}>No history yet. Go log something!</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderLogItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  emptyText: { textAlign: "center", marginTop: 50, fontSize: 16 },
  card: {
    padding: 15,
    backgroundColor: "white",
    marginBottom: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  dateText: { fontWeight: "bold", marginBottom: 5 },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    marginBottom: 5,
    borderRadius: 8,
  },
  deleteText: { color: "white", fontWeight: "bold" },
});

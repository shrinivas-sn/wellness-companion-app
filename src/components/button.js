import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CustomButton({ title }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eff",
  },
  buttonContainer: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    backgroundColor: "#d68686ff",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

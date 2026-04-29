import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function MotivationalQuote() {
  const [quote, setQuote] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getQuoteFromTheInternet();
  }, []);

  const getQuoteFromTheInternet = async () => {
    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      const data = await response.json();

      setQuote(data.quote);
    } catch (error) {
      setQuote("Stay hydrated and sleep well today!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Quote</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#d68686ff" />
      ) : (
        <Text style={styles.quoteText}>"{quote}"</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textDecorationLine: "underline",
  },

  container: {
    padding: 10,
    marginVertical: 15,
    backgroundColor: "#87ef74ff",
    borderRadius: 10,
    width: "90%",
    minHeight: 80,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    elevation: 5,
    shadowColor: "#43b141ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },

  quoteText: {
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "times-new-roman",
    textAlign: "center",
    color: "#555",
  },
});

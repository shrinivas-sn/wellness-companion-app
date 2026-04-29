import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import MotivationalQuote from "../components/MotivationalQuote";
import ScreenWrapper from "../components/ScreenWrapper";
import { useAsyncStorage } from "../hooks/useAsyncStorage";

export default function HomeScreen() {
  const { data: allLogs, loadData } = useAsyncStorage("wellness_logs");
  const [todayLog, setTodayLog] = useState(null);
  const [streak, setStreak] = useState(0);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  useEffect(() => {
    if (!allLogs || allLogs.length === 0) return;

    const todayString = new Date().toLocaleDateString();
    const foundToday = allLogs.find(
      (log) => new Date(log.date).toLocaleDateString() === todayString,
    );
    setTodayLog(foundToday || null);

    const uniqueDates = [
      ...new Set(allLogs.map((log) => new Date(log.date).toLocaleDateString())),
    ];

    let currentStreak = 0;
    let checkDate = new Date();

    for (let i = 0; i < uniqueDates.length; i++) {
      const dateString = checkDate.toLocaleDateString();
      if (uniqueDates.includes(dateString)) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    setStreak(currentStreak);
  }, [allLogs]); // <-- Runs every time allLogs array updates

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.streakCard}>
          <Text style={styles.streakNumber}>{streak} 🔥</Text>
          <Text style={styles.streakLabel}>Day Streak</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Today's Summary</Text>
          {todayLog ? (
            <View>
              <Text style={styles.stat}>👟 Steps: {todayLog.steps}</Text>
              <Text style={styles.stat}>
                💧 Water: {todayLog.water} glasses
              </Text>
              <Text style={styles.stat}>😴 Sleep: {todayLog.sleep} hrs</Text>
              <Text style={styles.stat}>😊 Mood: {todayLog.mood}</Text>
            </View>
          ) : (
            <Text style={styles.emptyText}>
              No entry yet today. Head to the Log tab to log your wellness!
            </Text>
          )}
        </View>

        <MotivationalQuote />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
  },
  streakCard: {
    backgroundColor: "#fff3e0",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    width: "90%",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ffcc80",
    elevation: 3,
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#e65100",
  },
  streakLabel: {
    fontSize: 16,
    color: "#bf360c",
    fontWeight: "600",
  },
  summaryCard: {
    backgroundColor: "#e8f5e9",
    borderRadius: 16,
    padding: 20,
    width: "90%",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#a5d6a7",
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1b5e20",
    marginBottom: 10,
  },
  stat: {
    fontSize: 16,
    color: "#2e7d32",
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    color: "#555",
    fontStyle: "italic",
    textAlign: "center",
  },
});

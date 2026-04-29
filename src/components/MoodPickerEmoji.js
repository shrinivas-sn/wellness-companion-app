import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MoodPickerEmoji({ mood, setMood }) {
  const emojis = ["😢", "😐", "😊", "🔥"];

  return (
    <View>
      <Text style={styles.moodTitle}>How are you feeling?</Text>
      <View style={styles.emojiRow}>
        {emojis.map((emoji) => (
          <TouchableOpacity key={emoji} onPress={() => setMood(emoji)}>
            <Text style={[styles.emoji, { opacity: mood === emoji ? 1 : 0.4 }]}>
              {emoji}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  moodTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    color: "#333",
  },
  emojiRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    marginBottom: 10,
  },
  emoji: {
    fontSize: 40,
  },
});

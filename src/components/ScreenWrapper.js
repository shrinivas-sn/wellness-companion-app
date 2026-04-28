import { StyleSheet, View } from "react-native";
export default function ScreenWrapper({ children }) {
  return <View style={styles.screen}>{children}</View>;
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#eff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

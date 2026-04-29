import { StyleSheet, TextInput, View } from "react-native";
export default function InputText({
  value,
  onChangeText,
  placeholder,
  keyboardType,
}) {
  return (
    <View>
      <TextInput
        style={style.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const style = StyleSheet.create({
  input: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    color: "black",
    fontSize: 15,
    minWidth: 200,
    fontFamily: "monospace",
    textAlign: "center",
    fontWeight: "bold",
  },
});

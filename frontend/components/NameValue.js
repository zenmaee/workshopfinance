import * as React from "react";
import { Text, StyleSheet } from "react-native";

const NameValue = ({ nameValue }) => {
  return <Text style={styles.nameValue}>{nameValue}</Text>;
};

const styles = StyleSheet.create({
  nameValue: {
    position: "absolute",
    top: 51,
    left: 126,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "Avenir Next",
    color: "#fff",
    textAlign: "left",
  },
});

export default NameValue;

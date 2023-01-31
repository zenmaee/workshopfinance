import * as React from "react";
import { Text, StyleSheet } from "react-native";

const EmailAddressValue = ({ emailAddressValue }) => {
  return <Text style={styles.emailAddressValue}>{emailAddressValue}</Text>;
};

const styles = StyleSheet.create({
  emailAddressValue: {
    position: "absolute",
    top: 81,
    left: 126,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "Avenir Next",
    color: "#fff",
    textAlign: "left",
  },
});

export default EmailAddressValue;

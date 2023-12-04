import { View, Text, StyleSheet } from "react-native";
import React from "react";
function transaction({ description, amount, datet, credited }) {
  return (
    <View
      style={{
        marginBottom: 3,
        marginTop: 3,
        display: "flex",
        flexDirection: "column",
        borderBottomWidth: 2,
        borderBottomColor: "#1D2D44",
      }}
    >
      <View style={styles.icard}>
        <Text style={styles.desc}>{description}</Text>
        <Text
          style={{ ...styles.amount, color: credited ? "green" : "#F0EBD8" }}
        >
          {credited ? "+" : "-"}
          {amount}
        </Text>
      </View>

      <View style={styles.jcard}>
        <Text style={styles.datet}>{datet.substring(-1, 15, 0)}</Text>
      </View>
    </View>
  );
}

export default transaction;
const styles = StyleSheet.create({
  icard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  jcard: {
    display: "flex",
    flexDirection: "row-reverse",
    paddingRight: 9,
  },
  desc: {
    fontSize: 18,
    marginLeft: 5,

    color: "#F0EBD8",
  },
  amount: {
    fontSize: 16,
    marginRight: 9,
  },
  datet: {
    fontStyle: "italic",
    paddingRight: 2,
  },
});

import React from "react";
import { Text, View, StyleSheet } from "react-native";
import CustomColors from "../constants/colors";

const Divider = ({ text, style }) => {
  return (
    <View style={[style, styles.container]}>
      <View style={styles.line} />
      {text && <Text style={styles.text}>{text}</Text>}
      <View style={styles.line} />
    </View>
  );
};

export default Divider;

const styles = 
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
    },
    line: {
      borderWidth: 0.5,
      borderColor: CustomColors.greyScale400,
      flex: 1,
    },
    text: {
      color: CustomColors.greyScale700,
      marginHorizontal: 10,
      
      fontFamily: "mooli",
    },
  });

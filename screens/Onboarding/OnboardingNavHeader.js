import React from "react";
import { View, Image, StyleSheet } from "react-native";
import logo from "../images/Logo.png";

export default function OnboardingNavHeader() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 30,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  logo: {
    resizeMode: "contain",
    height: 70,
    width: 200,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

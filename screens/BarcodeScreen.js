// screens/HomeScreen.js
import React from "react";
import { View, Text, Button } from "react-native";

const BarcodeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>BarcodeScreen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("HomeScreen")}
      />
    </View>
  );
};

export default BarcodeScreen;

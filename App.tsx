import auth from "@react-native-firebase/auth";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState("");

  const signInWithPhone = async (phoneNumber: string) => {
    console.log("clickie click");
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  };

  const confirmCode = async () => {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log("Invalid code.");
    }
  };

  if (!confirm) {
    return (
      <View style={styles.container}>
        <Text style={styles.item}>Test firebase phone sign in</Text>
        <Button
          color={"#78A0D4"}
          title={"Phone number sign in"}
          onPress={() => signInWithPhone("")}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput value={code} onChangeText={(text: string) => setCode(text)} />
      <Button
        color={"#3E9458"}
        title="Confirm Code"
        onPress={() => confirmCode()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    marginBottom: 8,
    color: "#222222",
  },
});

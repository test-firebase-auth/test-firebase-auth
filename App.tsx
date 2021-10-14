import auth from "@react-native-firebase/auth";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const testPhoneNumber = "+16505551234";

  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(testPhoneNumber);
  const [signedIn, setSignedIn] = useState(false);

  const cleanup = () => {
    setConfirm(null);
    setCode("");
    setSignedIn(false);
    setPhoneNumber(testPhoneNumber);
  };

  const signInWithPhone = async (phoneNumber: string) => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.log("Error during phone signing: ", error);
    }
  };

  const confirmCode = async () => {
    try {
      await confirm.confirm(code);
      setSignedIn(true);
    } catch (error) {
      console.log("Code confirmation error: ", error);
    }
  };

  if (signedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.item}>{`Signed in with phone ${phoneNumber}`}</Text>
        <Button color={"#CFBD3A"} title={"Again"} onPress={cleanup} />
      </View>
    );
  }

  if (confirm) {
    return (
      <View style={styles.container}>
        <Text style={styles.tip}>Test code: 123456</Text>
        <TextInput
          style={styles.input}
          value={code}
          onChangeText={(text: string) => setCode(text)}
        />
        <Button
          color={"#3E9458"}
          title="Confirm Code"
          onPress={() => confirmCode()}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tip}>{`Test number: ${testPhoneNumber}`}</Text>
      <Text style={styles.item}>Test firebase phone sign in</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={(text: string) => setPhoneNumber(text)}
      />
      <Button
        color={"#78A0D4"}
        title={"Phone number sign in"}
        onPress={() => signInWithPhone(phoneNumber)}
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
  input: {
    backgroundColor: "#F7F7F7",
    height: 36,
    width: "36%",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#555555",
    padding: 10,
  },
  item: {
    marginBottom: 8,
    color: "#222222",
  },
  tip: {
    marginBottom: 4,
    fontSize: 8,
    color: "#999999",
  },
});

import "./global";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Web3 from "web3";
import MyContract from "../build/contracts/MyContract.json";

export default function App() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");

  const web3 = new Web3(
    new Web3.providers.HttpProvider("http://192.168.1.35:7545")
  );
  const connectToBlockchain = async () => {
    try {
      const accounts = await web3.eth.getAccounts();

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        const balance = await web3.eth.getBalance(accounts[0]);
        setBalance(Web3.utils.fromWei(balance, "ether") + " ETH");
      }
    } catch (error) {
      console.error("Error al conectar a la blockchain:", error);
      // Agregar más información sobre el error
      console.error("Error detallado:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi App Blockchain</Text>
      <Button title="Conectar a la Blockchain" onPress={connectToBlockchain} />
      <Text>Cuenta: {account}</Text>
      <Text>Balance: {balance}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

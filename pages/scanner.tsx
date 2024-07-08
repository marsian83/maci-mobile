import React, { useState } from "react";
import { Text, View } from "react-native";
import BarCodeScanner from "expo-barcode-scanner";

export default function ScannerScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [data, setData] = useState();

  async function ensurePermission() {
    const { status } = await BarCodeScanner.getPermissionsAsync();
    setHasPermission(status === "granted");
  }

  if (!hasPermission)
    return <Text className="text-white">Please Grant Camera Permission</Text>;

  return (
    <View>
      <BarCodeScanner onBarCodeScanned={data ? undefined : () => {}} />
    </View>
  );
}

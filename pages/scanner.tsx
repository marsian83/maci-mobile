import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useState } from "react";
import { Button, Text, Vibration, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  const [data, setData] = useState<string | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <TouchableHighlight
          onPress={requestPermission}
          className="bg-blue-700 px-8 py-2 rounded-md"
        >
          grant permission
        </TouchableHighlight>
      </View>
    );
  }

  return (
    <View className="flex flex-col">
      <Text className="text-white mb-4 text-xl font-semibold text-center">
        Scan QR Code
      </Text>

      {data && <Text>{data}</Text>}

      {!data && (
        <CameraView
          facing={"back"}
          className="w-full aspect-square relative"
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={(code) => {
            Vibration.vibrate();
            setData(code.data);
            console.log(code.data);
          }}
        >
          <Text className="text-white font-medium mb-2 absolute bottom-0 self-center bg-black px-2 py-1 rounded-sm">
            Place QR inside the square
          </Text>
        </CameraView>
      )}
    </View>
  );
}

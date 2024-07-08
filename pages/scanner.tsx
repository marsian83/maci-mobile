import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();

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
    <View>
      <CameraView facing={"back"} className="w-full aspect-square"></CameraView>
    </View>
  );
}

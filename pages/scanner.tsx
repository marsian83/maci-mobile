import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

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
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View>
      <CameraView facing={"back"} className=""></CameraView>
    </View>
  );
}

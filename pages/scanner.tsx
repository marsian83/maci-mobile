import { useGlobalContext } from "@/contexts/Global";
import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useState } from "react";
import { Button, Text, Vibration, View } from "react-native";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  const [data, setData] = useState<string | null>(null);

  const [modal, setModal] = useGlobalContext().modalState;

  useEffect(() => {
    data && setModal(<VoteConfirmationModal id={data} />);
  }, [data]);

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
          <Text>Grant Permission</Text>
        </TouchableHighlight>
      </View>
    );
  }

  return (
    <View className="flex flex-col">
      <Text className="text-white mb-4 text-xl font-semibold text-center">
        Scan QR Code
      </Text>

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

function VoteConfirmationModal(props: { id: string }) {
  const [modal, setModal] = useGlobalContext().modalState;

  return (
    <View className="p-4 max-w-[80vw] max-h-[60vh]">
      {/* <View
        className="self-end text-white"
        // onPress={() => setModal(false)}
      >
        X
      </View> */}

      <Text className="text-white">
        Are you sure you want to vote for {props.id}?
      </Text>
    </View>
  );
}

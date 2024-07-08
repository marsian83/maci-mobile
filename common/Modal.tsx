import React from "react";
import { View } from "react-native";

export default function Modal(props: { children: React.ReactNode }) {
  return (
    <View className="z-[999] absolute bg-black/20 top-0 left-0 w-full h-full flex items-center justify-center">
      <View className="flex flex-col self-center place-self-center">
        {props.children}
      </View>
    </View>
  );
}

import React from "react";
import Pages from "./pages";
import { Text, View } from "react-native";
import Drawer from "./common/Drawer";
import { useGlobalContext } from "./contexts/Global";
import Modal from "./common/Modal";

export default function App() {
  const [drawer, setDrawer] = useGlobalContext().drawerState;
  const [modal, setModal] = useGlobalContext().modalState;

  return (
    <View className="flex flex-col h-full bg-slate-900 text-white">
      <Pages />

      <Drawer>{drawer}</Drawer>
      <Modal>{modal}</Modal>
    </View>
  );
}

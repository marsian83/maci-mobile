import React, { useState } from "react";
import ExploreScreen from "./explore";
import HomeScreen from "./home";
import {
  Button,
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableHighlightBase,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { twMerge } from "tailwind-merge";
import ScannerScreen from "./scanner";

export default function Pages() {
  const tabs = [
    {
      element: <HomeScreen />,
      icon: "https://cdn2.iconfinder.com/data/icons/ui-kit-developer-glyphs/16/GlyphIcons-Home-512.png",
    },
    {
      element: <ExploreScreen />,
      icon: "https://cdn-icons-png.flaticon.com/512/565/565504.png",
    },
    {
      element: <ScannerScreen />,
      icon: "https://static-00.iconduck.com/assets.00/qr-scan-icon-2048x2048-aeh36n7y.png",
    },
    {
      element: <ExploreScreen />,
      icon: "https://cdn-icons-png.freepik.com/512/7605/7605078.png",
    },
    {
      element: <ExploreScreen />,
      icon: "https://static-00.iconduck.com/assets.00/settings-icon-1964x2048-8nigtrtt.png",
    },
  ];

  const [currentTab, setCurrentTab] = useState(0);

  return (
    <View className="flex flex-col w-full">
      <ScrollView className="h-[97vh] pt-10 px-3">
        {tabs[currentTab].element}
      </ScrollView>

      <View className="flex flex-row text-2xl h-[3vh] border-t pt-2 px-2 border-white/20">
        {tabs.map((tab, key) => (
          <TouchableOpacity
            className={twMerge(
              "flex justify-center items-center h-[4vh]",
              currentTab == key && "bg-blue-800 rounded-full"
            )}
            style={{ width: `${100 / tabs.length}%` }}
            onPress={() => setCurrentTab(key)}
            key={key}
          >
            <Image
              src={tab.icon}
              className={twMerge(
                "w-[4vw] aspect-square opacity-30",
                currentTab == key && "opacity-100"
              )}
              style={{
                tintColor: "#fff",
              }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

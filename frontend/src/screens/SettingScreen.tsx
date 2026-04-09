import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeOption, useTheme } from "../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";

const options: ThemeOption[] = ["light", "dark", "system"];

type SettingScreenProps = NativeStackNavigationProp<RootStack,"SettingScreen">;

export default function SettingScreen() {

  const { preference, applied, setPreference } = useTheme();

  const navigation = useNavigation<SettingScreenProps>();

  useLayoutEffect(() =>{

    navigation.setOptions({
      
      title:"Settings",
      headerStyle:{backgroundColor:`${applied === "dark"?"black":"white"}`},
      headerTintColor:applied === "dark"?"black":"white"


    });

  },[navigation,applied]);

  return (

    <SafeAreaView className="items-center flex-1 bg-green-200" edges={["right", "bottom", "left"]}>

      <StatusBar hidden={false} />

      <View className="p-5 bg-white dark:bg-black">

        <Text className="text-lg font-bold text-slate-900 dark:text-slate-100">Choose Bingo Theme</Text>

      </View>

      <View className="flex-row mt-2 gap-x-3">

        {options.map((option) => (

          <TouchableOpacity key={option} className={`py-2 px-5 rounded-full mb-2 ${preference === option? "bg-yellow-600":"bg-gray-200"} ${applied === "dark"?"border-gray-400":"border-gray-700"}`}
          
            onPress={()=> setPreference(option)}

          >

            <Text className={`text-center font-bold ${applied==="dark"?"text-slate-900":"text-slate-900" }`}>            

              {/* ex: light => l =>L ===> after slice(1) ===> Light */}

              {option.charAt(0).toUpperCase() + option.slice(1)}

            </Text>

          </TouchableOpacity>

        ))}

      </View>


    </SafeAreaView>

  );

}
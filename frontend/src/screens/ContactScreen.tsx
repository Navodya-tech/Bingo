import { AntDesign } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Pressable, StatusBar, Text, TextInput, View, } from "react-native";
import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import "../../global.css"
import { useUserRegistration } from "../components/UserContext";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from "react-native-alert-notification";
import { validateCountryCode, validatePhoneNo } from "../util/Validation";

// for navigation

type ContactProps = NativeStackNavigationProp<RootStack, "ContactScreen">;

export default function ContactScreen() {

  const navigation = useNavigation<ContactProps>();

  // for country code  

  //for default country code
  const [countryCode, setCountryCode] = useState<CountryCode>("LK");
  const [country, setCountry] = useState<Country | null>(null);
  const [show, setShow] = useState<boolean>(false);

  // for data share to the screens

  const { userData, setUserData } = useUserRegistration();

  //for data share to the screens using useState

  const [callingCode, setCallingCode] = useState("+94");
  const [phoneNo, setPhoneNo] = useState("");

  // for country code

  return (

    <SafeAreaView className="items-center flex-1 bg-green-200">

      <StatusBar hidden={true} />

      <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "android" ? 100 : 100} >

        <View className="items-center flex-1 p-5">

          <View>

            <Image source={require("../../assets/bingo.png")} className="h-40 w-36" />

          </View>

          <View>

            <Text className="font-bold text-slate-600">Find friends in your contacts who are already using Bingo.</Text>

          </View>

          <View className="w-full mt-5">

            {/* country code */}

            <View className="flex-row items-center justify-center my-3 border-b-2 border-yellow-600 h-14">

              <CountryPicker countryCode={countryCode} withFilter withFlag withCountryNameButton withCallingCode visible={show} onClose={() => { setShow(false) }} onSelect={(c) => {

                setCountryCode(c.cca2);
                setCountry(c);
                setShow(false);

              }} />

              <AntDesign name="caret-down" size={18} color="black" style={{ marginTop: 5 }} />

            </View>

            {/* country code */}

            <View className="flex flex-row justify-center mt-2">

              {/* if the country select the code will be added to the textfield using country.callingCode(if the country is select set the selected country calling code) `meaning of the code` */}

              <TextInput className="h-16 font-bold text-lg border-y-2 border-y-yellow-600 w-[18%]" placeholder="+94" editable={false} value={country ? `+${country.callingCode}` : callingCode}

                onChangeText={(text) => {

                  setCallingCode(text);

                }}

              />

              <TextInput inputMode="tel" className="h-16 font-bold text-lg border-y-2 border-y-yellow-600 w-[80%] ml-2" placeholder="77 #### ###" value={phoneNo}

                onChangeText={(text) => {

                  setPhoneNo(text);

                }}

              />

            </View>

          </View>

          <View className="w-full mt-16">

            <Pressable className="items-center justify-center w-full bg-blue-600 rounded-full h-14"

              onPress={() => {

                const valideCountryCode = validateCountryCode(callingCode);
                const validPhoneNo = validatePhoneNo(phoneNo);

                if (valideCountryCode) {

                  Toast.show({

                    type: ALERT_TYPE.WARNING,
                    title: "Warning",
                    textBody: valideCountryCode,

                  });

                } else if (validPhoneNo) {

                  Toast.show({

                    type: ALERT_TYPE.WARNING,
                    title: "Warning",
                    textBody: validPhoneNo,

                  });

                } else {

                  setUserData((previous) => ({

                    ...previous,
                    countryCode: country ? `+${country.callingCode}` : callingCode,
                    contactNo: phoneNo,

                  }));
                  navigation.replace("AvatarScreen");

                }

              }}

            >

              <Text className="text-xl font-bold text-slate-50">Next</Text>

            </Pressable>

          </View>

        </View>

      </KeyboardAvoidingView>

    </SafeAreaView>

  );

}

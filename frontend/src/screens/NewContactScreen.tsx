import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useLayoutEffect, useState } from "react";
import { FloatingLabelInput } from "react-native-floating-label-input";
import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";
import { validateCountryCode, validateFirstName, validateLastName, validatePhoneNo } from "../util/Validation";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { useSendNewContact } from "../socket/UseSendNewContact";

type NewContactScreenProps = NativeStackNavigationProp<RootStack, "NewContactScreen">;

export default function NewContactScreen() {

    const navigation = useNavigation<NewContactScreenProps>();

    const [countryCode, setCountryCode] = useState<CountryCode>("LK"); //default country code
    const [country, setCountry] = useState<Country | null>(null);
    const [show, setShow] = useState<boolean>(false);
    const [callingCode, setCallingCode] = useState("+94");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");

    const newContact = useSendNewContact();
    const sendNewContact = newContact.sendNewContact;
    const responseText = newContact.responseText;

    const sendData = () => {

        sendNewContact({

            id:0,
            firstName:firstName,
            lastName:lastName,
            countryCode:callingCode,
            contactNo:phoneNo,
            createdAt:"",
            updatedAt:"",
            status:"",

        });

        setFirstName("");
        setLastName("");
        setCallingCode("");
        setPhoneNo("");

    };

    useLayoutEffect(() => {

        navigation.setOptions({

            title: "",
            headerLeft: () => (

                <View className="flex-row items-center gap-x-2">

                    <TouchableOpacity className="items-center justify-center" onPress={() => {

                        navigation.goBack();

                    }}>

                        <Ionicons name="arrow-back-sharp" size={24} color="black" />

                    </TouchableOpacity>

                    <View className="flex-col">

                        <Text className="text-lg font-bold">New Contact</Text>

                    </View>

                </View>

            ),

            headerRight: () => <View></View>,

        });

    }, [navigation,]);

    return (

        <SafeAreaView className="flex-1 bg-green-200">

            <View className="flex-1 px-5">

                <View className="flex-row items-center gap-x-2 h-14">

                    <Feather name="user" size={24} color={"black"} />

                    <View className="flex-1 h-12">

                        <FloatingLabelInput label="First Name" className="flex-1" value={firstName} onChangeText={(text) => {

                            setFirstName(text);

                        }} />

                    </View>

                </View>

                <View className="flex-row items-center mt-8 gap-x-2 h-14">

                    <Feather name="user" size={24} color={"black"} />

                    <View className="flex-1 h-12">

                        <FloatingLabelInput label="Last Name" className="flex-1" value={lastName} onChangeText={(text) => {

                            setLastName(text);

                        }} />

                    </View>

                </View>

                <View className="flex-row items-center justify-center my-3 mt-4 border-b-2 border-yellow-800 h-14">

                    <CountryPicker countryCode={countryCode} withFilter withFlag withCountryNameButton withCallingCode visible={show} onClose={() => { setShow(false) }} onSelect={(c) => {

                        setCountryCode(c.cca2);
                        setCountry(c);
                        setShow(false);

                    }} />

                    <AntDesign name="caret-down" size={18} color="black" style={{ marginTop: 5 }} />

                </View>

                <View className="flex-row items-center mt-8 gap-x-2 h-14">

                    <Feather name="phone" size={24} color={"black"} />

                    <View className="items-center justify-center px-2 h-14 w-28 max-w-28">

                        <FloatingLabelInput label="" className="" inputMode="tel" editable={false} value={country ? `${country.callingCode}` : callingCode} onChangeText={(text) => {

                            setCallingCode(text);

                        }} />

                    </View>

                    <View className="flex-1 h-14">

                        <FloatingLabelInput label="Phone" className="" inputMode="tel" value={phoneNo} onChangeText={(text) => {

                            setPhoneNo(text);

                        }} />

                    </View>

                </View>

                <View className="mt-10">

                    <Pressable className="items-center justify-center bg-blue-600 rounded-full h-14" onPress={() => {

                        const firstNameValid = validateFirstName(firstName);
                        const lastNameValid = validateLastName(lastName);
                        const countryCodeValid = validateCountryCode(callingCode);
                        const phoneNoValid = validatePhoneNo(phoneNo);

                        //chck the validations

                        if (firstNameValid) {

                            Toast.show({

                                type: ALERT_TYPE.WARNING,
                                title: "Warning",
                                textBody: firstNameValid,

                            });

                        } else if (lastNameValid) {

                            Toast.show({

                                type: ALERT_TYPE.WARNING,
                                title: "Warning",
                                textBody: lastNameValid,

                            });

                        } else if (countryCodeValid) {

                            Toast.show({

                                type: ALERT_TYPE.WARNING,
                                title: "Warning",
                                textBody: countryCodeValid,

                            });

                        } else if (phoneNoValid) {

                            Toast.show({

                                type: ALERT_TYPE.WARNING,
                                title: "Warning",
                                textBody: phoneNoValid,

                            });

                        }else{

                            sendData();

                        }

                    }}>

                        <Text className="text-lg font-bold text-slate-100">Save Contact</Text>

                    </Pressable>

                </View>

            </View>

        </SafeAreaView>

    );

}
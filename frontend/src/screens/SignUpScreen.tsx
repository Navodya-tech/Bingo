import { Image, KeyboardAvoidingView, Platform, Pressable, StatusBar, Text, TextInput, View } from "react-native";
import "../../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from "react-native-alert-notification";
import { useTheme } from "../theme/ThemeProvider";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useUserRegistration } from "../components/UserContext";
import { validateFirstName, validateLastName } from "../util/Validation";

type SignUpProps = NativeStackNavigationProp<RootStack, "SignUpScreen">

export default function SignUpScreen() {

    const navigation = useNavigation<SignUpProps>();

    // for logo    

    const { applied } = useTheme();

    //const logo = applied === "dark" ? require("../../assets/logo-dark.png") : require("../../assets/logo.png")

    // for logo

    // use state for store the first name and last name    

    const { userData, setUserData } = useUserRegistration();

    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");

    // use state for store the first name and last name

    return (

        //keyboard avoiding view

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 100} className="items-center flex-1 bg-green-200">

            <SafeAreaView className="items-center justify-center p-5">

                <StatusBar hidden={true} />

                {/* logo */}

                <Image source={require("../../assets/bingo.png")} className="h-48 w-36" />

                {/* logo */}

                {/* sign up header */}

                <View className="items-start justify-start w-full">

                    <Text className="font-bold text-[16px] text-grey-500">Start With Your Bingo Account & Connect with Your Friends</Text>

                </View>

                {/* sign up header */}

                {/* sign up text fields using floating animation */}

                <View className="self-stretch">

                    <View className="w-full my-3">

                        <FloatingLabelInput label={"Enter Your First Name"} maxLength={200} value={userData.firstName} onChangeText={(text) => {

                            setUserData((previous) => ({

                                ...previous,
                                firstName: text,

                            }));

                        }}></FloatingLabelInput>

                    </View>

                    <View className="w-full my-3">

                        <FloatingLabelInput label={"Enter Your Last Name"} maxLength={200} value={userData.lastName} onChangeText={(text) => {

                            setUserData((previous) => ({

                                ...previous,
                                lastName: text,

                            }))

                        }}></FloatingLabelInput>

                    </View>

                </View>

                {/* sign up text fields using floating animation */}

            </SafeAreaView>

            {/* button container */}

            <View className="w-full px-5">

                {/* pressable next button */}

                <Pressable className="items-center justify-center p-2 bg-blue-600 rounded-full h-14" onPress={() => {

                    let validFirstName = validateFirstName(userData.firstName);
                    let validLastName = validateLastName(userData.lastName);

                    if (validFirstName) { //if the first name is not empty this is skip

                        Toast.show({

                            type: ALERT_TYPE.WARNING,
                            title: "Warning",
                            textBody: validFirstName,

                        });

                    } else if (validLastName) { //if the first name is not empty this is skip

                        Toast.show({

                            type: ALERT_TYPE.WARNING,
                            title: "Warning",
                            textBody: validLastName,

                        });

                    } else { //if the fname and lname is not empty

                        navigation.navigate("ContactScreen");

                    }

                }}>

                    <Text className="text-2xl font-bold text-slate-100">Next</Text>

                </Pressable>

                {/* pressable next button */}

            </View>

            {/* button container */}

        </KeyboardAvoidingView>

        //keyboard avoiding view

    );

}
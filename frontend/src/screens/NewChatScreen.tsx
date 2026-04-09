import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, Image, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { use, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { User } from "../socket/chat";
import { useUserList } from "../socket/UseUserList";

type NewChatScreenProps = NativeStackNavigationProp<RootStack, "NewChatScreen">;

export default function NewChatScreen() {

    const navigation = useNavigation<NewChatScreenProps>();

    const [search, setSearch] = useState("");

    const users = useUserList();

    // const [users, setUsers] = useState<User[]>([

    //     {

    //         id: 1,
    //         firstName: "Pasindu",
    //         lastName: "Nethsara",
    //         countryCode: "+94",
    //         contactNo: "771234560",
    //         createdAt: "2025-10-01 10:16 AM",
    //         updatedAt: "2025-10-01 10:16 AM",
    //         status: "ACTIVE",
    //         profileImage: "https://3dcb19921abd.ngrok-free.app/ChatApp/profile-images/4/profile1.png",

    //     },

    //     {

    //         id: 2,
    //         firstName: "Sahan",
    //         lastName: "Perera",
    //         countryCode: "+94",
    //         contactNo: "774567890",
    //         createdAt: "2025-10-01 10:17 AM",
    //         updatedAt: "2025-10-01 10:17 AM",
    //         status: "NOT_IN_LIST",
    //         profileImage: "",

    //     },

    // ]);

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

                        <Text className="text-lg font-bold">Select Contact</Text>
                        <Text className="text-sm font-bold">{users.length}</Text>

                    </View>

                </View>

            ),

            headerRight: () => <View></View>,

        });

    }, [navigation, users]);    

    const renderItem = ({ item }: any) => (

        <TouchableOpacity className="flex-row items-center justify-start px-3 py-2 gap-x-3" onPress={() => {

            navigation.navigate("SingleChatScreen", {

                chatId: item.id,
                friendName: `${item.firstName} ${item.lastName}`,
                lastSeenTime: item.updatedAt,
                profileImage: item.profileImage ? item.profileImage : `https://ui-avatars.com/api/?name=${item.firstName}+${item.lastName}&background=random`,

            });

        }}>

            <View>

                <TouchableOpacity className="items-center justify-center border-gray-300 rounded-full h-14 w-14 border-1">

                    {item.profileImage ? (<Image source={{ uri: item.profileImage }} className="rounded-full h-14 w-14" />) : (<Image source={{

                        uri: `https://ui-avatars.com/api/?name=${item.firstName}+${item.lastName}&background=random`}} className="w-12 h-12 rounded-full"/> 
                    )}

                </TouchableOpacity>

            </View>

            <View className="flex-col gap-y-1">

                <Text className="text-xl font-bold">{item.firstName}&nbsp;{item.lastName}</Text>
                <Text className="italic text-md">{item.status === "ACTIVE" ? "Already in friend List; Message now" : "Hey there! I am using Bingo"}</Text>

            </View>

        </TouchableOpacity>

    );
    
    const filterdUsers = [...users].filter((user) => {

        return (

            user.firstName.toLowerCase().includes(search.toLocaleLowerCase()) ||
            user.lastName.toLowerCase().includes(search.toLocaleLowerCase()) ||
            user.contactNo.toLowerCase().includes(search.toLocaleLowerCase())


        );

    }).sort((a, b) => a.firstName.localeCompare(b.firstName));

    return (

        <SafeAreaView className="flex-1 bg-green-200" edges={["right", "bottom", "left"]}>

            <StatusBar hidden={true} translucent={true} />

            <View className="flex-1">

                <View className="flex-row items-center px-3 mx-2 mt-3 border-2  bg-blue-200 border-blue-300 rounded-full h-14">

                    <Ionicons name="search" size={20} color={"gray"} />

                    <TextInput className="flex-1 text-lg font-bold ps-2" placeholder="Search" value={search} onChangeText={(text) => setSearch(text)} />

                </View>    

                <View className="px-2 py-2 my-2 border-b-2 border-b-yellow-500">

                    <TouchableOpacity className="flex-row items-center justify-center gap-x-3 h-14" onPress={() => navigation.navigate("NewContactScreen")}>

                        <View className="items-center justify-center w-12 h-12 bg-blue-600 rounded-full">

                            <Feather name="user-plus" size={24} color="black" />

                        </View>

                        <Text className="text-lg font-bold">New Contact</Text>

                    </TouchableOpacity>

                </View>

                <View className="mt-2">

                    <FlatList data={filterdUsers} renderItem={renderItem} keyExtractor={(_, index) => index.toString()} />

                </View>

            </View>

        </SafeAreaView>

    );

}
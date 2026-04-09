import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Image, KeyboardAvoidingView, Platform, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { UseSingleChat } from "../socket/UseSingleChat";
import { Chat } from "../socket/chat";
import { fromChatTime } from "../util/DateFormatter";
import { useSendChat } from "../socket/UseSendChat";

type Message = {

    id: number,
    text: string,
    sender: "me" | "friend",
    time: string,
    status?: "sent" | "delivered" | "read"

};

type SingleChatProps = NativeStackScreenProps<RootStack, "SingleChatScreen">;

export default function SingleChatScreen({ route, navigation }: SingleChatProps) {

    const { chatId, friendName, lastSeenTime, profileImage } = route.params;

    const singleChat = UseSingleChat(chatId); //chatId == friendId

    const messages = singleChat.messages;

    const friend = singleChat.friend;

    const sendMessage = useSendChat();

    //for messages

    // const [message, setMessage] = useState<Message[]>([

    //     {

    //         id: 1,
    //         text: "Hi",
    //         sender: "friend",
    //         time: "10.56 AM",

    //     },

    //     {

    //         id: 2,
    //         text: "Hi, Hello",
    //         sender: "friend",
    //         time: "10.57 AM",

    //     },

    //     {

    //         id: 3,
    //         text: "Hello Kohomada",
    //         sender: "me",
    //         time: "10.58 AM",
    //         status:"read",

    //     },

    // ]);

    //for messages

    const [input, setInput] = useState("");

    useLayoutEffect(() => {

        navigation.setOptions({
            
            title: "",
            headerLeft: () => (

                <View className="flex-row items-center gap-2">

                    <TouchableOpacity className="items-center justify-center" onPress={() => {

                        navigation.goBack();

                    }}>

                        <Ionicons name="arrow-back-sharp" size={24} color="black"/>

                    </TouchableOpacity>

                    <Image source={{ uri: profileImage }} className="border-2 border-blue-400 rounded-full h-14 w-14 p-0.5" />

                    <View className="space-y-2">

                        <Text className="text-2xl font-bold">{friend?.firstName.toString()} {friend?.lastName.toString()}</Text>

                        {/* this last seen time is came from chat and the chat is came from usingSingleChat, the last seen time we get from the home screen lastTimeStamp when navigate to this screen */}
                        <Text className="text-sm italic font-bold text-gray-500">{friend?.status === "ONLINE"?"Online":`Last seen ${fromChatTime (friend?.updatedAt ?? "")}`}</Text>

                    </View>

                </View>
            ),

            headerRight: () => (

                <TouchableOpacity>

                    <Ionicons name="ellipsis-vertical" size={24} color="black" />

                </TouchableOpacity>

            ),

        });

    }, [navigation, friend]);

    const renderItem = ({ item }: { item: Chat }) => {

        //const isMe = item.sender === "me";        

        const isMe = item.from.id !== chatId;        

        return (

            <View className={`my-1 px-3 py-2 max-w-[80%] ${isMe ? 'self-end bg-green-800 rounded-tl-xl rounded-bl-xl rounded-br-xl ' : 'self-start bg-gray-700 rounded-tr-xl rounded-bl-xl rounded-br-xl'}`}>                                

                <Text className={'text-white text-base'}>{item.message}</Text>

                <View className="flex-row items-center justify-end mt-1">               

                    <Text className={`text-sm italic text-white me-2`}>{fromChatTime(item.createdAt)}</Text>

                    {isMe && (

                        <Ionicons name={item.status === "READ" ? "checkmark-done" : item.status === "DELIVERED" ? "checkmark-done-sharp" : "checkmark"} size={18} color={item.status === "READ" ? "#38bdf8" : "#9ca3af"} />

                    )}

                </View>

            </View>

        );

    };

    const handleSendChat = () =>{

        if(!input.trim()){

            return;

        }

        sendMessage(chatId, input);

        setInput("");

    }

    // const sendMessage = () => {

    //     if (input.trim()) {

    //         const newMsg: Message = {

    //             id: Date.now(),
    //             text: input,
    //             sender: "me",
    //             time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    //             status: "sent",

    //         };
    //         setInput("");

    //     }

    //     return !input.trim();
    // };

    return (

        <SafeAreaView className="flex-1 bg-green-200" edges={['right', 'bottom', 'left']}>

            <StatusBar hidden ={true}/>

            <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"} className="flex-1" keyboardVerticalOffset={Platform.OS === 'android' ? 100 : 100}>

                <FlatList data={messages} renderItem={renderItem} className="flex-1 px-3" keyExtractor={(_, index) => index.toString()} contentContainerStyle={{ paddingBottom: 60 }} />

                <View className="flex-row items-end p-2 bg-white">

                    <TextInput value={input} onChangeText={(text) => setInput(text)} multiline placeholder="Text Now..." className="flex-1 h-auto px-5 py-3 text-base bg-gray-200 min-h-14 max-h-32 rounded-3xl"></TextInput>

                    <TouchableOpacity onPress={handleSendChat} className="items-center justify-center bg-yellow-600 rounded-full w-14 h-14 ">

                        <Ionicons name="send" size={24} color="black" />

                    </TouchableOpacity>

                </View>

            </KeyboardAvoidingView>

        </SafeAreaView>

    );

}
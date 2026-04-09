import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, Image, Modal, Platform, Pressable, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useLayoutEffect, useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { fromChatTime } from "../util/DateFormatter";
import { useChatList } from "../socket/UseChatList";
import { Chat } from "../socket/chat";


// for chats we create array

const chats = [

  {

    id: 1,
    name: "Fathima",
    lastMessage: "See you tomorrow!",
    time: "10:45 AM",
    unread: 2,
    profile: require("../../assets/avatar/avatar_1.jpg")

  },

  {

    id: 2,
    name: "Shehani Sakvithi",
    lastMessage: "Got the documents, thanks!",
    time: "9:30 AM",
    unread: 0,
    profile: require("../../assets/avatar/avatar_2.jpg")

  },

  {

    id: 3,
    name: "Tharaka Sir",
    lastMessage: "Lunch at 1?",
    time: "Yesterday",
    unread: 1,
    profile: require("../../assets/avatar/avatar_3.jpg")

  },

  {

    id: 4,
    name: "Rashika Perera",
    lastMessage: "Happy Birthday!",
    time: "Monday",
    unread: 0,
    profile: require("../../assets/avatar/avatar_4.jpg")

  },

  {

    id: 5,
    name: "Sunil Gamage",
    lastMessage: "Let me check and get back to you.",
    time: "2:15 PM",
    unread: 3,
    profile: require("../../assets/avatar/avatar_5.jpg")

  },

  {

    id: 6,
    name: "Sanka Perera",
    lastMessage: "Meeting rescheduled to Friday.",
    time: "Today",
    unread: 0,
    profile: require("../../assets/avatar/avatar_6.jpg")

  },

  {

    id: 7,
    name: "Sanka Perera",
    lastMessage: "Meeting rescheduled to Friday.",
    time: "Today",
    unread: 0,
    profile: require("../../assets/avatar/avatar_6.jpg")

  },

  {

    id: 8,
    name: "Sanka Perera",
    lastMessage: "Meeting rescheduled to Friday.",
    time: "Today",
    unread: 0,
    profile: require("../../assets/avatar/avatar_6.jpg")

  }

];

// for chats we create array

type HomeScreenProps = NativeStackNavigationProp<RootStack, "HomeScreen">;




export default function HomeScreen() {

  useEffect(() => {
    console.log("HomeScreen mounted");
  }, []);

  const navigation = useNavigation<HomeScreenProps>();

  const [search, setSearch] = useState("");

  const chatList = useChatList();

  const [isModalVisible, setModelvisible] = useState(false);

  // header icons

  useLayoutEffect(() => {

    navigation.setOptions({

      header: () => (

        <View
          className={`h-20 bg-white justify-center items-center flex-row shadow-2xl elevation-2xl ${Platform.OS === "ios" ? `py-5` : `py-0`}`}>

          <View className="items-start flex-1 ms-3">

            <Text className="text-2xl font-bold text-blue-600">Bingo</Text>

          </View>

          <View className="me-3">

            <View className="flex-row space-x-4">

              <TouchableOpacity className="me-5">

                <Ionicons name="camera" size={26} color="black" />

              </TouchableOpacity>

              <TouchableOpacity onPress={() => { setModelvisible(true) }}>

                <Ionicons name="ellipsis-vertical" size={24} color="black" />

              </TouchableOpacity>

              <Modal animationType="fade" visible={isModalVisible} onRequestClose={() => setModelvisible(false)} transparent={true}>

                <Pressable className="flex-1 bg-transparent"

                  onPress={() => setModelvisible(false)} //model close when press outside

                >

                  <Pressable

                    onPress={(e) => { e.stopPropagation() }} //prevent modal close inside of the modal

                  >

                    {/* root modal view */}

                    <View className="items-end justify-end p-5">

                      {/* content view */}

                      <View className="p-3 bg-white rounded-md w-60">

                        <TouchableOpacity className="items-start justify-center h-12 my-2 border-b-2 border-gray-100" onPress={() =>{

                          navigation.navigate("SettingScreen");

                        }}>

                          <Text className="text-lg font-bold">Settings</Text>

                        </TouchableOpacity>                      

                        <TouchableOpacity className="items-start justify-center h-12 my-2 border-b-2 border-gray-100" onPress={() =>{

                            navigation.navigate("ProfileScreen");

                        }}>

                          <Text className="text-lg font-bold">My Profile</Text>

                        </TouchableOpacity>                      

                        <TouchableOpacity className="items-start justify-center h-12 my-2 border-b-2 border-gray-100" onPress={() =>{

                          navigation.navigate("SignOut");

                        }}>

                          <Text className="text-lg font-bold">Sign Out</Text>

                        </TouchableOpacity>                      

                      </View>

                      {/* content view */}

                    </View>

                    {/* root modal view */}

                  </Pressable>

                </Pressable>

              </Modal>

            </View>

          </View>

        </View>

      ),

    });

  }, [navigation, isModalVisible]);

  // header icons

  //for chat filter
  const filteredChats = [...chatList].filter((chat) => {

    return (

      chat.friendName.toLowerCase().includes(search.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(search.toLowerCase())

    );

  }).sort((a, b) => new Date(b.lastTimeStamp).getTime() - new Date(a.lastTimeStamp).getTime());

  //for chat filter

  // for chat component

  const renderItem = ({ item }: { item: Chat }) => (

    <TouchableOpacity className="flex-row items-center px-3 py-2 my-0.5 bg-blue-50" onPress={() => {

      navigation.navigate("SingleChatScreen", {

        chatId: item.friendId,
        friendName: item.friendName,
        lastSeenTime: fromChatTime(item.lastTimeStamp),
        profileImage: item.profileImage ? item.profileImage : `https://ui-avatars.com/api/?name=${item.friendName.replace(" ", "+")}&background=random`,

      })

    }}>

      {/* set the image from array */}

      <TouchableOpacity className="items-center justify-center border-gray-300 rounded-full h-14 w-14 border-1">

        {item.profileImage ? (

          <Image source={{ uri: item.profileImage }} className="w-16 h-16 rounded-full me-4" />

        ) : (

          <Image source={{ uri: `https://ui-avatars.com/api/?name=${item.friendName.replace(" ", "+")}&background=random` }} className="w-16 h-16 rounded-full me-4" />

        )}

      </TouchableOpacity>


      {/* chat and time etc... */}

      <View className="flex-1">

        <View className="flex-row justify-between">

          <Text className="text-xl font-bold text-gray-600" numberOfLines={1} ellipsizeMode="tail">{item.friendName}</Text>
          <Text className="text-sm font-bold text-gray-600">{fromChatTime(item.lastTimeStamp)}</Text>

        </View>

        <View className="flex-row items-center justify-center">

          <Text className="flex-1 text-base text-gray-500" numberOfLines={1} ellipsizeMode="tail">{item.lastMessage}</Text>

          {item.unreadCount > 0 && (

            <View className="px-2 py-2 bg-blue-500 rounded-full ms-2">

              <Text className="text-xs font-bold text-slate-50">{item.unreadCount}</Text>

            </View>

          )}

        </View>

      </View>

      {/* chat and time etc... */}

    </TouchableOpacity>

  );

  // for chat component

  return (
  <SafeAreaView className="flex-1 p-0 bg-green-200" edges={['right', 'bottom', 'left']}>
    <StatusBar hidden={false} />

    {/* for search */}
    <View className="flex-row items-center px-3 mx-2 my-1 mt-3 bg-blue-200 border-2 border-gray-100 rounded-full h-14">
      <Ionicons name="search" size={20} color={'gray'} />
      <TextInput
        className="flex-1 text-lg font-bold ps-2"
        placeholder="Search"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
    </View>
    {/* for search */}

    {/* for chat view */}
    <View className="flex-1 mt-1">
      {filteredChats.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Ionicons name="chatbubble-outline" size={48} color="black" />
          <Text className="mt-3 text-lg font-bold text-black-500">
            No chats yet
          </Text>
          <Text className="text-gray-400">Start a conversation!</Text>
        </View>
      ) : (
        <FlatList
          data={filteredChats}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 70 }}
        />
      )}
    </View>
    {/* for chat view */}

    {/* side icon */}
    <View className="absolute w-20 h-20 bg-yellow-500 bottom-16 right-7 rounded-3xl">
      <TouchableOpacity
        className="items-center justify-center w-20 h-20 rounded-3xl"
        onPress={() => navigation.navigate("NewChatScreen")}
      >
        <Ionicons name="chatbox-ellipses" size={26} color={"black"} />
      </TouchableOpacity>
    </View>
    {/* side icon */}
  </SafeAreaView>
);


}
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatScreen from "./ChatsScreen";

import { Ionicons } from "@expo/vector-icons";
import ChatsScreen from "./ChatsScreen";
import { useEffect } from "react";

const Tabs = createBottomTabNavigator();

export default function HomeTabs() {

    useEffect(() => {
        console.log("HomeScreen mounted");
    }, []);

    return (

        <Tabs.Navigator screenOptions={({ route }) => ({

            tabBarIcon: ({ color }) => {

                let iconName = "chatbubble-ellipses";

                if (route.name === "Chats") iconName = "chatbubble-ellipses";
                else if (route.name === "Status") iconName = "time";
                else if (route.name === "Calls") iconName = "call";

                return <Ionicons name={iconName as any} size={28} color={color} />;

            },

            tabBarLabelStyle: { fontSize: 13, fontWeight: '800' },
            tabBarActiveTintColor: "rgba(22, 81, 199, 1)",
            tabBarInactiveTintColor: "grey",
            tabBarStyle: {

                height: 80,
                backgroundColor: "#fff",
                paddingTop: 8,

            }

        })}>

            <Tabs.Screen name="Chats" component={ChatsScreen} options={{ headerShown: false }} />

        </Tabs.Navigator>

    );

}
import { useEffect, useState } from "react";
import { useWebSocket } from "./WebSocketProvider";
import { Chat, User, WSResponse } from "./chat";

export function UseSingleChat (friendId:number) {

    const {socket, sendMessage} = useWebSocket();
    const [messages, sentMessage] = useState<Chat[]>([]);

    const [friend, setFriend] = useState<User>();

    useEffect(() =>{

        if(!socket){

            return;

        }

        
        sendMessage({type: "get_single_chat", friendId});

        sendMessage({type: "get_friend_data", friendId});

        const onMessage = (event:MessageEvent) =>{

            const response:WSResponse = JSON.parse(event.data);

            if(response.type === "single_chat"){

                //console.log(response.payload.to.id);
                sentMessage(response.payload);

            }

            if(response.type === "friend_data") {

                //console.log(response.payload);
                setFriend(response.payload);

            }

            if(response.type === "new_message" && response.payload.to.id === friendId) {

                console.log(response.payload);

                // if you want the response before [response.payload, ...prev]

                sentMessage ((prev) => [...prev, response.payload]);

            }

            //console.log(response);

        };

        socket.addEventListener("message", onMessage);

        return () =>{

            socket.removeEventListener("message", onMessage);

        };

    },[socket, friendId]);

    return {messages: messages, friend: friend};

}
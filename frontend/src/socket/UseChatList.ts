import { useEffect, useState } from "react";
import { Chat, WSResponse } from "../socket/chat";
import { useWebSocket } from "../socket/WebSocketProvider";

export function useChatList():Chat []{

    const {socket, sendMessage} = useWebSocket();
    const [chatList, setChatList] = useState<Chat[]>([]);

    useEffect(() => {

        if(!socket){

            return;

        }

        sendMessage({type:"get_chat_list"});

        const onMessage = (event: MessageEvent) =>{

            //console.log(event.data);

            //const data = JSON.parse(event.data);

            const response:WSResponse = JSON.parse(event.data);

            //console.log(response.payload)

            if(response.type === "friend_list"){

                //console.log(data.data);
                setChatList(response.payload);

            }

        };

        socket.addEventListener("message",onMessage);

        return () => {

            socket.removeEventListener("message",onMessage);

        };

    }, [socket]);

    return chatList;

}
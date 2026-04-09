import { useEffect } from "react";
import { useWebSocket } from "./WebSocketProvider";
import { WSResponse } from "./chat";

export function useWebSocketPing(interval: number) {

    const { socket, isConnected, sendMessage } = useWebSocket();

    useEffect(() => {

        if(!socket || !isConnected){

            return;

        }

        const pingTimer = setInterval(() =>{

            sendMessage({type:"PING"});

        },interval);

        const onMessage = (event:MessageEvent) =>{

            const response:WSResponse = JSON.parse(event.data);

            if(response.type === "PONG"){

                console.log("WebSocket: PONG");

            }

        }

        socket.addEventListener("message",onMessage);

        //cleanup activity

        return() => {

            clearInterval(pingTimer);//timer eka clear karala
            socket.removeEventListener("message",onMessage);

        };

        //uda wada tika wenne natten meke atule tiyena wada tika wenawa

        //cleanup activity

    }, [socket, isConnected, sendMessage, interval]); //yam kisi awastawaka me tika wada karot me wade wenawa(metana tiyena eka wadak wage unot)

}
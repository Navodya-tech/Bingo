import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, View } from "react-native";

export default function SignOutScreen(){

    const auth = useContext(AuthContext);

    return(

        <SafeAreaView className="flex-1 bg-yellow-700">

            <View className="w-[60%] items-center h-10 mt-2">

                <Button title="Log Out" 
                color="red"
                 onPress={() =>{
                    
                    if(auth) auth.signOut()
                    }}/>

            </View>

        </SafeAreaView>

    );

}
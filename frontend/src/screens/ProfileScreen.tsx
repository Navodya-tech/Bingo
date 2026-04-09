import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../theme/ThemeProvider";
import { useContext, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useUserRegistration } from "../components/UserContext";
import { useUserProfile } from "../socket/useUserProfile";
import { uploadProfileImage } from "../api/UserService";
import { AuthContext } from "../components/AuthProvider";

type ProfileScreenProps = NativeStackNavigationProp<RootStack, "ProfileScreen">;

export default function ProfileScreen() {

  const { userData, setUserData } = useUserRegistration();

  const navigation = useNavigation<ProfileScreenProps>();

  const { applied } = useTheme();

  const userProfile = useUserProfile();

  useLayoutEffect(() => {

    navigation.setOptions({

      title: "Settings",
      headerStyle: { backgroundColor: `${applied === "dark" ? "black" : "white"}` },
      headerTintColor: applied === "dark" ? "black" : "white"


    });

  }, [navigation, applied]);

  const [image, setImage] = useState<string | null>(null);

  const auth = useContext(AuthContext);

  const pickImage = async () => {

    //open the gallery and get the image

    let result = await ImagePicker.launchImageLibraryAsync({

      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,

    });

    //if user cancle the picking images

    if (!result.canceled) {

      setImage(result.assets[0].uri);
      uploadProfileImage(String(auth ? auth.userId : 0), result.assets[0].uri);

    }

  };

  //username

  const userName = userProfile?.firstName+" "+userProfile?.lastName;

  //username

  //mobileNumber

  const mobileNumber = userProfile?.countryCode+" "+userProfile?.contactNo;

  console.log(userProfile?.profileImage);

  //mobileNumber

  return (

    <SafeAreaView className="items-center justify-center flex-1 bg-green-200">

      <View className="flex-1 w-full gap-3 p-4 mt-10">

        <View className="items-center">

          {image ? (

            <Image className="w-40 h-40 border-2 border-blue-300 rounded-full" source={{ uri: image }} />


          ) : <Image className="w-40 h-40 border-2 border-blue-300 rounded-full" source={{ uri: userProfile?.profileImage }} />}


        </View>

        <View className="my-1">

          <TouchableOpacity className="items-center justify-center h-12" onPress={() => {

            pickImage();

          }}>

            <Text className="text-lg font-bold text-yellow-600">Edit Profile</Text>

          </TouchableOpacity>

        </View>

        <View className="flex gap-10">

          <View className="flex-col justify-start h-12 gap-y-3">

            <View className="flex-row items-center gap-x-3">

              <Feather name="user" size={24} color="black" />
              <Text className="text-lg font-bold">Name</Text>

            </View>          

            <Text className="text-lg font-bold text-blue-600">{userName}</Text>

          </View>

          <View className="flex-col justify-start h-12 gap-y-3">

            <View className="flex-row items-center gap-x-3">

              <Feather name="phone" size={24} color="black" />

              <Text className="text-lg font-bold">Phone</Text>

            </View>

            <Text className="text-lg font-bold text-blue-600">{mobileNumber}</Text>

          </View>

        </View>

      </View>

    </SafeAreaView>

  );

}
import { ActivityIndicator, FlatList, Image, Pressable, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as ImagePicker from 'expo-image-picker';
import { useContext, useEffect, useState } from "react";
import { useUserRegistration } from "../components/UserContext";
import { validateProfileImage } from "../util/Validation";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { createNewAccount } from "../api/UserService";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthContext } from "../components/AuthProvider";

type AvatarScreenProp = NativeStackNavigationProp<RootStack, "AvatarScreen">;

export default function AvatarScreen() {

  const navigation = useNavigation<AvatarScreenProp>();

  //for image picker

  const { userData, setUserData } = useUserRegistration();

  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState<string | null>(null);

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

      setUserData((previous) => ({

        ...previous,
        profileImage: result.assets[0].uri,

      }));

    }

  };

  // create a array for avatars

  const avatars = [

    require("../../assets/avatar/avatar_1.jpg"),
    require("../../assets/avatar/avatar_2.jpg"),
    require("../../assets/avatar/avatar_3.jpg"),
    require("../../assets/avatar/avatar_4.jpg"),
    require("../../assets/avatar/avatar_5.jpg"),
    require("../../assets/avatar/avatar_6.jpg"),

  ];

  // create a array for avatars  

  useEffect(() => {
    console.log("HomeScreen mounted");
  }, []);



  const auth = useContext(AuthContext);

  return (

    <SafeAreaView className="flex-1 bg-green-200">

      {/* main container */}

      <View className="items-center">

        <StatusBar hidden={true} />

        <View>

          {/* logo */}

          <Image source={require("../../assets/bingo.png")} className="h-40 w-36" />

          {/* logo */}

        </View>

        <View className="items-center">

          <Text className="text-lg font-bold text-yellow-700">Choose a profile image</Text>

          <View className="items-center mt-2 h-72">

            {/* for image select */}

            {/* when we click here open the image gallery (onPress={pickImage}) */}

            {/* h-[120] in here we call those are arditary values in tailwind */}

            <Pressable className="h-[120] w-[120] rounded-full bg-blue-100 justify-center items-center border-2 border-blue-500 border-dashed" onPress={pickImage}>

              {/* if image is set set the image else show the text(Add Image) */}

              {image ? (
                <Image source={{ uri: image }} className="h-[120] w-[120] rounded-full" />) :
                (

                  <View className="items-center">

                    <Text className="text-2xl font-bold text-black-500">+</Text>
                    <Text className="text-lg font-bold text-black-500">Add Image</Text>

                  </View>

                )}

            </Pressable>

            {/* for image select */}

            {/* for avatar select */}

            <Text className="my-2 text-lg font-bold text-yellow-700">Or select an avatar</Text>

            {/* flastList is bydefault is verticle(can go only up and down) */}

            {/* in keyExtractor we can get 2 keyWords item and index(_underscore mean we didn't wan't anything) & we create index for every item in our items as string */}

            {/* renderItem = how we want show item in FlatList, it can be view,image,text etc..... */}

            <FlatList data={avatars} horizontal keyExtractor={(_, index) => index.toString()}

              renderItem={({ item }) => (

                <TouchableOpacity onPress={() => {
                  setImage(Image.resolveAssetSource(item).uri);

                  setUserData((previous) => ({

                    ...previous,
                    profileImage: Image.resolveAssetSource(item).uri,

                  }));

                }}>

                  <Image source={item} className="w-20 h-20 mx-2 border-2 border-gray-200 rounded-full" />

                </TouchableOpacity>

              )}

              contentContainerStyle={{ paddingHorizontal: 10 }}
              showsHorizontalScrollIndicator={false}

            />

            {/* for avatar select */}

          </View>

        </View>

        <View className="w-full px-5 mt-5">

          <Pressable disabled={loading ? true : false} className="items-center justify-center bg-blue-600 rounded-full h-14" onPress={async () => {

            const validaProfile = validateProfileImage(userData.profileImage ? { uri: userData.profileImage, type: "", fileSize: 0 } : null);

            if (validaProfile) {

              Toast.show({

                type: ALERT_TYPE.WARNING,
                title: "Warning",
                textBody: validaProfile,

              });

            } else {

              try {

                setLoading(true);

                const response = await createNewAccount(userData);

                console.log(response);

                if (response.status) {

                  const id = response.user.id;

                  console.log(id);

                  await auth?.signUp(String(id));

                  //navigation.replace("HomeScreen");

                } else {

                  Toast.show({

                    type: ALERT_TYPE.WARNING,
                    title: "Warning",
                    textBody: response.message,

                  });

                }

              } catch (error) {

                console.log(error);

              } finally {

                setLoading(false);

              }

            }

          }}
          >

            {

              loading ? (

                <ActivityIndicator size={'large'} color={"blue"} />

              ) : (

                <Text className="text-xl font-bold text-slate-50">Create account</Text>

              )

            }

          </Pressable>

        </View>

      </View>

      {/* main container */}

    </SafeAreaView >

  );

}

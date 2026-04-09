import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SignUpScreen from './src/screens/SignUpScreen';

import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SplashScreen from './src/screens/SplashScreen';
import "././global.css"
import { ThemeProvider } from './src/theme/ThemeProvider';
import ContactScreen from './src/screens/ContactScreen';
import AvatarScreen from './src/screens/AvatarScreen';
import SettingScreen from './src/screens/SettingScreen';
import { UserRegistrationProvider } from './src/components/UserContext';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import HomeTabs from './src/screens/HomeTabs';
import SingleChatScreen from './src/screens/SingleChatScreen';
import { WebSocketProvider } from './src/socket/WebSocketProvider';
import NewChatScreen from './src/screens/NewChatScreen';
import NewContactScreen from './src/screens/NewContactScreen';
import { useWebSocketPing } from './src/socket/UseWebSocketPing';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './src/components/AuthProvider';
import SignOutScreen from './src/screens/SignOut';

export type RootStack = {

  SplashScreen: undefined;
  SignUpScreen: undefined;
  ContactScreen: undefined;
  AvatarScreen: undefined;

  HomeScreen: undefined;
  ProfileScreen: undefined;
  SettingScreen: undefined;
  NewChatScreen: undefined;
  NewContactScreen: undefined;
  SignOut:undefined;

  SingleChatScreen: {

    chatId: number,
    friendName: string,
    lastSeenTime: string,
    profileImage: string,

  };

}

const Stack = createNativeStackNavigator<RootStack>();

function ChatApp() {

  //useWebSocketPing(4000 * 60); //tappara tunakata serayak weda

  const auth = useContext(AuthContext);

  return (

    //custom theme provider we create in the ThemeProvider

    //userId={auth? Number(auth.userId):0}

    <WebSocketProvider userId={auth? Number(auth.userId):0}>

      <ThemeProvider>

        <UserRegistrationProvider>

          <NavigationContainer>

            <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ animation: "fade" }}>

              {auth?.isLoading ? (<Stack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />) : auth?.userId === null ? (

                //when user is not signup

                <Stack.Group>

                  <Stack.Screen name='SignUpScreen' component={SignUpScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="ContactScreen" component={ContactScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="AvatarScreen" component={AvatarScreen} options={{ headerShown: false }} />

                </Stack.Group>

              ) : (

                //when user signup complete

                <Stack.Group>

                  {/* <Stack.Screen name='SignInScreen' component={SignInScreen} options={{ headerShown: false }} /> */}
                  <Stack.Screen name='HomeScreen' component={HomeTabs} options={{ headerShown: false }} />
                  <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
                  <Stack.Screen name='SettingScreen' component={SettingScreen} />
                  <Stack.Screen name='NewChatScreen' component={NewChatScreen} />
                  <Stack.Screen name='NewContactScreen' component={NewContactScreen} />
                  <Stack.Screen name='SingleChatScreen' component={SingleChatScreen} />
                  <Stack.Screen name='SignOut' component={SignOutScreen} />

                </Stack.Group>

              )}

            </Stack.Navigator>

            {/* <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ animation: "fade" }}>

              <Stack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />

              <Stack.Group>

                <Stack.Screen name='SignUpScreen' component={SignUpScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ContactScreen" component={ContactScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AvatarScreen" component={AvatarScreen} options={{ headerShown: false }} />

              </Stack.Group>

              <Stack.Group>

                <Stack.Screen name='SignInScreen' component={SignInScreen} options={{ headerShown: false }} />
                <Stack.Screen name='HomeScreen' component={HomeTabs} options={{ headerShown: false }} />
                <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
                <Stack.Screen name='SettingScreen' component={SettingScreen} />
                <Stack.Screen name='NewChatScreen' component={NewChatScreen} />
                <Stack.Screen name='NewContactScreen' component={NewContactScreen} />
                <Stack.Screen name='SingleChatScreen' component={SingleChatScreen} />

              </Stack.Group>

            </Stack.Navigator> */}

          </NavigationContainer>

        </UserRegistrationProvider>

      </ThemeProvider>

    </WebSocketProvider>

  );

}

export default function App() {

  const USER_ID = 3; //can use AsyncStorage

  return (

    <AlertNotificationRoot>

      <AuthProvider>

        <ChatApp />

      </AuthProvider>

    </AlertNotificationRoot>

  );

}
import React, { useEffect, useRef } from 'react'
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import "../../global.css"
import CircleShape from '../components/CircleShape';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStack } from '../../App';
import { runOnJS } from 'react-native-worklets';
import { useTheme } from '../theme/ThemeProvider';
import { useWebSocketPing } from '../socket/UseWebSocketPing';

type Props = NativeStackNavigationProp<RootStack, "SplashScreen">;

export default function SplashScreen() {

  useWebSocketPing(4000 * 60);

  const navigation = useNavigation<Props>();

  // for animation  

  const opacity = useSharedValue(0);

  useEffect(() => {

    opacity.value = withTiming(1, { duration: 3000 });

    // const timer = setTimeout(() => {

    //   // in reaplace not navigate to the screen this will replace the screen can't back

    //   navigation.replace("SignUpScreen");

    // }, 3000);

    // return (() => { clearTimeout(timer) })

  }, [navigation, opacity]);

  const animatedStyle = useAnimatedStyle(() => {

    return { opacity: opacity.value };

  });

  // for animation

  //for change the icon

  const { applied } = useTheme();

  //for change the logo in dark and light themes

  const logo = applied === "dark" ? require("../../assets/bingo.png") : require("../../assets/bingo.png");

  //for change the icon


  return (

    <SafeAreaView className='items-center justify-center flex-1 bg-slate-50 dark:bg-slate-950'>

      <StatusBar hidden={true} />

      <CircleShape width={200} height={200} className='bg-slate-900' borderRadius={999} topValue={-25} leftValue={-50} />

      <CircleShape width={160} height={160} className='bg-slate-900' borderRadius={999} topValue={-4} leftValue={50} />

      <Animated.View style={animatedStyle}>

        <Image source={logo} className='w-56 h-44' />

      </Animated.View>


      <Animated.View className="absolute bottom-16" style={animatedStyle}>

        <View className='flex flex-col items-center justify-center'>

          <Text className='text-sm font-bold text-slate-600 dark:text-slate-200'>POWERED BY: {process.env.EXPO_PUBLIC_APP_OWNER}</Text>

          {/* in text-[12px] mean this is arbitart value we use [] for this */}

          <Text className='text-[12px] font-bold text-slate-600 dark:text-slate-200'>VERSION: {process.env.EXPO_PUBLIC_APP_VERSION}</Text>

        </View>

      </Animated.View>

    </SafeAreaView>

  );

}

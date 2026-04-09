import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

export type ThemeOption = "light" | "dark" | "system";

const THEME_KEY = "@app_color_scheme";

type ThemeContextType = {

  preference: ThemeOption;

  applied: "light" | "dark"; //use on runtime

  // promise base didn't have return type
  setPreference: (themeOption: ThemeOption) => Promise<void>;

};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// React.ReactNode mean react component

export function ThemeProvider({ children }: { children: React.ReactNode }) {

  const { colorScheme, setColorScheme } = useColorScheme();
  const [getPreferenceState, setPreferenceState] = useState<ThemeOption>("system");
  const [isReady, setReady] = useState(false);

  useEffect(() => {

    (async () => {

      try {

        //save theme to the async storage
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);

        //if saved theme is equal to the Light or dark

        if (savedTheme === "light" || savedTheme === "dark") {

          setPreferenceState(savedTheme);
          setColorScheme(savedTheme);

        } else {

          //else

          setPreferenceState("system");
          setColorScheme("system");

        }

      } catch (error) {

        console.warn("Failed to load theme: " + error);

      } finally {

        setReady(true);

      }

    })();


  }, [setColorScheme]);

  const setPreference = async (themeOption: ThemeOption) => {

    try {

      //look if the theme option is equal to the system

      if (themeOption === "system") { //system mean light theme and dark theme in device

        //if the themeOption is equal to the system remove the Theme key from asyncStorage
        await AsyncStorage.removeItem(THEME_KEY);

        setPreferenceState("system");
        setColorScheme("system");

      } else {

        //if the selected theme option is not system
        //set the theme selected by user

        await AsyncStorage.setItem(THEME_KEY, themeOption);
        setPreferenceState(themeOption);
        setColorScheme(themeOption);

      }

    } catch (error) {

      console.warn("Failed to save theme:" + error);

    }

  };

  if (!isReady) {

    return <ActivityIndicator style={{ flex: 1 }} />;

  }


  return (

    <ThemeContext.Provider value={{

      preference: getPreferenceState,

      applied: colorScheme ?? "light",

      setPreference,

    }}>

      {children}

    </ThemeContext.Provider>

  );

}

export function useTheme() {

  const ctx = useContext(ThemeContext);

  if (!ctx) {

    throw new Error("useTheme must be used inside ThemeProvider");

  }

  return ctx;

}

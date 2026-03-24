import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { View } from "react-native";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "brown",
          },
          headerBackground: () => (
            <View style={{ flex: 1, backgroundColor: "brown" }} />
          ),
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: true, title: "Staff POS" }}
        />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
        <Stack.Screen
          name="receive-order"
          options={{ title: "New Walk-in Order", presentation: "modal" }}
        />
        <Stack.Screen
          name="order-options"
          options={{
            title: "Order Options",
            headerShown: false,
            presentation: "formSheet",
            sheetAllowedDetents: [0.25, 0.5, 1],
            sheetInitialDetentIndex: 1,
            sheetGrabberVisible: false,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

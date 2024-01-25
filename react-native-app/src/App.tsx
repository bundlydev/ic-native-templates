import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { Client } from "@bundly/ic-core-js";
import { IcpConnectContextProvider } from "@bundly/ic-react";
import { InternetIdentityReactNative, ReactNativeStorage } from "@bundly/ic-react-native";

import { AuthButton } from "./components/auth-button";
import { AppBrowser } from "./libs/InAppBrowser";

const { EXPO_PUBLIC_INTERNET_IDENTITY_URL, EXPO_PUBLIC_APP_LINK, EXPO_PUBLIC_IC_HOST_URL } = process.env;

export default function App() {
  const client = Client.create({
    agent: {
      host: EXPO_PUBLIC_IC_HOST_URL,
      verifyQuerySignatures: false,
    },
    canisters: {},
    providers: [
      new InternetIdentityReactNative({
        providerUrl: EXPO_PUBLIC_INTERNET_IDENTITY_URL!,
        appLink: EXPO_PUBLIC_APP_LINK!,
        inAppBrowser: AppBrowser,
      }),
    ],
    storage: new ReactNativeStorage(),
  });

  return (
    <IcpConnectContextProvider client={client}>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <AuthButton />
        <StatusBar style="auto" />
      </View>
    </IcpConnectContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

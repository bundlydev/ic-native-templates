// @ts-ignore
import { APP_LINK, IC_HOST_URL, INTERNET_IDENTITY_URL } from "@env";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { Client } from "@bundly/ic-core-js";
import { IcpConnectContextProvider } from "@bundly/ic-react";
import { InternetIdentityReactNative, ReactNativeStorage } from "@bundly/ic-react-native";

import { AuthButton } from "./components/auth-button";
import { AppBrowser } from "./libs/InAppBrowser";

export default function App() {
  const client = Client.create({
    agent: {
      host: IC_HOST_URL,
      verifyQuerySignatures: false,
    },
    canisters: {},
    providers: [
      new InternetIdentityReactNative({
        providerUrl: INTERNET_IDENTITY_URL,
        appLink: APP_LINK,
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

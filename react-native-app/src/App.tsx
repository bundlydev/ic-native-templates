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
      host: "https://beige-bushes-spend.loca.lt/",
      verifyQuerySignatures: false,
    },
    canisters: {},
    providers: [
      new InternetIdentityReactNative({
        providerUrl: "https://beige-bushes-spend.loca.lt/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai",
        appLink: "exp://127.0.0.1:8081/--/", //TODO: Get this dynamically
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

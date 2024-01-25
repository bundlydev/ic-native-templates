import { ExpoRoot } from "expo-router";

import { Client } from "@bundly/ic-core-js";
import { IcpConnectContextProvider } from "@bundly/ic-react";
import { InternetIdentityReactNative, ReactNativeStorage } from "@bundly/ic-react-native";

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
        appLink: `${EXPO_PUBLIC_APP_LINK}/--/success`,
        inAppBrowser: AppBrowser,
      }),
    ],
    storage: new ReactNativeStorage(),
  });

  // @ts-ignore
  const ctx = require.context("./screens");

  return (
    <IcpConnectContextProvider client={client}>
      <ExpoRoot context={ctx} />
    </IcpConnectContextProvider>
  );
}

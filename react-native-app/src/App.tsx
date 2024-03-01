import { ExpoRoot } from "expo-router";

import { Client } from "@bundly/ares-core";
import { IcpConnectContextProvider } from "@bundly/ares-react";
import { InternetIdentityReactNative, ReactNativeStorage } from "@bundly/ares-react-native";

import { AppBrowser } from "./libs/in-app-browser";

const { EXPO_PUBLIC_INTERNET_IDENTITY_MIDDLEWARE_URL, EXPO_PUBLIC_APP_LINK, EXPO_PUBLIC_IC_HOST_URL } = process.env;

export default function App() {
  const client = Client.create({
    agent: {
      host: EXPO_PUBLIC_IC_HOST_URL,
      verifyQuerySignatures: false,
    },
    canisters: {},
    providers: [
      new InternetIdentityReactNative({
        providerUrl: EXPO_PUBLIC_INTERNET_IDENTITY_MIDDLEWARE_URL!,
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

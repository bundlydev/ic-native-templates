import { Link, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

import { AppLinkParams } from "@bundly/ic-core-js";
import { useCurrentProvider } from "@bundly/ic-react";

export default function SuccessPage() {
  const provider = useCurrentProvider();

  const params = useLocalSearchParams<AppLinkParams>();

  useEffect(() => {
    async function onLoad() {
      if (!provider) {
        throw new Error("Provider not found");
      }

      if (!provider.onAppLinkOpened) {
        throw new Error("Provider does not support App Links");
      }

      const { delegation, publicKey } = params;

      if (delegation && publicKey) {
        try {
          await provider.onAppLinkOpened({ delegation, publicKey });
        } catch (error) {
          console.error(error);
        }
      } else {
        console.warn("Invalid App Link Params");
      }
    }

    onLoad();
  }, []);

  return (
    <View>
      <Text>Success page</Text>

      <Link replace href="/">
        <Text>Go Home</Text>
      </Link>
    </View>
  );
}

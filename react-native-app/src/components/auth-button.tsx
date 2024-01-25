import React, { useContext } from "react";
import { Button } from "react-native";

import { IcpConnectContext, useClient, useCurrentProvider } from "@bundly/ic-react";

export type LoginConfig = {
  maxTimeToLive?: bigint;
  derivationOrigin?: string | URL;
  windowOpenerFeatures?: string;
};

export function AuthButton() {
  const { isAuthenticated, onConnect, onDisconnect } = useContext(IcpConnectContext);

  return isAuthenticated ? (
    <LogoutButton onDisconnect={onDisconnect} />
  ) : (
    <LoginButton onConnect={onConnect} />
  );
}

export type LoginButtonProps = {
  onConnect: () => void;
  title?: string;
};

function LoginButton(props: LoginButtonProps) {
  const client = useClient();

  // TODO: implement this instead of client
  // const provider = useCurrentProvider();

  async function login() {
    try {
      await client.setCurrentProvider("internet-identity-middleware");
      const provider = client.getCurrentProvider();

      if (!provider) {
        throw new Error("No identity provider selected");
      }

      await provider.connect();
      // Connect notification to context happens on success page
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return <Button onPress={() => login()} title={props.title || "Login"} />;
}

export type LogoutButtonProps = {
  onDisconnect: () => void;
  title?: string;
};

function LogoutButton(props: LogoutButtonProps) {
  const client = useClient();
  const provider = useCurrentProvider();

  async function logout() {
    if (!provider) {
      throw new Error("No identity provider selected");
    }

    try {
      await provider.disconnect();
      await client.removeCurrentProvider();
      props.onDisconnect();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return <Button onPress={() => logout()} title={props.title || "Logout"} />;
}

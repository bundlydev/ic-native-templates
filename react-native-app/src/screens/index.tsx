import { Button, Alert } from "react-native";

import { useAuth } from "@bundly/ares-react";
import { AuthButton } from "@bundly/ares-react-native";

export default function IndexScreen() {
  const { identity } = useAuth();

  const handlePress = () => {
    Alert.alert("Principal", identity.getPrincipal().toString());
  }

  return <>
    <AuthButton />
    <Button title="Get principal" onPress={handlePress} />
    </>;
}

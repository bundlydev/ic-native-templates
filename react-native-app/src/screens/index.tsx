import { Alert, Button } from "react-native";

import { useAuth } from "@bundly/ares-react";
import { InternetIdentityMidlewareButton, LogoutButton } from "@bundly/ares-react-native";

export default function IndexScreen() {
  const { isAuthenticated, currentIdentity } = useAuth();

  const handlePress = () => {
    Alert.alert("Principal", currentIdentity.getPrincipal().toString());
  };

  return (
    <>
      {isAuthenticated ? <LogoutButton identity={currentIdentity} /> : <InternetIdentityMidlewareButton />}
      <Button title="Get principal" onPress={handlePress} />
    </>
  );
}

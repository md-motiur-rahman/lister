import { useSSO } from "@clerk/expo";
import { useState } from "react";
import { Alert } from "react-native";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { router } from "expo-router";

WebBrowser.maybeCompleteAuthSession();

const useSocialAuth = () => {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);

  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (
    strategy: "oauth_google" | "oauth_apple"
  ) => {
    if (loadingStrategy) return;

    setLoadingStrategy(strategy);

    try {
      const redirectUrl = AuthSession.makeRedirectUri({
        path: "sso-callback",
      });

      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl,
      });

      if (!createdSessionId || !setActive) {
        Alert.alert("Authentication failed", "Please try again.");
        return;
      }

      await setActive({ session: createdSessionId });

      router.replace("/");
    } catch (err) {
      console.error(err);

      Alert.alert("Authentication failed", "Please try again.");
    } finally {
      setLoadingStrategy(null);
    }
  };

  return {
    loadingStrategy,
    handleSocialAuth,
  };
};

export default useSocialAuth;
import { useOAuth } from "@clerk/clerk-expo";
import { useState } from "react";
import { Alert } from "react-native";
import * as Linking from "expo-linking";

export const useSocialAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const googleOAuth = useOAuth({ strategy: "oauth_google" });
  const appleOAuth = useOAuth({ strategy: "oauth_apple" });

  const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
    setIsLoading(true);
    
    try {
      const oAuth = strategy === "oauth_google" ? googleOAuth : appleOAuth;
      
      // Create redirect URL to our callback route
      const redirectUrl = Linking.createURL("/oauth-native-callback");
      
      console.log("Starting OAuth with redirect:", redirectUrl);

      const { createdSessionId, setActive } = await oAuth.startOAuthFlow({
        redirectUrl,
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
      
      // Don't manually navigate - let the callback route handle it
    } catch (err: any) {
      console.log("OAuth Error:", err);

      // Handle user cancellation
      if (
        err.code === "user_cancelled" ||
        err.code === "UserCancelled" ||
        err.message?.toLowerCase().includes("cancel")
      ) {
        console.log("User cancelled OAuth");
        return;
      }

      const provider = strategy === "oauth_google" ? "Google" : "Apple";
      Alert.alert(
        "Authentication Error",
        `Failed to sign in with ${provider}. Please try again.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleSocialAuth };
};

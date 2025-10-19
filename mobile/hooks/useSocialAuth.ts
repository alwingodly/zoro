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
      const redirectUrl = Linking.createURL("/oauth-native-callback");
      
      console.log("Starting OAuth with redirect:", redirectUrl);

      const { createdSessionId, setActive, signIn, signUp } = await oAuth.startOAuthFlow({
        redirectUrl,
      });

      // Check if we got a session
      if (createdSessionId) {
        console.log("✅ Session created:", createdSessionId);
        
        if (setActive) {
          await setActive({ session: createdSessionId });
          console.log("✅ Session activated");
        }
      } else {
        console.log("⚠️ No session created");
        
        // Handle sign-in or sign-up flow
        if (signIn?.createdSessionId) {
          await setActive?.({ session: signIn.createdSessionId });
        } else if (signUp?.createdSessionId) {
          await setActive?.({ session: signUp.createdSessionId });
        }
      }
      
    } catch (err: any) {
      console.error("OAuth Error:", err);
      console.error("Error details:", {
        code: err.code,
        message: err.message,
        status: err.status,
      });

      // Handle user cancellation
      if (
        err.code === "user_cancelled" ||
        err.code === "UserCancelled" ||
        err.message?.toLowerCase().includes("cancel")
      ) {
        console.log("User cancelled OAuth");
        return;
      }

      // Handle 401 errors specifically
      if (err.status === 401 || err.message?.includes("401")) {
        Alert.alert(
          "Authentication Failed",
          "Unable to authenticate. Please try again or check your internet connection."
        );
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
import { useSSO } from "@clerk/clerk-expo";
import { useState } from "react";
import { Alert } from "react-native";

export const useSocialAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { startSSOFlow } = useSSO()
    const handleSocialAuth = async (strategy: 'oauth_google' | 'oauth_apple') => {
        try {
            setIsLoading(true);
            const {createdSessionId , setActive} = await startSSOFlow({ strategy });
            if(createdSessionId && setActive){
                await setActive({ session: createdSessionId });
            }
        } catch (error) {
            console.error("Social auth error:", error);
            const provider = strategy === 'oauth_google' ? 'Google' : 'Apple';
            Alert.alert("Authentication Error", `There was an issue signing in with ${provider}. Please try again.`);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        handleSocialAuth
    };
}
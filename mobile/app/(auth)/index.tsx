import { useSocialAuth } from "@/hooks/useSocialAuth";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { handleSocialAuth, isLoading } = useSocialAuth();
  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 justify-between px-8">
        <View className="flex-1 justify-center">
          <View className="items-center">
            <Image source={require("../../assets/images/auth2.png")} className="size-96" resizeMode="contain" />
          </View>
          <View className="flex-col gap-2">
            <TouchableOpacity className="flex-row justify-center items-center bg-white border border-gray-300 rounded-full py-3 px-6"
              onPress={() => handleSocialAuth("oauth_google")}
              disabled={isLoading}
              style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1, }}>
              {
                isLoading ? (
                  <ActivityIndicator className="py-1.5" size="small" color="#3BAF56" />
                ) : <View className="flex-row justify-center items-center">
                  <Image source={require("../../assets/images/google.png")} className="size-10 mr-3" resizeMode="contain" />
                  <Text className="text-black text-base font-medium">Continue with Google</Text>
                </View>
              }
            </TouchableOpacity>
            <TouchableOpacity className="flex-row justify-center items-center bg-white border border-gray-300 rounded-full py-3 px-6"
              onPress={() => handleSocialAuth("oauth_apple")}
              disabled={isLoading}
              style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1, }}>
              {
                isLoading ? (
                  <ActivityIndicator className="py-1.5" size="small" color="#3BAF56" />
                ) : <View className="flex-row justify-center items-center">
                  <Image source={require("../../assets/images/apple.png")} className="size-8 mr-3" resizeMode="contain" />
                  <Text className="text-black text-base font-medium">Continue with Apple</Text>
                </View>
              }
            </TouchableOpacity>
          </View>
          <Text className="text-center text-gray-500 text-sm mt-6 leading-4 px-2">
            By Signing up, you agree to our <Text className="text-blue-600">Terms & Conditions</Text> and <Text className="text-blue-600">Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}


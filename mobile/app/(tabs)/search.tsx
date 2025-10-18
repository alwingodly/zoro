import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons';

const TRENDING_TOPICS = [
  {
    topic: "#ReactNative",
    tweets: "120K"
  },
  {
    topic: "#JavaScript",
    tweets: "95K"
  },
  {
    topic: "#TypeScript",
    tweets: "80K"
  },
  {
    topic: "#Expo",
    tweets: "60K"
  },
  {
    topic: "#MobileDevelopment",
    tweets: "50K"
  },
  
];

const SearchScreen = () => {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='px-4 py-2 border-b border-gray-100'>
        <View className="flex-row items-center px-4 rounded-full border-gray-100">
          <Feather name="search" size={20} color="gray" />
          <TextInput
            placeholder="Search"
            className="flex-1 ml-2 py-2"
            placeholderTextColor={"#657786"}
          />
        </View>
      </View>
      <ScrollView className='flex-1' showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View className='p-4'>
          <Text className='text-xl font-bold mb-4'>Trending Topics</Text>
          {
            TRENDING_TOPICS.map((item, index) => (
              <TouchableOpacity key={index} className='flex-row justify-between items-center py-3 border-b border-gray-100'>
                <View>
                  <Text className='text-gray-500 text-sm'>{item.topic}</Text>
                  <Text className='text-gray-400 text-xs mt-1'>{item.tweets} Tweets</Text>
                </View>
                <Feather name="chevron-right" size={20} color="gray" />
              </TouchableOpacity>
            ))
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})
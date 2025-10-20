import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignOutButton from '@/components/SignOutButton'
import { useUserSync } from '@/hooks/useUserSync'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import PostComposer from '@/components/PostComposer'

const HomeScreen = () => {
  useUserSync();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className='flex-row justify-between items-center px-4 py-3 vorder-b boder-gray-100'>
        <MaterialCommunityIcons name="alpha-z-circle" size={32} color={"#3BAF56"} />
        <Text className='text-xl font-bold text-gray-900'>Home</Text>
        <SignOutButton />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className='flex-1' contentContainerStyle={{ paddingBottom: 80 }}>
       <PostComposer/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
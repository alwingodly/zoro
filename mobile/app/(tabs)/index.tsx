import { StyleSheet, Text, View } from 'react-native'
import React, { use } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignOutButton from '@/components/SignOutButton'
import { useUserSync } from '@/hooks/useUserSync'

const HomeScreen = () => {
  useUserSync();
  return (
    <SafeAreaView style={{flex:1}}>
      <Text>HomeScreen</Text>
      <SignOutButton />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
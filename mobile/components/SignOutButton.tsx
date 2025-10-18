import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useSignOut } from '@/hooks/useSignOut'

const SignOutButton = () => {
    const {handleSignOut} = useSignOut()
  return (
    <TouchableOpacity>
      <Feather name="log-out" size={24} color="#8B1A1A" onPress={handleSignOut}/>
    </TouchableOpacity>
  )
}

export default SignOutButton

const styles = StyleSheet.create({})
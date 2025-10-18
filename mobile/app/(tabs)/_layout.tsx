import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect, Tabs } from 'expo-router'
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@clerk/clerk-expo';
const TabsLayout = () => {
    const insets = useSafeAreaInsets();
    const {isSignedIn} = useAuth();
    if(!isSignedIn){
        return <Redirect href={'/(auth)'} />
    }
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: '#3BAF56', tabBarInactiveTintColor: 'gray', tabBarStyle: { height: 50 + insets.bottom, paddingBottom: 5, paddingTop: 5 } }}>
            <Tabs.Screen name="index" options={{ title:"Home", headerShown: false, tabBarIcon: ({ color, size }) => <Feather name='home' size={size} color={color} /> }} />
            <Tabs.Screen name="search" options={{title:"Search", headerShown: false, tabBarIcon: ({ color, size }) => <Feather name="search" size={size} color={color} /> }} />
            <Tabs.Screen name="messages" options={{title:"Messages", headerShown: false, tabBarIcon: ({ color, size }) => <Feather name="mail" size={size} color={color} /> }} />
            <Tabs.Screen name="notifications" options={{title:"Notifications", headerShown: false, tabBarIcon: ({ color, size }) => <Feather name="bell" size={size} color={color} /> }} />
            <Tabs.Screen name="profile" options={{title:"Profile", headerShown: false, tabBarIcon: ({ color, size }) => <Feather name="user" size={size} color={color} /> }} />
        </Tabs>
    )
}

export default TabsLayout

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ModalsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="notifications"
        options={{
            presentation: 'modal',
            headerShown: false,
        }}
        />
      <Stack.Screen
        name="help-support"
        options={{
            presentation: 'modal',
            headerShown: false,
        }}
        />
      <Stack.Screen
        name="deposit"
        options={{
            presentation: 'fullScreenModal',
            headerShown: false,
            animation: "slide_from_bottom",
            fullScreenGestureEnabled: true,
            
        }}
        />
    </Stack>
  )
}

export default ModalsLayout

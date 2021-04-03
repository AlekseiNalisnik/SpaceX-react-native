import React, { useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Navbar } from './components/Navbar'
import { THEME } from './theme'
import { MainScreen } from './screens/MainScreen'
import { LaunchScreen } from './screens/LaunchScreen'
import { LaunchContext } from './context/Launch/LaunchContext'
import { ScreenContext } from './context/screen/screenContext'

export const MainLayout = () => {
  const { LaunchId } = useContext(ScreenContext)

  return (
    <View>
      <Navbar title='SpaceX api App!' />
      <View style={styles.container}>
        {LaunchId ? <LaunchScreen /> : <MainScreen />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20
  }
})

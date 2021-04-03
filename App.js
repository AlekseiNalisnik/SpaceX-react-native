import React, { useState } from 'react'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

import { LaunchState } from './src/context/Launch/LaunchState'
import { ScreenState } from './src/context/screen/ScreenState'
import { MainLayout } from './src/MainLayout'

async function loadApplication() {
  await Font.loadAsync({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Regular.ttf')
  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false)

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={err => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    )
  }

  return (
    <ScreenState>
      <LaunchState>
        <MainLayout />
      </LaunchState>
    </ScreenState>
  )
}

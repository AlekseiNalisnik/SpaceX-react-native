import React, { useState, useEffect, useContext, useCallback } from 'react'
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native'
import { SelectLaunchYear } from '../components/SelectLaunchYear'
import { Launch } from '../components/Launch'
import { THEME } from '../theme'
import { LaunchContext } from '../context/Launch/LaunchContext'
import { ScreenContext } from '../context/screen/screenContext'

export const MainScreen = () => {
  const { addLaunch, Launchs, removeLaunch, fetchLaunches, findLaunchYear } = useContext(LaunchContext)
  const { changeScreen } = useContext(ScreenContext)
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
  )

  const loadLaunchs = useCallback(async () => await fetchLaunches(), [fetchLaunches]);

  useEffect(() => {
    loadLaunchs()
  }, [])

  useEffect(() => {
    const update = () => {
      const width =
        Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
      setDeviceWidth(width)
    }

    Dimensions.addEventListener('change', update)

    return () => {
      Dimensions.removeEventListener('change', update)
    }
  })

  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={Launchs}
        renderItem={({ item }) => (
          <Launch Launch={item} onRemove={removeLaunch} onOpen={changeScreen} />
        )}
      />
    </View>
  )

  if (Launchs.length === 0) {
    content = (
      <View style={styles.imgWrap}>
        <Image
          style={styles.image}
          source={require('../../assets/no-items.png')}
        />
      </View>
    )
  }

  return (
    <View>
      <SelectLaunchYear findLaunchYear={findLaunchYear} />

      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  imgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 300
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
})

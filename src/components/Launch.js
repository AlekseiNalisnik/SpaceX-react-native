import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { AppText } from './ui/AppText'

export const Launch = ({ Launch, onRemove, onOpen }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => onOpen(Launch.id)}
      onLongPress={onRemove.bind(null, Launch.id)}
    >
      <View style={styles.Launch}>
        <AppText style={styles.wrapper}>
          <AppText style={styles.label}>Rocket: </AppText>
          <AppText style={styles.item}>{Launch.rocket.rocket_name}</AppText>
        </AppText>

        <AppText style={styles.wrapper}>
          <AppText style={styles.label}>Launch date: </AppText>
          <AppText style={styles.item}>{Date(Date.parse(Launch.launch_date_local))}</AppText>
        </AppText>
        
        <AppText style={styles.wrapper}>
          <AppText style={styles.label}>Regime: </AppText>
          <AppText style={styles.item}>{Launch.rocket.second_stage.payloads[0].orbit_params.regime}</AppText>
        </AppText>

        <AppText style={styles.wrapper}>
          <AppText style={styles.label}>Launch success: </AppText>
          <AppText style={styles.item}>{Launch.launch_success ? 'Yes' : 'No'}</AppText>
        </AppText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  Launch: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 5,
    marginBottom: 10,
    flexWrap: 'wrap'
  },
  wrapper: {
    width: '100%',
  },
  label: {
    color: 'red',
  },
  item: {
    color: 'blue'
  }
})

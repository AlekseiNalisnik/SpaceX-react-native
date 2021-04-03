import React, { useReducer, useContext } from 'react'
import { Alert } from 'react-native'
import { LaunchContext } from './LaunchContext'
import { LaunchReducer } from './LaunchReducer'
import { ADD_Launch, REMOVE_Launch, UPDATE_Launch, FETCH_LAUNCHES, FIND_LAUNCH_YEAR } from '../types'
import { ScreenContext } from '../screen/screenContext'

const baseUrl = 'https://api.spacexdata.com/v3/launches?start=2017-06-22&end=2017-06-25';

export const LaunchState = ({ children }) => {
  const initialState = {
    Launchs: []
  }
  const { changeScreen } = useContext(ScreenContext)
  const [state, dispatch] = useReducer(LaunchReducer, initialState)

  const addLaunch = title => dispatch({ type: ADD_Launch, title })

  const findLaunchYear = async (year) => {
    const filteredLaunches = await fetch(`${baseUrl}&launch_year=${year}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const data = await filteredLaunches.json();
    const Launchs = Object.keys(data).map(key => ({ ...data[key], id: Date.now().toString() + key}));
    dispatch({ type: FIND_LAUNCH_YEAR, Launchs });
  }

  const removeLaunch = id => {
    const Launch = state.Launchs.find(t => t.id === id)
    Alert.alert(
      'Удаление элемента',
      `Вы уверены, что хотите удалить "${Launch.title}"?`,
      [
        {
          text: 'Отмена',
          style: 'cancel'
        },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => {
            changeScreen(null)
            dispatch({ type: REMOVE_Launch, id })
          }
        }
      ],
      { cancelable: false }
    )
  }

  const updateLaunch = (id, title) => dispatch({ type: UPDATE_Launch, id, title })

  const fetchLaunches = async () => {
    const launches = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    let data = await launches.json();
    const Launchs = Object.keys(data).map(key => ({ ...data[key], id: Date.now().toString() + key}));
    dispatch({ type: FETCH_LAUNCHES, Launchs });
  }

  return (
    <LaunchContext.Provider
      value={{
        Launchs: state.Launchs,
        addLaunch,
        removeLaunch,
        updateLaunch,
        fetchLaunches,
        findLaunchYear
      }}
    >
      {children}
    </LaunchContext.Provider>
  )
}

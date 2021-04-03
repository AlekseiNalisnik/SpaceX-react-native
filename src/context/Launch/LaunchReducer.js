import { ADD_Launch, REMOVE_Launch, UPDATE_Launch, FETCH_LAUNCHES, FIND_LAUNCH_YEAR } from '../types'

const handlers = {
  [ADD_Launch]: (state, { title }) => ({
    ...state,
    Launchs: [
      ...state.Launchs,
      {
        id: Date.now().toString(),
        title
      }
    ]
  }),
  [REMOVE_Launch]: (state, { id }) => ({
    ...state,
    Launchs: state.Launchs.filter(Launch => Launch.id !== id)
  }),
  [UPDATE_Launch]: (state, { title, id }) => ({
    ...state,
    Launchs: state.Launchs.map(Launch => {
      if (Launch.id === id) {
        Launch.title = title
      }
      return Launch
    })
  }),
  [FETCH_LAUNCHES]: (state, data) => ({ ...state, ...data }),
  [FIND_LAUNCH_YEAR]: (state, data) => {
    
    console.log('state - ', state);
    console.log('year - ', data);
  
    return { ...state, ...data }
  },
  DEFAULT: state => state
}

export const LaunchReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}

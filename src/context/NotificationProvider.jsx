import { createContext, useReducer } from 'react'
import notificationReducer from '../reducers/notificationReducer'
import NotificationBox from '../components/NotificationBox'

const NotificationContext = createContext(null)

const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, {})

  return (
    <NotificationContext.Provider value={{ dispatch }}>
      {children}
      {(!state.notify) || <NotificationBox message={state.notify.message} typeMessage={state.notify.typeMessage} duration={state.notify.duration || 3000} dispatch={dispatch} />}
    </NotificationContext.Provider>
  )
}

export { NotificationProvider }

export default NotificationContext

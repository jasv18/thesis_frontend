import { useContext } from 'react'
import NotificationContext from '../context/NotificationProvider'

// this hook alters the behavior of useEffects and needs to be refactored

const useNotification = () => {
  const { dispatch } = useContext(NotificationContext)

  return (props) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: { ...props } })
  }
}

export default useNotification

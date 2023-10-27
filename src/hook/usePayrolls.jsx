import { useState, useEffect, useContext } from 'react'
import databaseService from '../services/database'
import uniqueId from '../services/uniqueId'
import { MESSAGE_TYPES } from '../consts'
import NotificationContext from '../context/NotificationProvider'

const usePayrolls = ({ serverSelected, databaseSelected }) => {
  const [payrolls, setPayrolls] = useState(null)
  const [isLoadingPayrolls, setLoadingPayrolls] = useState(false)
  const { dispatch } = useContext(NotificationContext)

  useEffect(() => {
    const fethPayrolls = async () => {
      setPayrolls(null)
      try {
        if (databaseSelected) {
          setLoadingPayrolls(true)
          const response = await databaseService.getPayrolls(serverSelected, databaseSelected.datname)
          if (response && response.success) {
            if (!ignore) {
              const indexedData = response.data.map(value => ({ ...value, id: uniqueId() }))
              setPayrolls(indexedData)
            }
          } else {
            dispatch({ type: 'ADD_NOTIFICATION', payload: { message: 'Recuperación de nóminas fallida', typeMessage: MESSAGE_TYPES.ERROR, duration: 4000 } })
          }
        }
      } finally {
        setLoadingPayrolls(false)
      }
    }
    let ignore = false
    fethPayrolls()
    return () => {
      ignore = true
    }
  }, [databaseSelected, serverSelected, dispatch])

  return { isLoadingPayrolls, payrolls }
}

export default usePayrolls

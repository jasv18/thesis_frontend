import { useState, useEffect, useContext } from 'react'
import connectionService from '../services/connection'
import uniqueId from '../services/uniqueId'
import { MESSAGE_TYPES } from '../consts'
import NotificationContext from '../context/NotificationProvider'

const useDatabases = ({ serverSelected }) => {
  const [dbs, setDbs] = useState(null)
  const [isLoadingDatabase, setLoadingDatabase] = useState(false)
  const { dispatch } = useContext(NotificationContext)

  useEffect(() => {
    const fetchDatabases = async () => {
      setDbs(null)
      try {
        if (serverSelected) {
          setLoadingDatabase(true)
          const response = await connectionService.getDatabases(serverSelected)
          if (response && response.success) {
            if (!ignore) {
              const indexedData = response.data.map(value => ({ ...value, id: uniqueId() }))
              setDbs(indexedData)
            }
          } else {
            dispatch({ type: 'ADD_NOTIFICATION', payload: { message: 'Recuperación de bases de datos fallida', typeMessage: MESSAGE_TYPES.ERROR, duration: 4000 } })
          }
        }
      } finally {
        setLoadingDatabase(false)
      }
    }
    let ignore = false
    fetchDatabases()
    return () => { ignore = true }
  }, [serverSelected, dispatch])

  return { isLoadingDatabase, dbs }
}

export default useDatabases

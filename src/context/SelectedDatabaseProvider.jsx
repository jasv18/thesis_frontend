import { useReducer, createContext } from 'react'
import selectDatabaseReducer from '../reducers/selectDatabaseReducer'

const SelectedDatabaseContext = createContext(null)

const SelectedDatabaseProvider = ({ children }) => {
  const [databaseSelected, selectDatabaseDispatcher] = useReducer(selectDatabaseReducer, null)

  return (
    <SelectedDatabaseContext.Provider value={{ databaseSelected, selectDatabaseDispatcher }}>
      {children}
    </SelectedDatabaseContext.Provider>
  )
}

export { SelectedDatabaseProvider }

export default SelectedDatabaseContext

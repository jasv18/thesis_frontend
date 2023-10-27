import { useReducer, createContext } from 'react'
import selectServerReducer from '../reducers/selectServerReducer'

const SelectedServerContext = createContext(null)

const SelectedServerProvider = ({ children }) => {
  const [serverSelected, selectServerDispatcher] = useReducer(selectServerReducer, null)

  return (
    <SelectedServerContext.Provider value={{ serverSelected, selectServerDispatcher }}>
      {children}
    </SelectedServerContext.Provider>
  )
}

export { SelectedServerProvider }

export default SelectedServerContext

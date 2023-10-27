import { createContext, useReducer } from 'react'
import serverReducer from '../reducers/serverReducer'

const ServersContext = createContext(null)

const ServerProvider = ({ children }) => {
  const [servers, serverDispatcher] = useReducer(serverReducer, [])

  return (
    <ServersContext.Provider value={{ servers, serverDispatcher }}>
      {children}
    </ServersContext.Provider>
  )
}

export { ServerProvider }

export default ServersContext

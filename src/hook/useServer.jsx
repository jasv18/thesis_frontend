import { useContext } from 'react'
import ServersContext from '../context/serversContext'

const useServer = () => useContext(ServersContext)

export default useServer

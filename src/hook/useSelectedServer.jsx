import { useContext } from 'react'
import SelectedServerContext from '../context/SelectedServerProvider'

const useSelectedServer = () => useContext(SelectedServerContext)

export default useSelectedServer

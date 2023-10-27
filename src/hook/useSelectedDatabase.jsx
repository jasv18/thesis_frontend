import { useContext } from 'react'
import SelectedDatabaseContext from '../context/SelectedDatabaseProvider'

const useSelectedDatabase = () => useContext(SelectedDatabaseContext)

export default useSelectedDatabase

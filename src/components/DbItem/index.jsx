import useSelectedDatabase from '../../hook/useSelectedDatabase'
import DatabaseIcon from '../../icons/DatabaseIcon'

const DbItem = ({ db }) => {
  const { id, datname } = db
  const { databaseSelected, selectDatabaseDispatcher } = useSelectedDatabase()
  const handleClick = (e) => {
    if (databaseSelected && e.target.htmlFor === databaseSelected.id) {
      e.preventDefault()
      selectDatabaseDispatcher({ type: 'DESELECT_DATABASE' })
    }
  }
  const handleChange = () => selectDatabaseDispatcher({ type: 'SELECT_DATABASE', payload: db })
  return (
    <div>
      <input className='peer/db hidden' type='radio' name='dbs' id={id} checked={databaseSelected?.id === id} onChange={handleChange} />
      <label htmlFor={id} onClick={handleClick} className='block rounded-lg min-w-max py-1 bg-gray-300 hover:bg-gray-400 text-gray-900 peer-checked/db:bg-gray-900 peer-checked/db:hover:bg-gray-600 peer-checked/db:text-white peer-checked/db:font-bold'>
        <DatabaseIcon className='inline-block mx-3 my-2 h-6' />
        {datname}
      </label>
    </div>
  )
}

export default DbItem

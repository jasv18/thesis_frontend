import useSelectedServer from '../../hook/useSelectedServer'
import ServerIcon from '../../icons/serverIcon'

const ServerItem = ({ server }) => {
  const { id, servername } = server
  const { serverSelected, selectServerDispatcher } = useSelectedServer()
  const handleClick = (e) => {
    if (serverSelected && e.target.htmlFor === serverSelected.id) {
      e.preventDefault()
      selectServerDispatcher({ type: 'DESELECT_SERVER' })
    }
  }
  const handleChange = () => selectServerDispatcher({ type: 'SELECT_SERVER', payload: server })
  return (
    <div>
      <input className='peer/server hidden' type='radio' name='servers' id={id} checked={serverSelected?.id === id} onChange={handleChange} />
      <label htmlFor={id} onClick={handleClick} className='block rounded-lg min-w-max py-1 bg-gray-300 hover:bg-gray-400 text-gray-900 peer-checked/server:bg-gray-900 peer-checked/server:hover:bg-gray-600 peer-checked/server:text-white peer-checked/server:font-bold'>
        <ServerIcon className='inline-block mx-3 my-2 h-6' />
        {servername}
      </label>
    </div>
  )
}

export default ServerItem

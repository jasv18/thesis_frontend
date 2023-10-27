import ServerIcon from '../../icons/serverIcon'

const ServerItemToRemove = ({ server, handleChange, selectedServerToRemove }) => {
  const { id, servername } = server
  return (
    <div>
      <input type='checkbox' id={id} name='serversToRemove' value={id} checked={selectedServerToRemove?.includes(id)} onChange={handleChange} className='peer/serverRemove hidden' />
      <label htmlFor={id} className='block rounded-lg min-w-max py-1 bg-gray-300 hover:bg-gray-400 text-gray-900 peer-checked/serverRemove:bg-gray-900 peer-checked/serverRemove:hover:bg-gray-600 peer-checked/serverRemove:text-white peer-checked/serverRemove:font-bold'>
        <ServerIcon className='inline-block mx-3 my-2 h-6' />
        {servername}
      </label>
    </div>
  )
}

export default ServerItemToRemove

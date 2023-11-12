import { useState } from 'react'
import ListOf from '../ListOf'
import ServerItemToRemove from '../ServerItemToRemove'
import useServer from '../../hook/useServer'

const ListOfServersToRemove = ({ servers, handleRemovingVisivility }) => {
  const [selectedServerToRemove, setSelectedServerToRemove] = useState([])
  const { serverDispatcher } = useServer()

  const handleChange = ({ target }) => {
    if (target.checked) {
      setSelectedServerToRemove(selectedServerToRemove.concat(target.value))
    } else {
      setSelectedServerToRemove(selectedServerToRemove.filter(serverToRemove => serverToRemove !== target.value))
    }
  }

  const handleRemoveClick = () => {
    serverDispatcher({ type: 'REMOVE_SERVERS_IN', payload: { ids: selectedServerToRemove } })
    setSelectedServerToRemove([])
    handleRemovingVisivility()
  }

  return (
    <ListOf>
      {servers.map(server => <ServerItemToRemove key={server.id} server={server} handleChange={handleChange} />)}
      <div className='flex justify-end gap-2 pb-3'>
        {
          (selectedServerToRemove.length > 0)
            ? (
              <button type='button' onClick={handleRemoveClick} className='text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700'>
                <strong>Remover</strong>
              </button>
              )
            : null
        }
        <button type='button' onClick={handleRemovingVisivility} className='text-white bg-gray-800 hover:bg-gray-700 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-100 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-100'>
          <strong>Cancelar</strong>
        </button>
      </div>
    </ListOf>
  )
}

export default ListOfServersToRemove

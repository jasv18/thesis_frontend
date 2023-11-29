import { useState } from 'react'
import Frame from '../Frame'
import LoginDb from '../LoginDb'
import useServer from '../../hook/useServer'
import ListOfServers from '../ListOfServers'
import ServerAddIcon from '../../icons/ServerAddIcon'
import ActionButton from '../ActionButton'
import ServerRemoveIcon from '../../icons/ServerRemoveIcon'
import ListOfServersToRemove from '../ListOfServersToRemove'
import useSelectedServer from '../../hook/useSelectedServer'

const Navigation = () => {
  const { servers } = useServer()
  const [showLogin, setShowLogin] = useState(false)
  const [showRemoveServers, setShowRemoveServers] = useState(false)
  const { selectServerDispatcher } = useSelectedServer()

  const handleLoginVisibility = () => {
    setShowLogin(!showLogin)
  }

  const handleRemovingVisivility = () => {
    selectServerDispatcher({ type: 'DESELECT_SERVER' })
    setShowRemoveServers(!showRemoveServers)
  }

  return (
    <nav className='min-w-max md:basis-2/5 md:h-full h-min border-2 border-solid flex flex-col justify-start gap-8 p-6 bg-gray-200 md:overflow-auto'>

      <Frame tittle='Operaciones' className='border-light-pink'>
        <div className='flex gap-2 justify-start'>
          <ActionButton tittle='Añadir servidor' handleOnClick={handleLoginVisibility} disabled={showLogin}><ServerAddIcon className='text-white' /></ActionButton>
          {(servers.length > 0) ? <ActionButton tittle='Remover servidor' handleOnClick={handleRemovingVisivility} disabled={showRemoveServers}><ServerRemoveIcon className='text-white' /></ActionButton> : null}
        </div>
      </Frame>

      {
        (showLogin)
          ? (
            <Frame tittle='Añadir servidor' className='border-light-pink'>
              <LoginDb handleLoginVisibility={handleLoginVisibility} />
            </Frame>
            )
          : null
      }

      {
        (servers.length > 0)
          ? (
            <Frame tittle={showRemoveServers ? 'Remover' : 'Conexiones'} className='border-light-pink'>
              {
                (showRemoveServers)
                  ? (
                    <ListOfServersToRemove handleRemovingVisivility={handleRemovingVisivility} servers={servers} />
                    )
                  : (
                    <ListOfServers servers={servers} />
                    )
              }
            </Frame>
            )
          : null
      }

    </nav>
  )
}

export default Navigation

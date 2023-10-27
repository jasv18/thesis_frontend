import { useState } from 'react'
import connectionService from '../../services/connection'
import useNotification from '../../hook/useNotification'
import useServer from '../../hook/useServer'
import uniqueId from '../../services/uniqueId'
import { MESSAGE_TYPES } from '../../consts'
import Spinner1 from '../../icons/Spinner1'

const defaultFields = {
  servername: '', host: '', user: '', password: '', port: ''
}

export default function LoginDb ({
  handleLoginVisibility
}) {
  const [field, setField] = useState(defaultFields)
  const [loading, setLoading] = useState(false)
  const dispatch = useNotification()
  const { serverDispatcher } = useServer()

  const handleChangeEvent = (e) => setField({ ...field, [e.target.name]: e.target.value })

  const addServer = async () => {
    setLoading(true)
    const response = await connectionService.validateConnection(field)
    if (response && response.success) {
      handleLoginVisibility()
      serverDispatcher({ type: 'ADD_SERVER', payload: { ...field, id: uniqueId() } })
      dispatch({ message: 'Servidor agregado satisfactoriamente', typeMessage: MESSAGE_TYPES.SUCCESS, duration: 4000 })
    } else {
      dispatch({ message: 'Validación fallida', typeMessage: MESSAGE_TYPES.ERROR, duration: 4000 })
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addServer()
  }

  return (
    <form onSubmit={handleSubmit} aria-disabled>
      <div className='grid gap-4 mr-2 text-base'>
        <div>
          <label htmlFor='servername' className='block mb-2 text-gray-900'>Nombre  <sup className='text-dark-pink' title='Requerido'>*</sup></label>
          <input
            type='text'
            name='servername'
            id='servername'
            className='border-2 border-gray-400 rounded-lg p-2 w-10/12 disabled:bg-gray-100'
            onChange={handleChangeEvent}
            autoComplete='off'
            autoFocus
            required
            value={field.servername}
            placeholder='Nombre'
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor='host' className='block mb-2 text-gray-900'>Nombre / IP servidor  <sup className='text-dark-pink' title='Requerido'>*</sup></label>
          <input
            type='text'
            name='host'
            id='host'
            className='border-2 border-gray-400 rounded-lg p-2 w-10/12 disabled:bg-gray-100'
            onChange={handleChangeEvent}
            autoComplete='off'
            required
            value={field.host}
            placeholder='Ej.: www.example.com, 192.168.0.x'
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor='user' className='block mb-2 text-gray-900'>Usuario  <sup className='text-dark-pink' title='Requerido'>*</sup></label>
          <input
            type='text'
            name='user'
            id='user'
            className='border-2 border-gray-400 rounded-lg p-2 w-10/12 disabled:bg-gray-100'
            onChange={handleChangeEvent}
            autoComplete='off'
            required
            value={field.user}
            placeholder='usuario'
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor='password' className='block mb-2 text-gray-900'>Contraseña  <sup className='text-dark-pink' title='Requerido'>*</sup></label>
          <input
            type='password'
            name='password'
            id='password'
            className='border-2 border-gray-400 rounded-lg p-2 w-10/12 disabled:bg-gray-100'
            onChange={handleChangeEvent}
            placeholder='Contraseña'
            autoComplete='on'
            required
            value={field.password}
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor='port' className='block mb-2 text-gray-900'>Puerto</label>
          <input
            type='number'
            name='port'
            id='port'
            className='border-2 border-gray-400 rounded-lg p-2 w-10/12 disabled:bg-gray-100'
            placeholder='Puerto postgres; default: 5432'
            min='1024'
            max='49151'
            onChange={handleChangeEvent}
            value={field.port}
            disabled={loading}
          />
        </div>
        <div className='flex justify-end gap-2'>
          {
            loading
              ? (
                <button type='button' className='text-gray-900 bg-white hover:bg-gray-100 disabled:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:disabled:bg-gray-700' disabled>
                  <Spinner1 className='w-6 h-6 mr-2 animate-spin fill-blue-600' />
                  <strong>Validando...</strong>
                </button>
                )
              : (
                <>
                  <button type='submit' className='text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700'>
                    <strong>Añadir</strong>
                  </button>
                  <button onClick={handleLoginVisibility} type='button' className='text-white bg-gray-800 hover:bg-gray-700 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-100 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-100'>
                    <strong>Cancelar</strong>
                  </button>
                </>
                )
          }
        </div>
      </div>
    </form>
  )
}

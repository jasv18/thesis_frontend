import { useState, useEffect, useContext, useRef } from 'react'
import BlocksShuffleThree from '../../icons/BlocksShuffleThree'
import ListOfPayrolls from '../ListOfPayrolls'
import Spinner1 from '../../icons/Spinner1'
import useSelectedServer from '../../hook/useSelectedServer'
import databaseService from '../../services/database'
import { MESSAGE_TYPES } from '../../consts'
import useSelectedDatabase from '../../hook/useSelectedDatabase'
import NotificationContext from '../../context/NotificationProvider'
import usePayrolls from '../../hook/usePayrolls'

const Opening = () => {
  const [datName, setDatName] = useState('')
  const [selectedPayroll, setSelectedPayroll] = useState([])
  const [isOpsLoading, setIsOpsLoading] = useState(false)
  const { serverSelected, selectServerDispatcher } = useSelectedServer()
  const { databaseSelected, selectDatabaseDispatcher } = useSelectedDatabase()
  const { isLoadingPayrolls, payrolls } = usePayrolls({ serverSelected, databaseSelected })
  const { dispatch } = useContext(NotificationContext)
  const controller = useRef(null)

  useEffect(() => {
    controller.current = new AbortController()
    return () => {
      controller.current.abort()
    }
  }, [databaseSelected])

  useEffect(() => {
    setSelectedPayroll([])
    setDatName('')
  }, [databaseSelected])

  const handleChange = ({ target }) => {
    if (target.checked) {
      setSelectedPayroll(selectedPayroll.concat(target.value))
    } else {
      setSelectedPayroll(selectedPayroll.filter(payroll => payroll !== target.value))
    }
  }

  const handleInputChange = ({ target }) => {
    const regex = /^[A-Za-z0-9_]*$/g
    if (target.value === '' || regex.test(target.value)) {
      setDatName(target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsOpsLoading(true)
    const response = await databaseService.generateNewDb(serverSelected, databaseSelected.datname, datName, selectedPayroll, controller.current.signal)
    if (response && response.success) {
      dispatch({ type: 'ADD_NOTIFICATION', payload: { message: 'Apertura realizada satisfactoriamente.', typeMessage: MESSAGE_TYPES.SUCCESS, duration: 4000 } })
      selectDatabaseDispatcher({ type: 'DESELECT_DATABASE' })
      selectServerDispatcher({ type: 'SELECT_SERVER', payload: serverSelected })
    } else {
      dispatch({ type: 'ADD_NOTIFICATION', payload: { message: 'Apertura de bases de datos inconclusa.', typeMessage: MESSAGE_TYPES.WARNING, duration: 4000 } })
    }
    setIsOpsLoading(false)
  }

  const handleCancellation = () => selectDatabaseDispatcher({ type: 'DESELECT_DATABASE' })

  if (isLoadingPayrolls) {
    return (
      <div className='md:h-full md:flex-[7] flex place-content-center place-items-center text-light-pink'>
        <BlocksShuffleThree className='h-16 m-0' />
      </div>
    )
  }

  if (databaseSelected && payrolls !== null) {
    return (
      <article className='md:flex-[7] border-2 border-dark-blue rounded flex flex-col h-full'>
        <h2 className='w-full border-b-4 border-b-dark-blue text-dark-blue border-2 text-center rounded uppercase font-bold text-sm px-3'>aperturar bd</h2>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 p-4 text-base min-h-max'>
            <div>
              <label htmlFor='newdatabasename' className='block mb-2 text-gray-900'>
                Nombre de base de datos <sup className='text-dark-pink' title='Requerido'>*</sup>
              </label>
              <input
                type='text'
                className='border-2 border-gray-400 rounded-lg p-2 w-10/12 disabled:bg-gray-100'
                name='newdatabasename'
                id='newdatabasename'
                autoComplete='off'
                placeholder='Nombre de base de datos'
                required
                autoFocus
                onChange={handleInputChange}
                maxLength={40}
                value={datName}
                disabled={isOpsLoading}
              />
            </div>
            {
              (Array.isArray(payrolls) && payrolls.length !== 0)
                ? (
                  <div>
                    <ListOfPayrolls payrolls={payrolls} handleChange={handleChange} selectedPayroll={selectedPayroll} setSelectedPayroll={setSelectedPayroll} />
                  </div>
                  )
                : (
                  <div className='uppercase font-semibold text-dark-pink min-h-[50px] h-[100px] flex justify-center items-center'>
                    No hay nóminas
                  </div>
                  )
            }
            <div className='flex justify-end gap-2'>
              {
                isOpsLoading
                  ? (
                    <button type='button' className='text-gray-900 bg-white hover:bg-gray-100 disabled:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:disabled:bg-gray-700' disabled>
                      <Spinner1 className='w-6 h-6 mr-2 animate-spin fill-blue-600' />
                      <strong>En proceso...</strong>
                    </button>
                    )
                  : (
                    <>
                      <button type='submit' className='text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700'>
                        <strong>Generar</strong>
                      </button>
                      <button onClick={handleCancellation} type='button' className='text-white bg-gray-800 hover:bg-gray-700 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-100 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-100'>
                        <strong>Cancelar</strong>
                      </button>
                    </>
                    )
              }
            </div>
          </div>
        </form>
      </article>
    )
  }

  if (databaseSelected && payrolls === null) {
    return (
      <div className='md:flex-[7] md:h-full h-min w-full flex place-content-center place-items-center text-light-pink uppercase font-bold sm:text-sm text-xs md:my-0 my-10 text-center'>
        No se han recuperado nóminas
      </div>
    )
  }

  return (
    <div className='md:flex-[7] md:h-full h-min w-full flex place-content-center place-items-center text-light-pink uppercase font-bold sm:text-sm text-xs md:my-0 my-10 text-center'>
      No hay base de datos seleccionada
    </div>
  )
}

export default Opening

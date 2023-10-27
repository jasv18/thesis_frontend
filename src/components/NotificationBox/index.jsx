import { useEffect } from 'react'
import InformationIcon from '../../icons/InformationIcon'
import WarningIcon from '../../icons/WarningIcon'
import SuccessIcon from '../../icons/SuccessIcon'
import UnknownIcon from '../../icons/UnknownIcon'
import ErrorIcon from '../../icons/ErrorIcon'
import { MESSAGE_TYPES } from '../../consts'

const notificationStyle = 'w-full h-full sm:rounded-lg py-3 px-10 bg-opacity-80 shadow-lg shadow-gray-500 text-white text-sm sm:text-lg font-semibold font-sans flex gap-5 place-items-center justify-start'

const getBoxAttributes = (typeMessage) => {
  if (typeMessage === MESSAGE_TYPES.ERROR) return { bgcolor: 'bg-red-700', image: <ErrorIcon className='h-full' /> }
  if (typeMessage === MESSAGE_TYPES.INFO) return { bgcolor: 'bg-sky-600', image: <InformationIcon className='h-full' /> }
  if (typeMessage === MESSAGE_TYPES.WARNING) return { bgcolor: 'bg-amber-600', image: <WarningIcon className='h-full' /> }
  if (typeMessage === MESSAGE_TYPES.SUCCESS) return { bgcolor: 'bg-emerald-600', image: <SuccessIcon className='h-full' /> }
  return { bgcolor: 'bg-slate-400', image: <UnknownIcon className='h-full' /> }
}

const NotificationBox = props => {
  const { dispatch, message, typeMessage, duration } = props

  useEffect(() => {
    setTimeout(() => dispatch({ type: 'REMOVE_NOTIFICATION' }), duration)
  }, [duration, dispatch])

  const { bgcolor, image } = getBoxAttributes(typeMessage)

  return (
    <div className='z-40 fixed bottom-0 mb-20 h-16 w-full sm:w-1/2 sm:left-1/4 sm:h-20'>
      <div className={`${notificationStyle} ${bgcolor}`}>
        {image}
        {message}
      </div>
    </div>
  )
}

export default NotificationBox

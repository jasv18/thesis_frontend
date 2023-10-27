const ActionButton = ({ tittle, children, handleOnClick, disabled, className }) => {
  return (
    <button className={`bg-gray-900 hover:bg-gray-500 foc text-white w-14 rounded-lg px-2 py-2 focus:ring-2 focus:ring-offset-1 focus:ring-gray-900 disabled:bg-gray-400 ${className}`} title={tittle} type='button' disabled={disabled} onClick={handleOnClick}>{children}</button>
  )
}

export default ActionButton

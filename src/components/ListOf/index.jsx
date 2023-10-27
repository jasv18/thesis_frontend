const ListOf = ({ children }) => {
  return (
    <div className='overflow-y-auto pe-2 min-h-[150px] h-[250px] flex flex-col gap-2'>
      {children}
    </div>
  )
}

export default ListOf

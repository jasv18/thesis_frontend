import ListOfDbs from '../ListOfDbs'
import Opening from '../Opening'
import useDatabases from '../../hook/useDatabases'
import BlocksShuffleThree from '../../icons/BlocksShuffleThree'
import { useEffect } from 'react'
import useSelectedDatabase from '../../hook/useSelectedDatabase'

const ContentFrame = ({ children, tittle }) => {
  return (
    <article className='max-h-min md:h-full border-2 border-dark-blue rounded flex flex-col'>
      <h1 className='w-full bg-dark-blue text-light-gray border-2 text-center rounded uppercase px-3 font-bold'>{tittle}</h1>
      <div className='flex p-4 flex-col md:flex-row min-h-min md:h-full gap-1'>
        {children}
      </div>
    </article>
  )
}

const SimpleFrame = ({ children }) => (<div className='sm:h-full w-full flex place-content-center place-items-center text-light-pink'>{children}</div>)

const LoadingComponent = () => <SimpleFrame><BlocksShuffleThree className='h-16 m-0' /></SimpleFrame>

const MainContentFrame = ({ tittle, server }) => {
  const { isLoadingDatabase, dbs } = useDatabases({ serverSelected: server })
  const { selectDatabaseDispatcher } = useSelectedDatabase()

  useEffect(() => () => selectDatabaseDispatcher({ type: 'DESELECT_DATABASE' }), [selectDatabaseDispatcher])

  if (isLoadingDatabase) {
    return <LoadingComponent />
  }

  if (dbs && dbs.length === 0) {
    return (
      <ContentFrame tittle={tittle}>
        <div className='md:h-full w-full flex place-content-center place-items-center text-light-pink uppercase font-bold md:text-md text-xs h-max text-center'>
          No hay base de datos
        </div>
      </ContentFrame>
    )
  }

  if (dbs && dbs.length !== 0) {
    return (
      <ContentFrame tittle={tittle}>
        <article className='md:basis-2/5 border-2 border-dark-blue md:max-h-full min-h-min rounded flex flex-col'>
          <h2 className='w-full border-b-4 border-b-dark-blue text-dark-blue border-2 text-center rounded uppercase font-bold text-sm px-3'>bds</h2>
          <div className='py-4 pl-4 pr-2 md:h-full'><ListOfDbs dbs={dbs} /></div>
        </article>
        <Opening />
      </ContentFrame>
    )
  }

  return (
    <ContentFrame tittle={tittle}>
      <div className='md:h-full w-full flex place-content-center place-items-center text-light-pink uppercase font-bold md:text-md text-xs h-max text-center'>
        no se recuperaron bases de datos
      </div>
    </ContentFrame>
  )
}

export default MainContentFrame

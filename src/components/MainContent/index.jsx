import useSelectedServer from '../../hook/useSelectedServer'
import MainContentEmpty from '../MainContentEmpty'
import MainContentFrame from '../MainContentFrame'

const MainContent = () => {
  const { serverSelected } = useSelectedServer()

  if (serverSelected) {
    return (
      <main className='md:flex-[7] sm:h-full min-h-min w-full md:min-h-[760px] border-2 border-solid p-6 bg-gray-200 md:overflow-hidden'>
        <MainContentFrame tittle={serverSelected.servername} server={serverSelected} />
      </main>
    )
  }
  return <MainContentEmpty />
}

export default MainContent

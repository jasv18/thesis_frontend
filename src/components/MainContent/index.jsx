import useSelectedServer from '../../hook/useSelectedServer'
import MainContentEmpty from '../MainContentEmpty'
import MainContentFrame from '../MainContentFrame'

const MainContent = () => {
  const { serverSelected } = useSelectedServer()

  if (serverSelected) {
    return (
      <main className='md:flex-grow md:h-full h-min w-full border-2 border-solid p-6 bg-gray-200'>
        <MainContentFrame tittle={serverSelected.servername} server={serverSelected} />
      </main>
    )
  }
  return <MainContentEmpty />
}

export default MainContent

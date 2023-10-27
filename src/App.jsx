import { useEffect } from 'react'
import Navigation from './components/Navegation'
import MainContent from './components/MainContent'
import { SelectedDatabaseProvider } from './context/SelectedDatabaseProvider'

export default function App () {
  const callbackStorage = e => console.log(e, 'storage_changed')

  useEffect(() => {
    window.addEventListener('storage', callbackStorage)
    return () => window.removeEventListener('storage', callbackStorage)
  }, [])

  return (
    <div className='app font-openSans text-xl flex flex-col md:flex-row gap-3 select-none min-w-min md:min-w-min'>
      <Navigation />
      <SelectedDatabaseProvider>
        <MainContent />
      </SelectedDatabaseProvider>
    </div>
  )
}

// npx tailwindcss -i ./src/index.css -o ./public/output.css --watch

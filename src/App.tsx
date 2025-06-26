import Navbar from './components/navbar'
import Todo from './components/todo'
import Aurora from './components/ui/aurora-bg'

export default function App() {
  return (
    <div className='flex flex-col md:gap-40 items-center justify-start h-screen bg-transparent'>
      <div className='absolute top-0 left-0 w-screen h-full z-[-10]'>
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <Navbar />
      <Todo />
    </div>
  )
}

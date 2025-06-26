import Navbar from './components/navbar'
import Todo from './components/todo'

export default function App() {
  return (
    <div className='flex flex-col md:gap-40 items-center justify-start h-screen bg-background'>
      <Navbar />
      <Todo />
    </div>
  )
}

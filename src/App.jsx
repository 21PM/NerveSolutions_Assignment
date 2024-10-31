import { useState } from 'react'
import ViewStratergies from './Components/ViewStratergies'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ViewStratergies/>
    </>
  )
}

export default App

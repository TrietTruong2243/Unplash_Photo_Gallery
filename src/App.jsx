import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ContainerExample from './components/header';
import Header from './components/header';
import Content from './components/content';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Content />
    </>
  )
}

export default App

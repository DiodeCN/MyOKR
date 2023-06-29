import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CloseButton from './WinLayout/closeApp'; // Import the CloseButton component
import MaximizeButton from './WinLayout/maximizeApp'; // Import the MaximizeButton component
import MinimizeButton from './WinLayout/minimizeApp'; // Import the MinimizeButton component

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <CloseButton />
        <MaximizeButton />
        <MinimizeButton />
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

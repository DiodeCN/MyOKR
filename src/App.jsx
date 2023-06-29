import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CloseButton from './WinLayout/closeApp'; // Import the CloseButton component
import MaximizeButton from './WinLayout/maximizeApp'; // Import the MaximizeButton component
import MinimizeButton from './WinLayout/minimizeApp'; // Import the MinimizeButton component

function App() {
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
      <h1>MyOKR!-ElmCose</h1>
      <div className="card">
      <h2>Advantage is in me...</h2>
      </div>
    </>
  )
}

export default App

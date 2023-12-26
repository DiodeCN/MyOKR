import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import CloseButton from './WinLayout/closeApp'; // Import the CloseButton component
import MaximizeButton from './WinLayout/maximizeApp'; // Import the MaximizeButton component
import MinimizeButton from './WinLayout/minimizeApp'; // Import the MinimizeButton component
import couldDrag from './WinLayout/couldDrag'; // Import the couldDrag component


function App() {
  return (
    <>
      <div>
        <CloseButton />
        <MaximizeButton />
        <MinimizeButton />
        <couldDrag />
        <a href="https://vitejs.dev">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <br />
        <button className="transparentButton">
          <a href="/editor">New Document</a>
        </button>
        <input type="text" id="name" name="name" required minlength="4" maxlength="8" size="10" />


      </div>
      <h1>MyOKR!-ElmCose</h1>
    </>
  );
}

export default App;

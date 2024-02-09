import { Link } from "react-router-dom"; // 导入 Link 组件
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CloseButton from "./WinLayout/closeApp";
import MaximizeButton from "./WinLayout/maximizeApp";
import MinimizeButton from "./WinLayout/minimizeApp";
import CouldDrag from "./WinLayout/couldDrag";

function App() {
  const handleNewDocument = () => {
    const totalArticles = localStorage.getItem("totalArticles");
    const total = parseInt(totalArticles, 10) + 1;
    localStorage.setItem("totalArticles", total.toString());
    sessionStorage.setItem("NowArticles", total.toString());
  };
  return (
    <>
      <div>
        <CouldDrag />
        <CloseButton />
        <MaximizeButton />
        <MinimizeButton />
        <a href="https://vitejs.dev">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <br />
        <button className="transparentButton" onClick={handleNewDocument}>
          <Link to="/editor">New Document</Link>
        </button>

      </div>
      <h1>MyOKR!-ElmCose</h1>
    </>
  );
}

export default App;

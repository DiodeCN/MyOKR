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
    let totalArticles = localStorage.getItem("totalArticles");
    if (!totalArticles) {
      totalArticles = 0; // 如果不存在，则初始化为 0
    }
    const total = parseInt(totalArticles, 10) + 1;
    localStorage.setItem("totalArticles", total.toString());

    // 创建一个新的对象来存储文章信息
    const newArticle = {
      id: total.toString(),
      content: "",
      title: `未命名文档（${total}）`,
      timestamp: new Date().getTime() // 添加时间戳
    };

    // 使用JSON.stringify()将对象转换为字符串存储
    sessionStorage.setItem("NowArticles", JSON.stringify(newArticle));
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

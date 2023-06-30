import CloseButton from '.././WinLayout/closeApp'; // Import the CloseButton component
import MaximizeButton from '.././WinLayout/maximizeApp'; // Import the MaximizeButton component
import MinimizeButton from '.././WinLayout/minimizeApp'; // Import the MinimizeButton component

function Editor() {
  return (
    <>
      <div>
        <CloseButton />
        <MaximizeButton />
        <MinimizeButton />
      </div>
      <h1>MyOKR!-ElmCose</h1>
      <div className="card">
      <h2>Advantage is in me...</h2>
      </div>
    </>
  )
}

export default Editor

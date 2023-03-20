import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import MainCanvas from "./components/RubikCube/MainCanvas";

function App() {


  return (<div className="App bg-dark" style={{minHeight: '100vh', display: 'flow-root'}}>

    <MainCanvas width={'100vw'} height={'100vh'} />

  </div>)
}

export default App

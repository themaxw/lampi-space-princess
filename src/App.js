
import './App.css';

import Params from './components/Params'
import Colors from './components/Colors'

function App() {
  let apiUrl = "http://192.168.178.225:8000";
  let state = "ambiLight"
  return (
    <div className="App">
      <header className="Lampi Light Princess">
        <h1>
          Lampi Light Princess
        </h1>
        <div className={"mode-picker"}>
          <div className={"mode"}>ambiLight</div>
          <div className={"mode"}>music</div>
          <div className={"mode"}>gif</div>
        </div>
        <div style={{ width: "100%", alignSelf: "center" }}>
          <Colors url={apiUrl} />

          <Params url={apiUrl} />
        </div>
      </header>
    </div>
  );
}

export default App;

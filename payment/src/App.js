// import react from 'react';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Pay from './Components/Pay'
import Success from './Components/Success'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/Pay" element={<Pay/>}></Route>
          <Route exact path="/success" element={<Success/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

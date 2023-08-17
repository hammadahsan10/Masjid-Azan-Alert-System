import MosqueDetails from "./MosqueSystem/MosqueDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddMosque from "./MosqueSystem/AddMosque";
import AddTimings from "./MosqueSystem/AddTimings";

function App() {
  
  return (
    <div>
      
      <Router>
        <Routes>
          <Route exact path="/" element={<MosqueDetails/>} />
          <Route exact path="addMosque" element={<AddMosque/>} />
          <Route exact path="addTimings" element={<AddTimings/>} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;

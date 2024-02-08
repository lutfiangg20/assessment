import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Customers from "./pages/Customers";
import Survey from "./pages/Survey";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Customers />} />
        <Route path="/survey" element={<Survey />} />
      </Routes>
    </Router>
  );
}

export default App;

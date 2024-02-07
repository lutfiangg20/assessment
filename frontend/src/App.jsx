import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Customers from "./pages/Customers";
import Survey from "./pages/Survey";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/customers" element={<Customers />} />
        <Route path="/" element={<Survey />} />
      </Routes>
    </Router>
  );
}

export default App;

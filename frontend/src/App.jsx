import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Customers from "./pages/Customers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Customers />} />
      </Routes>
    </Router>
  );
}

export default App;

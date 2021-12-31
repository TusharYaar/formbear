import { Routes, Route } from "react-router-dom";

import About from "./pages/About";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Authentication />} />
    </Routes>
  );
}

export default App;

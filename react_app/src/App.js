import { Flex, Collapse } from "@chakra-ui/react";
import Navbar from "./components/Navbar";

import { Routes, Route, useLocation } from "react-router-dom";

import About from "./pages/About";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Docs from "./pages/Docs";

const ROUTES = ["/login", "/"];

function App() {
  let { pathname } = useLocation();

  return (
    <Flex minH="100vh" direction="column">
      <Collapse in={!ROUTES.includes(pathname)}>
        <Navbar />
      </Collapse>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Authentication />} />
        <Route path="/dashboard" element={<Dashboard />} exact />
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </Flex>
  );
}

export default App;

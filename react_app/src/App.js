import { Flex, Collapse, Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";

import { Routes, Route, useLocation } from "react-router-dom";

import About from "./pages/About";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Docs from "./pages/Docs";
import Settings from "./pages/Settings";

const ROUTES = ["/login", "/"];

function App() {
  let { pathname } = useLocation();

  return (
    <Flex h="100vh" direction="column">
      <Collapse in={!ROUTES.includes(pathname)}>
        <Box bg="#3B82F6">
          <Navbar />
        </Box>
      </Collapse>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Authentication />} />
        <Route path="/dashboard" element={<Dashboard />} exact />
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </Flex>
  );
}

export default App;

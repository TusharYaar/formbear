import { Box, Link, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const {
    currentUser: { isSignedIn },
    logOut,
  } = useAuth();
  return (
    <Box minW="100vw" bg="tomato">
      <Link as={RouterLink} to="/home">
        Home
      </Link>
      <Link as={RouterLink} to="/about">
        About
      </Link>
      {isSignedIn && <Button onClick={logOut}>Logout</Button>}
      <Link as={RouterLink} to="/login">
        Login
      </Link>
    </Box>
  );
};

export default Navbar;

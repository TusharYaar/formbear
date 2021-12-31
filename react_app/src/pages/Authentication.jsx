import { Flex, SlideFade, Button, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
const Authentication = () => {
  let navigate = useNavigate();
  const {
    currentUser: { isSignedIn, isLoading },
  } = useAuth();

  const [isTypeLogin, setIsTypeLogin] = useState(true);

  const toggleTypeLogin = () => {
    setIsTypeLogin(!isTypeLogin);
  };

  useEffect(() => {
    if (isSignedIn) {
      navigate("/", { replace: true });
    }
  }, [isSignedIn, navigate]);

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg="orange.50">
      <Box w={[320, 400, 500]} h="100%" bg="white">
        <Box pos={"absolute"} top={"50%"} transform={"translate(0%, -50%)"} bg="white">
          <SlideFade in={isTypeLogin} offsetX={50} unmountOnExit>
            <Login toggleTypeLogin={toggleTypeLogin} />
          </SlideFade>
        </Box>
        <Box pos={"absolute"} transform={"translate(0%, -50%)"} bg="white">
          <SlideFade in={!isTypeLogin} offsetX={-50} unmountOnExit>
            <Signup toggleTypeLogin={toggleTypeLogin} />
          </SlideFade>
        </Box>
      </Box>
    </Flex>
  );
};

export default Authentication;

import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Text,
  Divider,
  VStack,
} from "@chakra-ui/react";

import { FcGoogle } from "react-icons/fc";

import { Link as RouterLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Login = ({ toggleTypeLogin }) => {
  const {
    currentUser: { isLoading },
    signIn,
  } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = async () => {
    try {
      await signIn(email, password, rememberMe);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box rounded={"lg"} boxShadow={"lg"} p={8} w={[320, 400, 500]}>
      <VStack align="right" spacing={0}>
        <Text as="h2" fontSize="4xl">
          Login
        </Text>
        <Text as="h3" fontSize="md" color="gray.400">
          Welcome back! Please enter your details
        </Text>
      </VStack>

      <Box>
        <VStack spacing={5} align="stretch">
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
              isRequired
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              placeholder="password"
              type="password"
              isRequired
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Stack spacing={5} direction={{ base: "column", sm: "row" }} justify={"space-between"}>
            <Checkbox isChecked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}>
              Remember me
            </Checkbox>
            <Link as={RouterLink} to="/forgot-password">
              Forgot password?
            </Link>
          </Stack>
          <Button variant="solid" onClick={handleLogin}>
            Login
          </Button>
          <Button w="100%" my={5} leftIcon={<FcGoogle />}>
            Continue with Google
          </Button>
        </VStack>
        <Divider orientation="horizontal" width="100%" />
        <Text color="gray.400" my={5}>
          Don't have an account yet?
          <Button colorScheme="teal" variant="link" size="xs" onClick={toggleTypeLogin} mx={2}>
            Sign up
          </Button>
        </Text>
      </Box>
    </Box>
  );
};

export default Login;

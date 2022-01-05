import { useEffect } from "react";

import { Box, Text, Flex, HStack, IconButton, Grid, GridItem } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { RiRefreshLine } from "react-icons/ri";
const Dashboard = () => {
  let navigate = useNavigate();
  const {
    currentUser: { isSignedIn, isLoading, user },
    getForms,
  } = useAuth();
  useEffect(() => {
    if (!isSignedIn && !isLoading) {
      navigate("/", { replace: true });
    }
  }, [isSignedIn, navigate, isLoading]);

  return (
    <Flex h="100%">
      <Box w={[320, 400, 300]} bg="gray">
        <Text> Dashboard</Text>
      </Box>
      <Box w="100%">
        <HStack justify="space-between" p={4}>
          <Box>
            <Text display={{ base: "inline", sm: "none" }}>Dashboard</Text>
          </Box>
          <IconButton aria-label="Refresh forms" icon={<RiRefreshLine size={20} color="black" />} onClick={getForms} />
        </HStack>
        <Flex h="100%" grow={1}>
          {}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Dashboard;

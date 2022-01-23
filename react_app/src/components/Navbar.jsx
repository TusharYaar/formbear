import { Box, Link, Button, Spinner, HStack, Flex, Text, useDisclosure, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Icon from "../assests/icon.png";

import { RiMenu2Line } from "react-icons/ri";

import NavMenu from "./NavMenu";
import Drawer from "./Drawer";

const Navbar = () => {
  const {
    currentUser: { isSignedIn, isLoading, user },
  } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box bg="blue.300" px={{ sm: 2, md: 4 }}>
      <Flex direction="row" align="center" justify="space-between" h={{ sm: "40px", md: "60px" }}>
        <Link as={RouterLink} to="/" color="white" fontSize="lg">
          <Flex align="center" justify="center" direction="row">
            <Box px={4}>
              <Image src={Icon} alt="logo" boxSize={{ base: "30px", md: "50px" }} objectFit="cover" />
            </Box>
            <Text fontSize="2xl" display={{ base: "none", md: "inline" }}>
              Formbear
            </Text>
          </Flex>
        </Link>
        <HStack spacing={4}>
          {isSignedIn && (
            <Link as={RouterLink} to="/dashboard">
              Dashboard
            </Link>
          )}
          <Link as={RouterLink} to="/about">
            About
          </Link>
          <Link as={RouterLink} to="/docs">
            Docs
          </Link>

          {isLoading && <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="lg" />}
          {!isLoading && !isSignedIn && (
            <Button as={RouterLink} to="/login" variant="outline" size="sm">
              Login
            </Button>
          )}
          {!isLoading && isSignedIn && <NavMenu />}
          <Drawer isOpen={isOpen} onClose={onClose} />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;

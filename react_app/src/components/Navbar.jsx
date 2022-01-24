import { Box, Link, Button, Spinner, HStack, Flex, Text, useDisclosure, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import NavMenu from "./NavMenu";
import Drawer from "./Drawer";

const Navbar = () => {
  const {
    currentUser: { isSignedIn, isLoading },
  } = useAuth();

  const { isOpen, onClose } = useDisclosure();
  return (
    <Flex direction="row" align="center" justify="space-between" h={{ sm: "40px", md: "60px" }} px={4}>
      <Link as={RouterLink} to="/" color="white" fontSize="lg" _hover={{ underline: "none" }}>
        <Flex align="center" justify="center" direction="row">
          <Box px={4}>
            <Image
              src="https://res.cloudinary.com/tusharyaar/image/upload/v1643047914/Formbear/icon_vhk416.png"
              alt="logo"
              boxSize={{ base: "30px", md: "50px" }}
              objectFit="cover"
            />
          </Box>
          <Text fontSize="2xl" fontWeight="bold" display={{ base: "none", md: "inline" }}>
            Formbear
          </Text>
        </Flex>
      </Link>
      <HStack spacing={4}>
        {isSignedIn && (
          <Link as={RouterLink} to="/dashboard" fontWeight="bold">
            Dashboard
          </Link>
        )}
        <Link as={RouterLink} to="/about" fontWeight="bold">
          About
        </Link>
        <Link as={RouterLink} to="/docs" fontWeight="bold">
          Docs
        </Link>

        {isLoading && <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="lg" />}
        {!isLoading && !isSignedIn && (
          <Button as={RouterLink} to="/login" variant="outline" size="sm" fontWeight="bold">
            Login
          </Button>
        )}
        {!isLoading && isSignedIn && <NavMenu />}
        <Drawer isOpen={isOpen} onClose={onClose} />
      </HStack>
    </Flex>
  );
};

export default Navbar;

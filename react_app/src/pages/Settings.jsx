import { useEffect, useState } from "react";

import { Box, Text, Alert, AlertIcon, AlertTitle, AlertDescription, Input, Button } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
const Settings = () => {
  const [confirmMail, setConfirmMail] = useState("");
  let navigate = useNavigate();
  const {
    currentUser: { isSignedIn, isLoading, user },
    deleteProfile,
  } = useAuth();

  useEffect(() => {
    if (!isSignedIn && !isLoading) {
      navigate("/", { replace: true });
    }
  }, [isSignedIn, navigate, isLoading]);

  if (isLoading && !isSignedIn) {
    return (
      <Box>
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Box p={4}>
        <Text fontSize="2xl" my={2} fontWeight="bold">
          Delete Account
        </Text>
        <Alert status="error" borderRadius={10}>
          <AlertIcon />
          <AlertTitle mr={2}>Danger</AlertTitle>
          <AlertDescription>
            Once the account has been deleted, it will also delete any data associated with it. It will not be
            recoverable.
          </AlertDescription>
        </Alert>
        <Box mt={4}>
          <Text>Confirm your email address</Text>
          <Input
            placeholder="Enter your email"
            size="lg"
            my={2}
            value={confirmMail}
            onChange={(event) => setConfirmMail(event.target.value)}
          />
        </Box>
        <Text>
          Are you sure you want to delete your account? This action cannot be undone. The account will be deleted
          immediately
        </Text>
        <Button
          colorScheme="red"
          variant="solid"
          isDisabled={user?.email !== confirmMail}
          my={2}
          onClick={deleteProfile}>
          Delete Account and all its Data
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;

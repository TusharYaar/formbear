import { useEffect, useState } from "react";

import {
  Box,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Input,
  Button,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";

import APIKeyItem from "../components/APIKeyItem";
import APIKeyModal from "../components/APIKeyModal";
import ViewDeviceItem from "../components/ViewDeviceItem";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Settings = () => {
  const [confirmMail, setConfirmMail] = useState("");
  const [tokenLoading, setTokenLoading] = useState(true);
  const [apiTokens, setApiTokens] = useState({
    isLoading: true,
    tokens: [],
    error: "",
  });

  let navigate = useNavigate();
  const {
    currentUser: { isSignedIn, isLoading, user },
    deleteProfile,
    getTokens,
    createToken,
    deleteDevice,
    deleteToken,
  } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!isSignedIn && !isLoading) {
      navigate("/", { replace: true });
    }
  }, [isSignedIn, navigate, isLoading]);

  useEffect(() => {
    if (!isSignedIn || isLoading) return;
    getTokens()
      .then((res) => {
        setApiTokens({
          isLoading: false,
          tokens: res,
          error: "",
        });
        setTokenLoading(false);
      })
      .catch((err) => {
        setApiTokens({
          isLoading: false,
          tokens: [],
          error: err.message,
        });
      });
  }, [getTokens, isSignedIn, isLoading]);

  const handleCreateToken = async (keyValidity, allowDelete) => {
    try {
      setTokenLoading(true);
      const token = await createToken(keyValidity, allowDelete);
      setApiTokens({
        isLoading: false,
        tokens: [...apiTokens.tokens, token],
        error: "",
      });
    } catch (error) {
    } finally {
      setTokenLoading(false);
      onClose();
    }
  };
  const hadleDelete = async (token) => {
    try {
      setTokenLoading(true);
      await deleteToken(token);
      setApiTokens({
        isLoading: false,
        tokens: apiTokens.tokens.filter((t) => t.key !== token),
        error: "",
      });
    } catch (error) {
    } finally {
      setTokenLoading(false);
    }
  };
  const handleDeleteDevice = async (device) => {
    try {
      setTokenLoading(true);
      await deleteDevice(device);
    } catch (error) {
    } finally {
      setTokenLoading(false);
    }
  };

  if (isLoading && !isSignedIn) {
    return (
      <Box>
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <Box>
      <APIKeyModal
        isOpen={isOpen}
        onClose={onClose}
        onClickCreate={handleCreateToken}
        isLoading={tokenLoading || apiTokens.tokens.length >= 3}
      />
      <Box p={4} my={4}>
        <Text fontSize="2xl" my={2} fontWeight="bold">
          API Key Settings
        </Text>
        <Box>
          <Alert status="info" borderRadius={10} my={2}>
            <AlertIcon />
            Generate API key now available. Limited to 3/user
          </Alert>
          <Text>
            Formbear allows you to connect your own services with the formbear api. The api allows you to access all
            your forms and delete them as well. The key could be made temporary as well as only allow reads.
          </Text>
          {!apiTokens.isLoading && apiTokens.error && <Text>{apiTokens.error}</Text>}
          {apiTokens.isLoading && <Text>Loading...</Text>}
          {!apiTokens.isLoading && apiTokens.tokens.length === 0 && <Text>You have no API keys.</Text>}
          {!apiTokens.isLoading &&
            apiTokens.tokens.length > 0 &&
            apiTokens.tokens.map((token) => <APIKeyItem key={token.key} token={token} onDelete={hadleDelete} />)}
          {apiTokens.tokens.length >= 3 && (
            <Text>Number of API keys is limited to 3, contact us if you need more.</Text>
          )}
          <Button
            onClick={onOpen}
            my={3}
            bg="#3B82F6"
            _hover={{ bg: "#BEE3F8" }}
            _active={{ bg: "#BEE3F8" }}
            isDisabled={tokenLoading || apiTokens.tokens.length >= 3}>
            Generate New API Key
          </Button>
        </Box>
      </Box>
      <Box p={4}>
        <Text fontSize="2xl" my={2} fontWeight="bold">
          Devices
        </Text>
        <Alert status="info" borderRadius={10}>
          <AlertIcon />
          <AlertTitle mr={2}>Info</AlertTitle>
          <AlertDescription>
            These are the devices which will be notified when a form is submitted. On deleting they will <b>NOT</b> be
            logged out of the account.
          </AlertDescription>
        </Alert>
        <HStack spacing={4} my={2} wrap="wrap">
          {user.mobile_devices &&
            user.mobile_devices.map((device) => (
              <ViewDeviceItem
                key={device.device_id}
                device={device}
                onClickDelete={handleDeleteDevice}
                isDisabled={tokenLoading}
              />
            ))}
        </HStack>
      </Box>
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

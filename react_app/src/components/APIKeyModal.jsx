import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Select,
  Box,
  Text,
  Checkbox,
} from "@chakra-ui/react";

const APIKeyModal = ({ isOpen, onClose, onClickCreate, isLoading }) => {
  const [allowDelete, setAllowDelete] = useState(true);
  const [keyValidity, setKeyValidity] = useState("7");

  const handleSubmit = () => {
    onClickCreate(keyValidity, allowDelete);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Generate API Key</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Text fontSize="lg">Key Validity: </Text>
            <Select
              size="lg"
              width="100%"
              value={keyValidity}
              onChange={(e) => setKeyValidity(e.target.value)}
              isDisabled={isLoading}>
              <option value="7">7 Day</option>
              <option value="14">14 Days</option>
              <option value="30">30 Days</option>
              <option value="90">90 Days</option>
              <option value="-1">Unlimited</option>
            </Select>
          </Box>
          <Box mt={4} mr={4}>
            <Checkbox size="lg" isChecked={allowDelete} onChange={() => setAllowDelete(!allowDelete)}>
              Allow Deletion
            </Checkbox>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleSubmit} isDisabled={isLoading}>
            Generate API Key
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default APIKeyModal;

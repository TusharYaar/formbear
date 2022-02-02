import { Box, Image, Text, Button } from "@chakra-ui/react";

import DEVICES from "../assests/devices.js";

const ViewDeviceItem = ({ device, onClickDelete, isDisabled }) => {
  const handleDelete = () => {
    onClickDelete(device.device_id);
  };

  return (
    <Box w={300} borderRadius="md" borderWidth="1px" m={2}>
      <Image
        src={DEVICES[device.manufacturer.toLowerCase()] || DEVICES["android"]}
        alt="device Image"
        w="300px"
        h="200px"
      />
      <Box p={2}>
        <Text>{device.device_name}</Text>
        <Text>{device.manufacturer}</Text>
        <Button onClick={handleDelete} my={2} colorScheme="red" isDisabled={isDisabled}>
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default ViewDeviceItem;

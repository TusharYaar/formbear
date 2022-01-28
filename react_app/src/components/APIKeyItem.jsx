import { Box, Flex, Text, Button, Code } from "@chakra-ui/react";
import { format, parseISO, addDays } from "date-fns";
const APIKeyItem = ({ token, onDelete }) => {
  const handleDelete = () => {
    onDelete(token.key);
  };

  return (
    <Flex justify="space-between" align="center" px={4} py={2}>
      <Box>
        <Text>
          <Text as="span" fontSize="lg" fontWeight="bold">
            Key:
          </Text>
          <Code mx={2} px={2} py={1}>
            {token.token}
          </Code>
        </Text>
        <Text my={1}>
          <Text as="span" fontSize="lg" fontWeight="bold">
            Created On:
          </Text>
          {format(parseISO(token.created_at), " do MMM, yyyy ")} at
          {format(parseISO(token.created_at), " KK:mm aa")}
        </Text>
        <Text my={1}>
          <Text as="span" fontSize="lg" fontWeight="bold">
            Expires On:
          </Text>
          {token.expiry_duration === -1
            ? " Never"
            : format(addDays(parseISO(token.created_at), parseInt(token.expiry_duration)), " do MMM, yyyy ") +
              "at" +
              format(addDays(parseISO(token.created_at), parseInt(token.expiry_duration)), " KK:mm aa")}
        </Text>
        <Text>
          <Code borderRadius="md" px={2} py={1} my={1} colorScheme="yellow" mr={2}>
            {token.allow_delete ? "Allows" : "Does not allows"}
          </Code>
          deleting forms
        </Text>
      </Box>
      <Button onClick={handleDelete}>Delete Token</Button>
    </Flex>
  );
};

export default APIKeyItem;

import { Flex, Text, VStack, IconButton } from "@chakra-ui/react";

import { parseISO, format } from "date-fns";

import { AiTwotoneStar, AiOutlineStar, AiFillDelete } from "react-icons/ai";

const FormItem = ({ isOpen, data, handleFormDetailView, compLoading }) => {
  const handleClick = () => {
    handleFormDetailView(data.key);
  };
  return (
    <Flex
      onClick={handleClick}
      width="100%"
      px={5}
      py={3}
      borderRadius="lg"
      border="1px"
      borderColor="gray.200"
      align="center"
      justify="space-between"
      _hover={{ bg: "#ebedf0" }}
      bg={isOpen ? "#ebedf0" : "white"}>
      <Flex>
        <IconButton
          aria-label="Search database"
          icon={data.star ? <AiTwotoneStar /> : <AiOutlineStar />}
          isLoading={compLoading}
        />
        <VStack spacing={0} align="start" grow={1} mx={4}>
          <Text>{format(parseISO(data.created_at), "MMM d, yyyy")}</Text>
          <Text noOfLines={1} fontSize="sm">
            {JSON.stringify(data.form_response)}
          </Text>
        </VStack>
      </Flex>
      <IconButton aria-label="Delete form" icon={<AiFillDelete color="red" />} isLoading={compLoading} />
      {/* <AiFillDelete /> */}
    </Flex>
  );
};

export default FormItem;

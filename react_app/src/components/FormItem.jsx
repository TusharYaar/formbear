import { Flex, Text, VStack, IconButton } from "@chakra-ui/react";

import { parseISO, format } from "date-fns";

import { AiTwotoneStar, AiOutlineStar, AiFillDelete } from "react-icons/ai";

import { useAuth } from "../context/AuthContext";

const FormItem = ({ isOpen, data, handleFormDetailView, compLoading, setCompLoading }) => {
  const { toggleStar, deleteForm } = useAuth();

  const handleClick = () => {
    handleFormDetailView(data.key);
  };

  const handleStar = async (event) => {
    try {
      event.stopPropagation();
      setCompLoading(true);
      await toggleStar(data.key);
    } catch (error) {
      console.log(error);
    }
    setCompLoading(false);
  };

  const handleDelete = async (event) => {
    try {
      event.stopPropagation();
      setCompLoading(true);
      await deleteForm(data.key);
    } catch (error) {
      console.log(error);
    }
    setCompLoading(false);
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
          onClick={handleStar}
          icon={data.star ? <AiTwotoneStar /> : <AiOutlineStar />}
          isLoading={compLoading}
        />
        <VStack spacing={0} align="start" grow={1} mx={4}>
          <Text fontWeight={data.form_viewed ? "semibold" : "bold"}>{data.key}</Text>

          <Text fontWeight={data.form_viewed ? "normal" : "bold"}>
            {format(parseISO(data.created_at), "MMM d, yyyy")}
          </Text>
          <Text noOfLines={1} fontSize="sm" fontWeight={data.form_viewed ? "normal" : "bold"}>
            {JSON.stringify(data.form_response)}
          </Text>
        </VStack>
      </Flex>
      <IconButton
        aria-label="Delete form"
        icon={<AiFillDelete color="red" />}
        onClick={handleDelete}
        isLoading={compLoading}
      />
    </Flex>
  );
};

export default FormItem;

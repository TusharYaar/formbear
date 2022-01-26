import { useEffect, useState } from "react";
import { Box, IconButton, HStack, Button, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { RiCloseCircleLine } from "react-icons/ri";
import { AiTwotoneStar, AiOutlineStar, AiFillDelete } from "react-icons/ai";

import { useAuth } from "../context/AuthContext";

import ViewObject from "./ViewObject";
import cuid from "cuid";

import { format, parseISO } from "date-fns";

// 1. Create a custom motion component from Box
const MotionBox = motion(Box);
const FormDetailView = ({ form, handleFormDetailView, maxWidth = 900, compLoading, setCompLoading }) => {
  const { toggleStar, deleteForm, markFormViewed } = useAuth();
  const [keysArray, setKeysArray] = useState([]);

  useEffect(() => {
    if (!form.form_viewed) {
      markFormViewed(form.key);
    }
    setKeysArray([]);
  }, [form, markFormViewed]);

  const closeView = () => {
    handleFormDetailView(null);
  };
  const handleStar = async (event) => {
    try {
      event.stopPropagation();
      setCompLoading(true);
      await toggleStar(form.key);
    } catch (error) {
      console.log(error);
    }
    setCompLoading(false);
  };

  const addKeyToArray = (key) => {
    setKeysArray((prev) => [...prev, key]);
  };

  const removeKeyFromArray = () => {
    setKeysArray((prev) => prev.slice(0, -1));
  };

  const handleDelete = async (event) => {
    try {
      event.stopPropagation();
      setCompLoading(true);
      await deleteForm(form.key);
    } catch (error) {
      console.log(error);
    }
    setCompLoading(false);
  };
  return (
    <MotionBox initial={{ width: 0 }} animate={{ width: maxWidth }} exit={{ width: 0 }}>
      <Box p={4} bg="gray.100" borderLeftRadius={10}>
        <HStack justify="space-between">
          <IconButton
            colorScheme="blue"
            aria-label="Search database"
            icon={<RiCloseCircleLine />}
            onClick={closeView}
          />
          <HStack>
            <IconButton
              aria-label={`${form.star ? "Unstar" : "Star"} form`}
              onClick={handleStar}
              icon={form.star ? <AiTwotoneStar /> : <AiOutlineStar />}
              isLoading={compLoading}
            />
            <IconButton
              aria-label="Delete form"
              icon={<AiFillDelete color="red" />}
              onClick={handleDelete}
              isLoading={compLoading}
            />
          </HStack>
        </HStack>
        <Box p={4}>
          <Text fontSize="lg">
            <Text as="span" fontWeight="bold">
              Recieved at:
            </Text>
            {format(parseISO(form.created_at), " dd-MM-yy ")}
            at
            {format(parseISO(form.created_at), " hh:mm aa")}
          </Text>
          <Text fontSize="lg">
            <Text as="span" fontWeight="bold">
              Form Id:{" "}
            </Text>
            {form.key}
          </Text>
          <Text fontSize="lg">
            <Text as="span" fontWeight="bold">
              Sent To:{" "}
            </Text>
            {form.email}
          </Text>
          <Box mt={4}>
            <Text fontSize="lg" as="span" fontWeight="bold">
              Response
            </Text>
            <HStack spacing={4}>
              <Flex grow={1} direction="column">
                {keysArray.length > 6 && <Text>...</Text>}
                {keysArray.slice(-8).map((key, index) => (
                  <Text key={cuid()} ml={index * 4} display="block">
                    {key}
                  </Text>
                ))}
              </Flex>
              <Button onClick={removeKeyFromArray} isDisabled={keysArray.length === 0}>
                Back
              </Button>
            </HStack>
            <ViewObject object={form.form_response} keysArray={keysArray} addKeyToArray={addKeyToArray} />
          </Box>
        </Box>
      </Box>
    </MotionBox>
  );
};

export default FormDetailView;

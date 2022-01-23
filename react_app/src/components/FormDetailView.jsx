import { useEffect, useState } from "react";
import { Box, IconButton, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { RiCloseCircleLine } from "react-icons/ri";
import { AiTwotoneStar, AiOutlineStar, AiFillDelete } from "react-icons/ai";

import { useAuth } from "../context/AuthContext";

import ViewObject from "./ViewObject";

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
    <MotionBox initial={{ width: 0 }} animate={{ width: maxWidth }} exit={{ width: 0 }} p={4}>
      <HStack justify="space-between">
        <IconButton colorScheme="blue" aria-label="Search database" icon={<RiCloseCircleLine />} onClick={closeView} />
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
        <ViewObject object={form.form_response} keysArray={keysArray} addKeyToArray={addKeyToArray} />
      </Box>
    </MotionBox>
  );
};

export default FormDetailView;

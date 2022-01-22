import { useEffect } from "react";
import { Box, IconButton, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { RiCloseCircleLine } from "react-icons/ri";
import { AiTwotoneStar, AiOutlineStar, AiFillDelete } from "react-icons/ai";

import DataTable from "./DataTable";
import { useAuth } from "../context/AuthContext";

// 1. Create a custom motion component from Box
const MotionBox = motion(Box);
const FormDetailView = ({ form, handleFormDetailView, maxWidth = 900, compLoading, setCompLoading }) => {
  const { toggleStar, deleteForm, markFormViewed } = useAuth();

  useEffect(() => {
    if (!form.form_viewed) {
      markFormViewed(form.key);
    }
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
        <DataTable data={form.form_response} nestLvl={0} />
      </Box>
    </MotionBox>
  );
};

export default FormDetailView;

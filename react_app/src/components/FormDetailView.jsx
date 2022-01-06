import { Box, Text, IconButton } from "@chakra-ui/react";

import { motion } from "framer-motion";

import { RiCloseCircleLine } from "react-icons/ri";

const FormDetailView = ({ form, handleFormDetailView, maxWidth = 900 }) => {
  const closeView = () => {
    handleFormDetailView(null);
  };
  return (
    <motion.div initial={{ width: 0 }} animate={{ width: maxWidth }} exit={{ width: 0 }}>
      <IconButton colorScheme="blue" aria-label="Search database" icon={<RiCloseCircleLine />} onClick={closeView} />
      <Box p={4}>
        <code>{JSON.stringify(form.form_response)}</code>
      </Box>
    </motion.div>
  );
};

export default FormDetailView;

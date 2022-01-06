import { useEffect, useState } from "react";

import { Box, Text, Flex, HStack, IconButton, VStack } from "@chakra-ui/react";

import { AnimatePresence } from "framer-motion";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { RiRefreshLine } from "react-icons/ri";

import FormDetailView from "../components/FormDetailView";
import FormListView from "../components/FormListView";

const Dashboard = () => {
  let navigate = useNavigate();
  const {
    currentUser: { isSignedIn, isLoading, user },
    getForms,
  } = useAuth();

  const [openForm, setOpenForm] = useState();
  const [filter, setFilter] = useState();
  const [compLoading, setCompLoading] = useState(true);

  const handleFormDetailView = (form) => {
    setOpenForm(form);
  };

  const handleFormRefresh = async () => {
    try {
      setCompLoading(true);
      await getForms();
    } catch (error) {
      console.log(error);
    }

    setCompLoading(false);
  };

  useEffect(() => {
    if (!isSignedIn && !isLoading) {
      navigate("/", { replace: true });
    }
    if (!isLoading && isSignedIn) {
      setCompLoading(false);
    }
  }, [isSignedIn, navigate, isLoading]);

  if (isLoading && !isSignedIn) {
    return (
      <Flex>
        <Text>Loading...</Text>
      </Flex>
    );
  }

  return (
    <Flex h="100%" grow={1}>
      <VStack w={[320, 400, 300]} grow={1}></VStack>
      <Box w="100%">
        <HStack justify="space-between" p={4}>
          <Box>
            <Text fontSize="4xl">Dashboard</Text>
          </Box>
          <IconButton
            isLoading={compLoading}
            aria-label="Refresh forms"
            icon={<RiRefreshLine size={20} color="black" />}
            onClick={handleFormRefresh}
          />
        </HStack>
        <Flex h="100%" grow={1}>
          {user?.forms?.items && (
            <FormListView
              forms={user.forms.items}
              openForm={openForm}
              handleFormDetailView={handleFormDetailView}
              compLoading={compLoading}
              setCompLoading={setCompLoading}
            />
          )}
          <AnimatePresence>
            {openForm && (
              <FormDetailView
                form={user.forms.items.find((form) => form.key === openForm)}
                handleFormDetailView={handleFormDetailView}
              />
            )}
          </AnimatePresence>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Dashboard;

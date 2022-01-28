import { useEffect, useState } from "react";

import {
  Box,
  Text,
  Flex,
  HStack,
  IconButton,
  VStack,
  Input,
  InputGroup,
  Button,
  InputLeftElement,
  Checkbox,
  Code,
} from "@chakra-ui/react";

import { AnimatePresence } from "framer-motion";

import { useNavigate, Link as RouterLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { RiRefreshLine, RiSearch2Line } from "react-icons/ri";

import FormDetailView from "../components/FormDetailView";
import FormListView from "../components/FormListView";

const Dashboard = () => {
  let navigate = useNavigate();
  const {
    currentUser: { isSignedIn, isLoading, user },
    getForms,
  } = useAuth();

  const [openForm, setOpenForm] = useState();
  const [filter, setFilter] = useState({
    search: "",
    unreadOnly: false,
    starredOnly: false,
  });
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

  const handleSearchChange = (event) => setFilter((prev) => ({ ...prev, search: event.target.value }));

  const toggleOnlyUnread = () => setFilter((prev) => ({ ...prev, unreadOnly: !prev.unreadOnly }));
  const toggleOnlyStarred = () => setFilter((prev) => ({ ...prev, starredOnly: !prev.starredOnly }));

  const applyFilters = (form) => {
    if (filter.unreadOnly) form = form.filter((f) => !f.form_viewed);
    if (filter.starredOnly) form = form.filter((f) => f.star);
    if (filter.search)
      form = form.filter(
        (f) => f.key.includes(filter.search) || JSON.stringify(f.form_response).includes(filter.search)
      );

    return form;
  };

  useEffect(() => {
    if (!isSignedIn && !isLoading) {
      navigate("/", { replace: true });
    }
    if (!isLoading && isSignedIn) {
      setCompLoading(false);
    }
  }, [isSignedIn, navigate, isLoading]);

  if (isLoading || !user.submit_id) {
    return (
      <Flex>
        <Text>Loading...</Text>
      </Flex>
    );
  }

  return (
    <Flex h="100%" grow={1}>
      <VStack w={200} grow={1} mt={44}>
        <Checkbox isChecked={filter.unreadOnly} onChange={toggleOnlyUnread}>
          Only Unread
        </Checkbox>
        <Checkbox isChecked={filter.starredOnly} onChange={toggleOnlyStarred}>
          Only Starred
        </Checkbox>
      </VStack>
      <Box w="90%">
        <HStack justify="space-between" p={4}>
          <Flex direction={["column", "row"]} align="center" grow={1}>
            <Text fontSize="4xl">Dashboard</Text>
            <InputGroup>
              <InputLeftElement mx={3} pointerEvents="none" children={<RiSearch2Line color="gray.300" />} />
              <Input
                value={filter.search}
                onChange={handleSearchChange}
                variant="filled"
                placeholder="Search"
                width="100%"
                mx={3}
              />
            </InputGroup>
          </Flex>
          <IconButton
            isLoading={compLoading}
            aria-label="Refresh forms"
            icon={<RiRefreshLine size={20} color="black" />}
            onClick={handleFormRefresh}
          />
        </HStack>
        <HStack align="center" justify="space-between" p={4}>
          <Text fontSize="md">
            Submission URL: <Code p={2}>{`https://formbear.tusharyaar.me/submit/${user.submit_id}`}</Code>
          </Text>
          <Button as={RouterLink} to="/docs#uasge">
            View usage
          </Button>
        </HStack>

        <Flex h="100%" grow={1}>
          {user?.forms?.items && (
            <FormListView
              forms={applyFilters(user.forms.items)}
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
                compLoading={compLoading}
                setCompLoading={setCompLoading}
              />
            )}
          </AnimatePresence>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Dashboard;

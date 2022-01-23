import { Box, Text, Center } from "@chakra-ui/react";

import Navbar from "../components/Navbar";

import backgroundImg from "../assests/background-mountain.jpg";
import background from "../assests/background.jpg";
import IdeWindow from "../components/IdeWindow";

const Home = () => {
  return (
    <Box>
      <Box minH={400} backgroundImage={`url(${background})`} backgroundPosition="center" backgroundRepeat="no-repeat">
        <Box>
          <Navbar />
          <Text fontSize="5xl" fontWeight={700} textAlign="center">
            Easy form endpoints for your HTML forms
          </Text>
          <Center my={8}>
            <Text fontSize="2xl" maxW={700} textAlign="center">
              Connect your HTML forms to endpoints and we'll notify you on the app and send an email when a submission
              is made, for free.
            </Text>
          </Center>
          <Center my={8}>
            <IdeWindow maxW={900} w="100%" />
          </Center>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

import { Box, Text, Center, VStack } from "@chakra-ui/react";

import Navbar from "../components/Navbar";

import IdeWindow from "../components/IdeWindow";

const Home = () => {
  return (
    <Box>
      <Box
        minH={400}
        backgroundImage="url(https://res.cloudinary.com/tusharyaar/image/upload/v1643047919/Formbear/background_2_rz5dnq.jpg)"
        backgroundPosition="center"
        backgroundRepeat="no-repeat">
        <Box>
          <Navbar />
          <Box p={4}>
            <Text fontSize="5xl" fontWeight={700} textAlign="center">
              Easy endpoints for your forms
            </Text>
            <Center my={8}>
              <Text fontSize="2xl" maxW={700} textAlign="center" fontWeight="bold">
                Connect your HTML or Javascript forms to our endpoints and we'll notify you on the app and send an email
                when a submission is made, for free.
              </Text>
            </Center>
            <Center my={8}>
              <IdeWindow maxW={900} w="100%" />
            </Center>
          </Box>
        </Box>
      </Box>
      <Box>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          color="#dfdfdf"
          bgGradient="linear(to-r, blue.700, blue.900, blue.500)">
          Get Notified
        </Text>
        <Box p={4}></Box>
      </Box>
      <Box>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          color="#dfdfdf"
          bgGradient="linear(to-r, blue.700, blue.900, blue.500)">
          Easy to Use
        </Text>
        <Box p={4}>
          <VStack>
            <Text fontSize="2xl" fontWeight="bold">
              1
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              Signup and Confirm your email address
            </Text>
            <Text fontSize="lg">
              Signup and confirm your email address to get started. Use google login for easier signup
            </Text>
          </VStack>
          <VStack>
            <Text fontSize="2xl" fontWeight="bold">
              2
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              Point your form submission to our endpoint
            </Text>
            <Text fontSize="lg">
              Signup and confirm your email address to get started. Use google login for easier signup
            </Text>
          </VStack>
          <VStack>
            <Text fontSize="2xl" fontWeight="bold">
              3
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              That's It
            </Text>
            <Text fontSize="lg">
              Formbear will take care of all the processing and will send you an email and would notify you on the app
              (if installed). Check the response on the app or on the site
            </Text>
          </VStack>
        </Box>
      </Box>
      <Box>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          color="#dfdfdf"
          bgGradient="linear(to-r, blue.700, blue.900, blue.500)">
          Advanced Usage
        </Text>
        <Box p={4}></Box>
      </Box>
      <Box p={4} bg="#011627">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" bgClip="text" bgGradient="linear(to-r,#fff, #2f2f2f)">
          Contact us
        </Text>
        <Box>
          <Text fontSize="lg" fontWeight="bold" color="#dfdfdf">
            Made By Tushar S Agrawal (TusharYaar)
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

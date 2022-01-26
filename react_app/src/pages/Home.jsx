import { Box, Text, Center, VStack, Image, Flex, Link } from "@chakra-ui/react";

import Navbar from "../components/Navbar";

import IdeWindow from "../components/IdeWindow";

import backgroundImg from "../assests/background.jpg";

import androidNoti from "../assests/android_noti.png";
import iosNoti from "../assests/ios_noti.png";
import emailNoti from "../assests/email_noti.jpg";

// import googlePlay from "../assests/google_play_badge.png";

const Home = () => {
  return (
    <Box>
      <Box
        minH={400}
        bg="#119AFA"
        backgroundImage={`url(${backgroundImg})`}
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
        <Flex p={4} direction={{ base: "column", md: "row" }} justify="space-around" align="center">
          <Flex
            boxShadow="xl"
            p="6"
            rounded="md"
            m={4}
            bg="white"
            maxW={400}
            w="100%"
            direction="column"
            align="center">
            <Text fontSize="2xl" fontWeight="bold">
              Android
            </Text>
            <Image src={androidNoti} width="100%" objectFit="cover" loading="lazy" my={4} borderRadius={4} />
            <Link display="inline" href="https://chakra-ui.com" isExternal w="50%">
              {/* <Image src={googlePlay} objectFit="cover" loading="lazy" /> */}
            </Link>
            <Text fontSize="sm" my={4}>
              Coming Soon
            </Text>
          </Flex>
          <Flex
            boxShadow="xl"
            p="6"
            rounded="md"
            bg="white"
            m={4}
            maxW={400}
            w="100%"
            direction="column"
            align="center">
            <Text fontSize="2xl" fontWeight="bold">
              iOS
            </Text>
            <Image src={iosNoti} width="100%" objectFit="cover" loading="lazy" my={4} borderRadius={4} />
            <Text fontSize="sm" my={4}>
              Not available on App store
            </Text>
          </Flex>
          <Flex
            boxShadow="xl"
            p="6"
            rounded="md"
            bg="white"
            m={4}
            maxW={400}
            w="100%"
            direction="column"
            align="center">
            <Text fontSize="2xl" fontWeight="bold">
              Email
            </Text>
            <Image src={emailNoti} width="100%" objectFit="cover" loading="lazy" my={4} borderRadius={4} />
            <Text fontSize="sm" my={4}>
              Verify your email to receive emails
            </Text>
          </Flex>
        </Flex>
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
        <Flex p={4} direction="column" align="center">
          <VStack maxW={600} spacing={1}>
            <Text fontSize="2xl" fontWeight="bold">
              1
            </Text>
            <Text fontSize="lg" fontWeight="semibold">
              Signup and Confirm your email address
            </Text>
            <Text fontSize="md" textAlign="center">
              Signup and confirm your email address to get started. Use google login for easier signup
            </Text>
          </VStack>
          <VStack maxW={600} my={8} spacing={1}>
            <Text fontSize="2xl" fontWeight="bold">
              2
            </Text>
            <Text fontSize="lg" fontWeight="semibold">
              Point your form submission to our endpoint
            </Text>
            <Text fontSize="md" textAlign="center">
              Pointing the action-attribute of your html form or your Javascript submission to our URL, and that it.
              Your email is kept private. will enable submissions to be sent to your email address.
            </Text>
          </VStack>
          <VStack maxW={600} spacing={1}>
            <Text fontSize="2xl" fontWeight="bold">
              3
            </Text>
            <Text fontSize="lg" fontWeight="semibold">
              That's It
            </Text>
            <Text fontSize="md" textAlign="center">
              Formbear will take care of all the processing and will send you an email and notification on app (if
              installed). Check the response on the app or on the site.
            </Text>
          </VStack>
        </Flex>
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
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="#dfdfdf">
          Contact us
        </Text>
        <Box>
          <Text fontSize="lg" fontWeight="bold" color="#dfdfdf">
            Made By Tushar S Agrawal (TusharYaar)
          </Text>
          <Text fontSize="md" color="#dfdfdf">
            mail me at: tusharsagrawal16@gmail.com
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

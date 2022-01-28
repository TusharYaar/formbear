import { useState, useEffect } from "react";

import { Flex, Box, Text, HStack, Center, VStack, Link, IconButton, Tooltip, Icon } from "@chakra-ui/react";

import { AiFillCloseCircle, AiFillWarning, AiFillSmile, AiFillBell } from "react-icons/ai";

import { ImFilesEmpty, ImSearch, ImGit, ImGithub, ImUser, ImHtmlFive } from "react-icons/im";

import { IoLogoJavascript } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";

import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

const MotionBox = motion(Flex);

const IdeWindow = (props) => {
  const { examples = [] } = props;
  const [isOpen, setIsOpen] = useState(true);

  const [exampleOpen, setExampleOpen] = useState(null);

  useEffect(() => {
    setExampleOpen(0);
  }, [examples]);

  const toggleFilesSection = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Box {...props}>
      <Flex direction="column">
        <Flex direction="row" bg="#505050" borderTopRadius={10}>
          <HStack mx={2}>
            <WindowIcon color="#EE5C54" border="#D1413A" />
            <WindowIcon color="#F8BD45" border="#D0943A" />
            <WindowIcon color="#5ECA42" border="#50A530" />
          </HStack>
          <Center w="100%">
            <Text color="#BCC1C1">Welcome</Text>
          </Center>
        </Flex>
        <Flex minH={500}>
          <Flex w={16} bg="#353535">
            <VStack align="center" w="100%" my={4} spacing="24px">
              <Tooltip hasArrow bg="#21252B" label="Explorer" placement="right">
                <IconButton
                  variant="ghost"
                  _hover={{ bg: "#353535" }}
                  _active={{ bg: "#353535" }}
                  _focus={{ bg: "#353535" }}
                  onClick={toggleFilesSection}>
                  <ImFilesEmpty color={isOpen ? "#FFFFFF" : "#72767F"} size={24} />
                </IconButton>
              </Tooltip>
              <ImSearch color="#72767F" size={24} />
              <ImGit color="#72767F" size={24} />
              <Tooltip hasArrow bg="#21252B" label="Goto github repository" placement="right">
                <Link href="https://github.com/TusharYaar/formbear" isExternal>
                  <ImGithub color="#72767F" size={24} />
                </Link>
              </Tooltip>
              <Tooltip hasArrow bg="#21252B" label="View about me" placement="right">
                <Link href="https://www.tusharyaar.me" isExternal>
                  <ImUser color="#72767F" size={24} />
                </Link>
              </Tooltip>
            </VStack>
          </Flex>
          <AnimatePresence>
            {isOpen && (
              <MotionBox initial={{ width: 0 }} animate={{ width: "35%" }} exit={{ width: 0 }} bg="#272727">
                <Flex direction="column" w="100%" h="100%" pt={4}>
                  {examples.map((example, index) => (
                    <Flex key={index} direction="column">
                      <Flex
                        py={1}
                        _hover={{ bg: "#464d5b" }}
                        _active={{ bg: "#464d5b" }}
                        bg={exampleOpen === index ? "#464d5b" : "#272727"}
                        direction="row"
                        w="100%"
                        justify="flex-start"
                        pl={4}
                        align="center"
                        onClick={() => setExampleOpen(index)}>
                        <Icon
                          as={example.language === "javascript" ? IoLogoJavascript : ImHtmlFive}
                          color={example.language === "javascript" ? "yellow" : "orange"}
                          size={12}
                          mx={2}
                        />
                        <Text fontSize="sm" color="#BCC1C1">
                          {example.filename}
                        </Text>
                      </Flex>
                    </Flex>
                  ))}
                </Flex>
              </MotionBox>
            )}
          </AnimatePresence>
          <Flex w="100%" bg="#1E1E1E">
            <SyntaxHighlighter
              language={examples[exampleOpen]?.language || "html"}
              style={vs2015}
              wrapLongLines
              showLineNumbers
              customStyle={{ maxWidth: props.maxW * 0.65, width: "100%" }}>
              {!examples[exampleOpen]?.code ? "<h1>Welcome to FormBear</h1>" : examples[exampleOpen].code}
              {/* {examples[exampleOpen].code} */}
            </SyntaxHighlighter>
          </Flex>
        </Flex>
        <Flex direction="row" bg="#505050" borderBottomRadius={10} align="center" justify="space-between">
          <HStack mx={2}>
            <AiFillCloseCircle color="#F5F5F5" size={12} />
            <Text color="#F5F5F5" fontSize="xs" fontWeight="bold">
              0
            </Text>
            <AiFillWarning color="#F5F5F5" size={12} />
            <Text color="#F5F5F5" fontSize="xs" fontWeight="bold">
              0
            </Text>
          </HStack>
          <HStack mx={2} my={1}>
            <AiFillSmile color="#F5F5F5" size={16} />
            <AiFillBell color="#F5F5F5" size={16} />
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
};

const WindowIcon = ({ color, border }) => {
  return <Box w="12px" h="12px" bg={color} borderRadius="10px" borderWidth="2px" borderColor={border} />;
};

export default IdeWindow;

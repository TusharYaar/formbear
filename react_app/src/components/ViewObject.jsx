import React from "react";

import { Box, Button, Text, Table, Thead, Tbody, Tfoot, Tr, Th, Td } from "@chakra-ui/react";
import cuid from "cuid";

const THEMES = ["gray", "red", "green", "orange", "purple", "yellow"];

const ViewObject = ({ object, addKeyToArray, keysArray = [] }) => {
  const ViewObjectAsTable = () => {
    var myObj = object;
    keysArray.forEach((key) => {
      myObj = myObj[key] || "";
    });
    let table = [];
    for (const key in myObj) {
      table.push(
        <Tr key={cuid()}>
          <Td>
            <Text fontSize="lg">{key}</Text>
          </Td>
          {typeof myObj[key] === "object" ? (
            <Td>
              <Button size="sm" onClick={() => addKeyToArray(key)}>
                View Object
              </Button>
            </Td>
          ) : (
            <Td fontSize="md">{typeof myObj[key] === "boolean" ? (myObj[key] ? "TRUE" : "FALSE") : myObj[key]}</Td>
          )}
        </Tr>
      );
    }
    return table;
  };

  return (
    <Table variant="striped" colorScheme={THEMES[keysArray.length % THEMES.length]} size="lg">
      <Thead>
        <Tr>
          <Th>Key</Th>
          <Th>Value</Th>
        </Tr>
      </Thead>
      <Tbody>{ViewObjectAsTable()}</Tbody>
    </Table>
  );
};

export default ViewObject;

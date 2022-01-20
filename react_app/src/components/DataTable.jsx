import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, Box } from "@chakra-ui/react";

const THEMES = [
  "gray",
  "red",
  "green",
  "orange",
  "purple",
  "yellow",
  // "teal",
  // "cyan",
  // "blue",
  // "pink",
];

const DataTable = ({ data, nestLvl }) => {
  const mapData = () => {
    let tableData = [];
    for (const key in data) {
      tableData.push(
        <Tr key={key} borderRadius="lg">
          <Td>{key}</Td>
          {typeof data[key] === "object" ? (
            <Td>
              <DataTable data={data[key]} nestLvl={nestLvl + 1} />
            </Td>
          ) : (
            <Td> {typeof data[key] === "boolean" ? data[key].toString() : data[key]}</Td>
          )}
        </Tr>
      );
    }
    return tableData;
  };

  return (
    <Box border="1px" borderColor="black" borderRadius="md">
      <Table variant="striped" colorScheme={THEMES[nestLvl % THEMES.length]} size="lg">
        <Thead>
          <Tr>
            <Th>Key</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>{mapData()}</Tbody>
      </Table>
    </Box>
  );
};

export default DataTable;

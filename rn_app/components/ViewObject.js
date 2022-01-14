import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Button, Text} from 'native-base';

const color = [
  '#ffd54f',
  '#80CBC4',
  '#80DEEA',
  '#90CAF9',
  '#9FA8DA',
  '#F8BBD0',
  '#CE93D8',
];

const ViewObject = ({object, addKeyToArray, keysArray}) => {
  const ViewObjectAsTable = () => {
    let myObj = object;
    keysArray.forEach(key => {
      myObj = myObj[key];
    });
    const nestLvl = keysArray.length;

    let table = [];
    let index = 0;
    for (const key in myObj) {
      index++;
      table.push(
        <View
          key={key}
          style={[
            styles.tableRow,
            index % 2 ? null : {backgroundColor: color[nestLvl]},
          ]}>
          <Text style={styles.tableData} fontSize="lg">
            {key}
          </Text>
          {typeof myObj[key] === 'object' ? (
            <Button
              style={styles.tableData}
              size="sm"
              // variant="outline"
              onPress={() => addKeyToArray(key)}>
              View Object
            </Button>
          ) : (
            <Text style={styles.tableData} fontSize="md">
              {myObj[key]}
            </Text>
          )}
        </View>,
      );
    }
    return table;
  };

  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableRow}>
        <Text style={styles.tableHeader}>Key</Text>
        <Text style={styles.tableHeader}>Value</Text>
      </View>
      {ViewObjectAsTable()}
    </View>
  );
};

export default ViewObject;

const styles = StyleSheet.create({
  tableContainer: {
    flex: 1,
    marginVertical: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  tableData: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 5,
    flex: 1,
  },
  tableHeader: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 5,
    flex: 1,
  },
});

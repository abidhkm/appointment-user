import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {formatDate} from '../utils/formatDate';

function SlotItem({name, contact, start, end}) {
  return (
    <View style={styles.item}>
      <Text>{`${formatDate(start)} <---> ${formatDate(end)}`}</Text>
      <View style={styles.subsection}>
        <Text style={styles.subsectionData}>{name}</Text>
        <Text style={styles.subsectionData}>{`  ${contact}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
  subsection: {
    display: 'flex',
    flexDirection: 'row',
  },
  subsectionData: {
    fontSize: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default SlotItem;

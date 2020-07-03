import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';
import {callApi} from '../utils/api';
import SlotItem from '../components/slotItem';

const ConfirmedAppointments = ({navigation}) => {
  const [sellers, setSellers] = useState([]);
  useEffect(() => {
    const fetchTImeSlots = async () => {
      const res = await callApi(
        'get',
        'catalog/appointments-buyer?status=confirmed',
      );

      const sellersList = res.data.map(({slot}, index) => ({
        start: slot.start,
        end: slot.end,
        contact: slot.seller.user.contact,
        name: slot.seller.user.name,
        id: index.toString(),
      }));
      setSellers(sellersList);
    };
    fetchTImeSlots();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sellers}
        renderItem={({item}) => <SlotItem {...item} navigation={navigation} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

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
  title: {
    fontSize: 32,
  },
});

export default ConfirmedAppointments;

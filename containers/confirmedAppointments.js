import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';
import {callApi} from '../utils/api';
import SlotItem from '../components/slotItem';

const ConfirmedAppointments = ({navigation}) => {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    const fetchConfirmedAppointments = async () => {
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
      setAppointments(sellersList);
    };
    fetchConfirmedAppointments();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={appointments}
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
});

export default ConfirmedAppointments;

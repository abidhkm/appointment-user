import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, FlatList, Text} from 'react-native';
import {callApi} from '../utils/api';
import SlotItem from '../components/slotItem';

const PendingAppointments = ({navigation}) => {
  const [appointments, setAppointments] = useState([]);
  //   useEffect(() => {
  // }, []);

  useEffect(() => {
    const fetchPendingAppointments = async () => {
      const res = await callApi(
        'get',
        'catalog/appointments-buyer?status=pending',
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
    const interval = setInterval(() => {
      fetchPendingAppointments();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pending appointments</Text>

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
  title: {
    paddingHorizontal: 14,
    fontSize: 24,
    marginVertical: 10,
  },
});

export default PendingAppointments;

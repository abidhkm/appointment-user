import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  //   ScrollView,
  // View,
  Text,
  //   StatusBar,
  FlatList,
  // TouchableOpacity,
  Button,
  View,
} from 'react-native';
import {callApi} from '../utils/api';
import {USER} from '../config';
import {formatDate} from '../utils/formatDate';

function Item({start, end, _id}) {
  const [isSent, setIsSent] = useState(false);
  const handleSendReq = async () => {
    const res = await callApi('post', 'catalog/appointment', {
      buyer: USER,
      slot: _id,
    });
    setIsSent(true);
    console.log(res);
  };

  return (
    <View style={styles.item}>
      <Text style={styles.subsectionData}>Start: {formatDate(start)}</Text>
      <Text style={styles.subsectionData}>End: {formatDate(end)}</Text>
      {!isSent && <Button title="Send request" onPress={handleSendReq} />}
      {isSent && <Text style={styles.subsectionData}>Request sent!</Text>}
    </View>
  );
}

const Slots = ({navigation, route}) => {
  const [slots, setSlots] = useState([]);

  //   useEffect(() => {
  //   }, [route.params.sellerId]);

  useEffect(() => {
    const fetchTImeSlots = async () => {
      const res = await callApi('get', 'catalog/available-slots', {
        seller: route.params.sellerId,
      });

      setSlots(res.data);
    };
    const interval = setInterval(() => {
      fetchTImeSlots();
      //   fetchPendingAppointments();
    }, 3000);
    return () => clearInterval(interval);
  }, [route.params.sellerId]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={slots}
        renderItem={({item}) => <Item {...item} navigation={navigation} />}
        keyExtractor={item => item._id}
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

export default Slots;

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {callApi} from '../utils/api';

function Item({name, contact, email, navigation, id}) {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate('Slots', {sellerId: id});
      }}>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.subsection}>
        <Text style={styles.subsectionData}>{contact}</Text>
        <Text style={styles.subsectionData}>{`  ${email}`}</Text>
      </View>
    </TouchableOpacity>
  );
}

const SellersList = ({navigation}) => {
  const [sellers, setSellers] = useState([]);
  useEffect(() => {
    const fetchSellers = async () => {
      const res = await callApi('get', 'catalog/sellers');

      const sellersList = res.data.map(({user, _id}) => ({
        id: _id,
        name: user.name,
        email: user.email,
        contact: user.contact,
      }));
      setSellers(sellersList);
    };
    fetchSellers();
  }, []);

  const [searchStr, setSearchStr] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const filteredList = sellers.filter(_seller => {
      const sellerName = _seller.name.toLowerCase();
      const sellerEmail = _seller.email.toLowerCase();
      return sellerName.includes(searchStr) || sellerEmail.includes(searchStr);
    });
    setFiltered(filteredList);
  }, [searchStr, sellers]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={text => setSearchStr(text)}
        value={searchStr}
        placeholder="Search seller"
      />
      <FlatList
        data={filtered}
        renderItem={({item}) => <Item {...item} navigation={navigation} />}
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
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 16,
    marginTop: 10,
  },
});

export default SellersList;

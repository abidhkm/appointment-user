/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  //   SafeAreaView,
  //   StyleSheet,
  //   ScrollView,
  View,
  Text,
  //   StatusBar,
  //   FlatList,
  //   TouchableOpacity,
} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './containers/home';
// import Slots from './containers/slots';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ConfirmedAppointments from './containers/confirmedAppointments';
import PendingAppointments from './containers/pendingAppointments';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen
        name="Confirmed"
        component={ConfirmedAppointments}
        options={{title: 'Confirmed appointment'}}
      />
      <Drawer.Screen
        name="Pending"
        component={PendingAppointments}
        options={{title: 'Pending appointments'}}
      />
    </Drawer.Navigator>
  );
}

const Stack = createStackNavigator();

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
};

export default App;

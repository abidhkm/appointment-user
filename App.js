import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Home from './containers/home';
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

const App = () => {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
};

export default App;

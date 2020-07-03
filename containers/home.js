import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Slots from './slots';
import SellersList from './sellers';

const Stack = createStackNavigator();

const _Home = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={SellersList}
        options={{title: 'Sellers'}}
      />
      <Stack.Screen
        name="Slots"
        component={Slots}
        options={{title: 'Available Slots'}}
      />
    </Stack.Navigator>
  );
};

export default _Home;

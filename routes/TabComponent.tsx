import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import Pets from '../src/view/Pets';
import Agenda from '../src/view/Agenda';
import Health from '../src/view/Health';
import Vaccine from '../src/view/Vaccine';

const Tab = createBottomTabNavigator();

function TabsComponent() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen 
        name="Pets" 
        options={{
          tabBarIcon: () => {
            return <Ionicons name="paw" size={24} color='#05386B' />
          },
          tabBarActiveTintColor: '#05386B',
          tabBarActiveBackgroundColor: '#EDF5E1',
          tabBarInactiveBackgroundColor: '#5CDB95',
          tabBarInactiveTintColor: '#05386B',
        }} >
        {propsPets => <Pets />}
      </Tab.Screen>
      <Tab.Screen 
        name="Agenda" 
        options={{
          tabBarIcon: () => {
            return <Ionicons name="calendar-sharp" size={24} color="#05386B" />
          },
          tabBarActiveTintColor: '#05386B',
          tabBarActiveBackgroundColor: '#EDF5E1',
          tabBarInactiveBackgroundColor: '#5CDB95',
          tabBarInactiveTintColor: '#05386B',
          
          }} >
        {propsAgenda => <Agenda />}
      </Tab.Screen>
      <Tab.Screen 
        name="Saúde" 
        options={{
          tabBarIcon: () => {
            return <FontAwesome name="heartbeat" size={24} color="#05386B" />
          },
          tabBarActiveTintColor: '#05386B',
          tabBarActiveBackgroundColor: '#EDF5E1',
          tabBarInactiveBackgroundColor: '#5CDB95',
          tabBarInactiveTintColor: '#05386B',
          }} >
        {propsAgenda => <Health />}
      </Tab.Screen>
      <Tab.Screen 
        name="Vacinas" 
        options={{
          tabBarIcon: () => {
            return <FontAwesome5 name="syringe" size={24} color="#05386B" />
          },
          tabBarActiveTintColor: '#05386B',
          tabBarActiveBackgroundColor: '#EDF5E1',
          tabBarInactiveBackgroundColor: '#5CDB95',
          tabBarInactiveTintColor: '#05386B',
          }} >
        {propsAgenda => <Vaccine />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default TabsComponent;
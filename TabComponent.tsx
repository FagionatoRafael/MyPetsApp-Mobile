import { AppRegistry, Button, Image, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import Pets from './src/view/Pets';
import Agenda from './src/view/Agenda';

const Tab = createBottomTabNavigator();

function TabsComponent() {
  return (
      <Tab.Navigator screenOptions={{
        headerTitle: props => <Text>Aloo</Text>,
        headerLeft: () => (
          <Ionicons name="menu" style={{marginLeft: 20}} size={30} color="black" onPress={() => alert('This is a button!')}/>
        ),
        headerRight: () => (
          <Image source={require('./assets/logo-icon.png')} style={{width: 30, height: 30, marginRight: 20}}/>
        ),
        headerStyle: {
          backgroundColor: '#5CDB95'
        }
      }}>
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
          {props => <Pets />}
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
          {props => <Agenda />}
        </Tab.Screen>
        <Tab.Screen 
          name="Health" 
          options={{
            tabBarIcon: () => {
              return <FontAwesome name="heartbeat" size={24} color="#05386B" />
            },
            tabBarActiveTintColor: '#05386B',
            tabBarActiveBackgroundColor: '#EDF5E1',
            tabBarInactiveBackgroundColor: '#5CDB95',
            tabBarInactiveTintColor: '#05386B',
            }} >
          {props => <Agenda />}
        </Tab.Screen>
      </Tab.Navigator>
  );
}

export default TabsComponent;
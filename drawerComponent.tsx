import { createDrawerNavigator } from '@react-navigation/drawer';
import { AppRegistry, Button, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import CustomDrawerContent from './customDrawer';
import Config from './src/view/config';
import { NavigationContainer } from '@react-navigation/native';
import TabsComponent from './TabComponent'

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    // <NavigationContainer>
      <Drawer.Navigator 
        useLegacyImplementation 
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="Home"
          component={TabsComponent}
          options={{ 
            drawerLabel: 'Home', 
            headerRight: () => (
              <Image source={require('./assets/logo-icon.png')} style={{width: '10%', height: '50%', marginRight: '5%'}}/>
            ),
            headerStyle: {
              backgroundColor: '#5CDB95'
            } 
          }}
        />
        <Drawer.Screen
          name="Notifications"
          component={Config}
          options={{ 
            drawerLabel: 'Updates',
            headerRight: () => (
              <Image source={require('./assets/logo-icon.png')} style={{width: '10%', height: '50%', marginRight: '5%'}}/>
            ),
            headerStyle: {
              backgroundColor: '#5CDB95'
            } 
          }}
        />
      </Drawer.Navigator>
    // </NavigationContainer>
  );
}

export default MyDrawer;
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image } from 'react-native';
import CustomDrawerContent from './customDrawer';
import Config from '../src/view/config';
import TabsComponent from './TabComponent'

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator 
      useLegacyImplementation 
      initialRouteName="Pets"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{title: 'alo'}}
    >
      <Drawer.Screen
        name="Pets"
        component={TabsComponent}
        options={{ 
          drawerLabel: 'Pets', 
          headerRight: () => (
            <Image source={require('./assets/logo-icon.png')} style={{width: '10%', height: '50%', marginRight: '5%'}}/>
          ),
          headerStyle: {
            backgroundColor: '#5CDB95'
          } 
        }}
      />
      <Drawer.Screen
        name="Configuracoes"
        component={Config}
        options={{ 
          drawerLabel: 'Configurações',
          headerRight: () => (
            <Image source={require('./assets/logo-icon.png')} style={{width: '10%', height: '50%', marginRight: '5%'}}/>
          ),
          headerStyle: {
            backgroundColor: '#5CDB95'
          } 
        }}
      />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
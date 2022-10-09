import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image } from 'react-native';
import CustomDrawerContent from './customDrawer';
import Config from '../src/view/config';
import TabsComponent from './TabComponent'
import { useEffect, useState } from 'react';
import asyncStorage from '../util/asyncStorage';
import { apiMain } from '../services/connction';
import moment from 'moment';

const Drawer = createDrawerNavigator();

function MyDrawer() {

  const [nome, setNome] = useState<string>();
  const [dtInit, setDtInit] = useState<string>();
  const [dtLastLogin, setDtLastLogin] = useState<string>();
  const [isFirstTime, setIsFirstTime] = useState(true)

  useEffect(() => {
    const getToken = asyncStorage.get('token');
    getToken.then((value) => {
      apiMain.get('user', {
          headers: { Authorization: `Bearer ${value.access_token}` }
      }).then((v) => {
        setNome(v.data.name);
        setDtInit(v.data.dtSignin);
        setDtLastLogin(v.data.dtLastLogin);
        setIsFirstTime(v.data.isFirstTime)
      }).catch((err) => {
        console.log(401)
      })
    }) 
  }, [nome])

  useEffect(() => {
    const getToken = asyncStorage.get('token');
   
    if(isFirstTime) {
      getToken.then((value) => {
        apiMain.post('config', {
          isNoteOne: true,
          isNoteTwo: true,
          isNoteThree: true,
          isMailOne: true,
          isMailTwo: true,
          isMailThree: true
        }, {
          headers: { Authorization: `Bearer ${value.access_token}` }
        }).then((v) => {
          console.log(v.status)
        }).catch((err) => {
          console.log(401)
        })
      
        apiMain.patch('user', {
          isFirstTime: false
        }, {
          headers: { Authorization: `Bearer ${value.access_token}` }
        }).then((v) => {
          console.log(v.status)
        }).catch((err) => {
          console.log(401)
        })
        setIsFirstTime(false);
      })
    }

    if(!moment(dtLastLogin).isSame(moment().format('l'))) {
      const getToken = asyncStorage.get('token')
      getToken.then((value) => {
        apiMain.patch('user', {
          dtLastLogin: moment().format('DD/MM/YYYY')
        }, {
          headers: { Authorization: `Bearer ${value.access_token}` }
        }).then((v) => {
          console.log(v.status)
        }).catch((err) => {
          console.log(401)
        })
      })
    }
  }, [isFirstTime, dtLastLogin])

  return (
    <Drawer.Navigator 
      useLegacyImplementation 
      initialRouteName="PetsDraw"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{title: nome}}
    >
      <Drawer.Screen
        name="PetsDraw"
        component={TabsComponent}
        options={{ 
          drawerLabel: 'Pets', 
          headerRight: () => (
            <Image source={require('../assets/logo-icon.png')} style={{width: '10%', height: '50%', marginRight: '5%'}}/>
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
            <Image source={require('../assets/logo-icon.png')} style={{width: '10%', height: '50%', marginRight: '5%'}}/>
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
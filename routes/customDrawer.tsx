import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
  } from '@react-navigation/drawer';
import { StackActions, useNavigation } from '@react-navigation/native';
import { SafeAreaView, Text, View, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import asyncStorage from '../util/asyncStorage';
import { apiMain } from '../services/connction';

interface IData {
	id: string,
	name: string,
	email: string,
	password: string,
	dtBirthDay: string,
	dtSignin: string,
	dtLastLogin: string
}

function CustomDrawerContent(props: any) {
  const navigation = useNavigation();

  const [nome, setNome] = useState<string>()
  const [data, setData] = useState<IData>()

  useEffect(() => {
    const getToken = asyncStorage.get('token')
    getToken.then((value) => {
      apiMain.get('user', {
          headers: { Authorization: `Bearer ${value.access_token}` }
      }).then((value) => {
        setNome(value.data.name)
        setData(value.data)
      })
    })
  }, [])

  // const [token, setToken] = useState({validation: 'jdsnvasndjvdfinjdfnjvdfnkmksd'});

  return (
    <DrawerContentScrollView {...props} style={{backgroundColor: '#5CDB95', height: '100%'}}>
      <View 
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          borderBottomColor: '#fff',
          borderBottomWidth: 2,
          padding: 10
        }}
      >
        <FontAwesome name="user-circle-o" size={30} color='#EDF5E1' />
        <Text style={{color: '#EDF5E1', fontSize: 24, fontWeight: 'bold'}}>{nome}</Text>
      </View>
      <DrawerItem
        label="Pets"
        labelStyle={{color: '#EDF5E1'}}
        style={{backgroundColor: '#8EE4AF'}}
        onPress={() => {navigation.navigate('Pets') }}
      />
      <DrawerItem
        label="Editar dados"
        labelStyle={{color: '#EDF5E1'}}
        style={{backgroundColor: '#8EE4AF'}}
        onPress={() => {navigation.navigate('EditUser', data) }}
      />
      <DrawerItem
        label="Configurações"
        labelStyle={{color: '#EDF5E1'}}
        style={{backgroundColor: '#8EE4AF'}}
        onPress={() => navigation.navigate('Configuracoes')}
      />
      <DrawerItem
        label="Sair"
        labelStyle={{color: '#EDF5E1'}}
        style={{backgroundColor: '#FF0000'}}
        onPress={() => {
          asyncStorage.remove('token').then((value) => {
            console.log("limpando tudo: " + value)
          })
          asyncStorage.clearAll();
          navigation.dispatch(StackActions.replace('Home'));
          // navigation.navigate('Home')
        }}
      />
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
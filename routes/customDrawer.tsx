import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
  } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, Text, View, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

function CustomDrawerContent(props: any) {
  const navigation = useNavigation();

  const [token, setToken] = useState({validation: 'jdsnvasndjvdfinjdfnjvdfnkmksd'});

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
        <Text style={{color: '#EDF5E1', fontSize: 24, fontWeight: 'bold'}}>Rafael</Text>
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
        onPress={() => {navigation.navigate('EditUser', token) }}
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
        onPress={() => navigation.navigate('Home')}
      />
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
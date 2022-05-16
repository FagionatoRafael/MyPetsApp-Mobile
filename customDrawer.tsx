import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
  } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; 
import { SafeAreaView, Text, View, Image } from 'react-native';

function CustomDrawerContent(props: any) {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props} style={{backgroundColor: '#5CDB95'}}>
      <DrawerItem
        label="Pets"
        labelStyle={{color: '#EDF5E1'}}
        style={{backgroundColor: '#8EE4AF'}}
        onPress={() => {navigation.navigate('Pets') }}
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

      <DrawerItem
        label="Versão 1.0.0"
        labelStyle={{color: '#EDF5E1', marginTop: '25%'}}
        onPress={() => alert('versão 1.0.0')}
      />
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
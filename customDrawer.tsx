import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
  } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, Text, View, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

function CustomDrawerContent(props: any) {
  const navigation = useNavigation();

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
      <Text 
        style={{
          display: 'flex',
          width: '100%',
          paddingTop: '10%',
          textAlign: 'center',
          marginTop: '160%', 
          // marginLeft: '15%', 
          color: '#EDF5E1',
          borderColor: '#EDF5E1',
          
          borderTopWidth: 2
          
        }} 
        onPress={() => alert('versão 1.0.0')}>Versão 1.0.0</Text>
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
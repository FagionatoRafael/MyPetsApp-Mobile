import { SafeAreaView, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Container from '../../components/Container';
import { AntDesign } from '@expo/vector-icons'; 
import { useEffect, useState } from 'react';

const Confirmation = () => {
    const navigation = useNavigation();

    const [nomeStack, setNameStack] = useState<any>(String(navigation.getState().routes[1].name))
    // const nameStack: any = n

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home')
        }, 4000)
    })

    return (
        <Container>
            <View style={styles.confirmationContainer}>
                <AntDesign name="checkcircle" size={150} color="#05386B" />
                
                <Text style={styles.confirmationText}>
                    {nomeStack === 'Signin' ? 'Usuário cadastrado'  : 'email enviado'}
                </Text>
            </View>
        </Container>
    );
}

export default Confirmation;
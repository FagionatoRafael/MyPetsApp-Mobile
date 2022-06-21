import { SafeAreaView, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Container from '../../components/Container';
import { AntDesign } from '@expo/vector-icons'; 
import { useEffect } from 'react';

const Confirmation = () => {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home')
        }, 4000)
    })

    return (
        <Container>
            <View style={styles.confirmationContainer}>
                <AntDesign name="checkcircle" size={150} color="#05386B" />
                <Text style={styles.confirmationText}>Usuário cadastrado</Text>
            </View>
        </Container>
    );
}

export default Confirmation;
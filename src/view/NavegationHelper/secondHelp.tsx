import { Text, View } from 'react-native';
import styles from './styles';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ProgressBar, Button } from 'react-native-paper';

import Container from '../../components/Container';

const NavegationSecond = () => {
    const navigation = useNavigation();

    return (
        <Container>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Descrição</Text>
            </View>
            <View style={styles.navigationContainer}>
                <Text style={styles.navegationText}>Este App foi feito para organizar e ajudar na criação de seus pets</Text>
                <View style={styles.groupButton}>
                    <Button 
                        mode="text" 
                        color='#EDF5E1' 
                        onPress={() => navigation.navigate('NavegationOne')}>
                        voltar
                    </Button>

                    <Button 
                        mode="text" 
                        color='#EDF5E1' 
                        onPress={() => navigation.navigate('NavegationThird')}>
                        Proximo
                    </Button>
                </View>
                <ProgressBar style={styles.progress} progress={0.5} color={'#05386B'} />
            </View>
           
        </Container>
    );
}

export default NavegationSecond;
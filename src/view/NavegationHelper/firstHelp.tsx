import { Text, View } from 'react-native';
import styles from './styles';
import { useEffect, useState } from 'react';
import { useNavigation, NavigationAction, StackActions } from '@react-navigation/native';
import { ProgressBar, Button } from 'react-native-paper';

import Container from '../../components/Container';
import asyncStorage from '../../../util/asyncStorage';

const NavegationOne = () => {
    const navigation = useNavigation();

    return (
        <Container>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Como usar?</Text>
            </View>
            <View style={styles.navigationContainer}>
                <Text style={styles.navegationText}>
                    O App é bem simples e pratico para utilizar, 
                    primeiro use o icone de + para adicionar os seus pets, tarefas e vacinas desejadas. 
                    Para editar ou excluir um pet basta que clique em editar no card do pet. 
                </Text>
                <View style={styles.groupButton}>
                    <Button 
                        mode="text" 
                        color='#EDF5E1' 
                        onPress={() => {
                            navigation.dispatch(StackActions.replace('drawer'))
                        }}>
                        pular
                    </Button>

                    <Button 
                        mode="text" 
                        color='#EDF5E1' 
                        onPress={() => navigation.navigate('NavegationSecond')}>
                        Proximo
                    </Button>
                </View>
                <ProgressBar style={styles.progress} progress={0} color={'#05386B'} />
            </View>
           
        </Container>
    );
}

export default NavegationOne;
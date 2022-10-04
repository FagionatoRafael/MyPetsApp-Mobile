import { Text, View } from 'react-native';
import styles from './styles';
import { useEffect, useState } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { ProgressBar, Button } from 'react-native-paper';

import Container from '../../components/Container';

const NavegationThird = () => {
    const navigation = useNavigation();

    let [step, setStep] = useState(0);
    
    const [texts, setTexts] = useState([
        {
            title: 'Como usar?',
            text: 'Aqui entra o como usar o app de maneira correta. Use o + para adicionar mais um pet',
            progress: 0
        },
        {
            title: 'Descrição',
            text: 'Este App foi feito para organizar e ajudar na criação de seus pets',
            progress: 0.5
        },
        {
            title: 'Vamos começar',
            text: 'Espero que te ajude a cuidar :)',
            progress: 1
        }
    ])

    useEffect(() => {
        setTexts(texts)
    }, [texts])

    const nextStep = () => {
        if(texts.length < 4)
            setStep(step++)

        console.log(step)
    }

    const previousStep = () => {
        if(texts.length > 0)
            setStep(step--)
    }

    return (
        <Container>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Vamos começar</Text>
            </View>
            <View style={styles.navigationContainer}>
                <Text style={styles.navegationText}>Espero que te ajude a cuidar :)</Text>
                <View style={styles.groupButton}>
                    <Button 
                        mode="text" 
                        color='#EDF5E1' 
                        onPress={() => navigation.navigate('NavegationSecond')}>
                        voltar
                    </Button>

                    <Button 
                        mode="text" 
                        color='#EDF5E1' 
                        onPress={() => {navigation.dispatch(StackActions.replace('drawer'))}}>
                        Começar
                    </Button>
                </View>
                <ProgressBar style={styles.progress} progress={1} color={'#05386B'} />
            </View>
           
        </Container>
    );
}

export default NavegationThird;
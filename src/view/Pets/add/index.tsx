import { Text, View } from 'react-native';
import styles from './styles';
import { Button } from 'react-native-paper';
import { SetStateAction, useState } from 'react';
import { useFonts, Dosis_400Regular } from '@expo-google-fonts/dosis';
import { useNavigation } from '@react-navigation/native';

import InputCustom from '../../../components/Input';
import Container from '../../../components/Container';

const AddPet = () => {
    const navigation = useNavigation();

    let [fontsLoaded] = useFonts({
        Dosis_400Regular,
    });

    const [text, setText] = useState('');

    const onChangeText = (text: SetStateAction<string>) => setText(text);
 
    const hasErrors = () => {
        return !text.includes('@');
    };

    return (
        <Container margin={false}>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Adicione seu pet</Text>
            </View>
            <View style={styles.form}>
                <InputCustom label='Nome do Pet' text={text} hasErros={hasErrors} onChangeText={onChangeText}/>
                <InputCustom label='Data de nascimento' text={text} hasErros={hasErrors} onChangeText={onChangeText}/>
                <InputCustom label='Raça' text={text} hasErros={hasErrors} onChangeText={onChangeText}/>
                <InputCustom label='Peso' text={text} hasErros={hasErrors} onChangeText={onChangeText}/>    
                <InputCustom label='Descrição' text={text} hasErros={hasErrors} onChangeText={onChangeText}/>    
                
                <Button style={styles.button} mode="contained" onPress={() => console.log('Pressed')}>
                    Adicionar
                </Button>
            </View>
        </Container>
    );
}

export default AddPet;
import { Text, View } from 'react-native';
import styles from './styles';
import { Button } from 'react-native-paper';
import { SetStateAction, useState } from 'react';
import { useFonts, Dosis_400Regular } from '@expo-google-fonts/dosis';
import { useNavigation } from '@react-navigation/native';

import InputCustom from '../../components/Input';
import Container from '../../components/Container';

const ForgetPass = () => {
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
        <Container>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Esqueci minha senha</Text>
            </View>
            <View style={styles.form}>
                <InputCustom label='Email' text={text} hasErros={hasErrors} onChangeText={onChangeText}/>

                <Button style={styles.button} mode="contained" onPress={() => console.log('Pressed')}>
                    Enviar
                </Button>

                <Button 
                    style={styles.buttonText} 
                    color='#05386B' 
                    mode="text" 
                    onPress={() => navigation.navigate('Home')}
                >
                    Voltar
                </Button>

            </View>
        </Container>
    );
}

export default ForgetPass;
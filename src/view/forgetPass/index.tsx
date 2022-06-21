import { Text, View } from 'react-native';
import styles from './styles';
import { Button } from 'react-native-paper';
import { SetStateAction, useState } from 'react';
import { useFonts, Dosis_400Regular } from '@expo-google-fonts/dosis';
import { useNavigation } from '@react-navigation/native';

import InputCustom from '../../components/Input';
import Container from '../../components/Container';
import { emailValidation } from '../../../util/validations';

const ForgetPass = () => {
    const navigation = useNavigation();

    let [fontsLoaded] = useFonts({
        Dosis_400Regular,
    });

    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState(false)

    const onChangeEmail = (text: SetStateAction<string>) => setEmail(text);
 
    const hasErrors = () => {
        return emailValidation(email)
    };

    return (
        <Container>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Esqueci minha senha</Text>
            </View>
            <View style={styles.form}>
                <InputCustom label='Email' text={email} hasErros={emailErr} onChangeText={onChangeEmail} invalidText={'Email não cadastrado'}/>

                <Button 
                    style={styles.button} 
                    mode="contained" 
                    onPress={() => {
                        setEmailErr(hasErrors())
                        if(!hasErrors()) {
                            navigation.navigate('Confirmation')
                        }
                    }}
                >
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
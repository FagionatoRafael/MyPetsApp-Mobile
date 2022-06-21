import { SafeAreaView, Text, View, Image } from 'react-native';
import styles from './styles';
import { HelperText, TextInput, Button } from 'react-native-paper';
import { SetStateAction, useState } from 'react';
import { useFonts, Dosis_400Regular } from '@expo-google-fonts/dosis';
import { useNavigation } from '@react-navigation/native';

import InputCustom from '../../components/Input';
import Container from '../../components/Container';

import { emailValidation, passwordValidation } from '../../../util/validations';

const Home = () => {
    const navigation = useNavigation();

    let [fontsLoaded] = useFonts({
        Dosis_400Regular,
    });
    const [emailError, setEmailError] = useState(false)
    const [email, setEmail] = useState('');
    const [passError, setPassError] = useState(false)
    const [password, setPassword] = useState('');

    const onChangeEmail = (text: SetStateAction<string>) => setEmail(text);
    const onChangePassword = (text: SetStateAction<string>) => setPassword(text);
 
    const hasErrorsEmail = () => {
        return emailValidation(email);
        
    };
    const hasErrorsPassword = () => {
        return passwordValidation(password)
    };

    return (
        <Container>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>IPetsApp</Text>
            </View>
            <View style={styles.form}>
                <InputCustom 
                    label='Email' 
                    invalidText='Email invalido!'
                    text={email} 
                    hasErros={emailError} 
                    onChangeText={onChangeEmail}
                />
                <InputCustom 
                    label='Password'
                    invalidText='Senha invalida!' 
                    text={password} 
                    hasErros={passError} 
                    onChangeText={onChangePassword}
                />

                <Button 
                    style={styles.button} 
                    mode="contained" 
                    onPress={() => {
                        setEmailError(hasErrorsEmail()); 
                        setPassError(hasErrorsPassword())
                        if(!hasErrorsEmail() && !hasErrorsPassword()) {
                            navigation.navigate('NavegationOne')
                        }
                    }}
                >
                    Entrar
                </Button>

                <Button 
                    style={styles.buttonText} 
                    color='#05386B' 
                    mode="text" 
                    onPress={() => navigation.navigate('Signin')}
                >
                    cadastre-se
                </Button>

                <Button 
                    style={styles.buttonText} 
                    color='#05386B' 
                    mode="text" 
                    onPress={() => navigation.navigate('ForgetPass')}
                >
                    esqueci a senha
                </Button>

            </View>
        </Container>
    );
}

export default Home;
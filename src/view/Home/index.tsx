import { SafeAreaView, Text, View, Image } from 'react-native';
import styles from './styles';
import { HelperText, TextInput, Button } from 'react-native-paper';
import { SetStateAction, useEffect, useState } from 'react';
import { useFonts, Dosis_400Regular } from '@expo-google-fonts/dosis';
import { useNavigation } from '@react-navigation/native';

import InputCustom from '../../components/Input';
import Container from '../../components/Container';

import { emailValidation, passwordValidation, statusValidation } from '../../../util/validations';
import asyncStorage from '../../../util/asyncStorage';
import { apiMain } from '../../../services/connction';

const Home = () => {
    const navigation = useNavigation();

    let [fontsLoaded] = useFonts({
        Dosis_400Regular,
    });
    const [emailError, setEmailError] = useState(false)
    const [email, setEmail] = useState('');
    const [passError, setPassError] = useState(false)
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState<number>();
    const [statusError, setStatusError] = useState(false)

    const onChangeEmail = (text: SetStateAction<string>) => setEmail(text);
    const onChangePassword = (text: SetStateAction<string>) => setPassword(text);
 
    const hasErrorsEmail = () => {
        return emailValidation(email);
        
    };
    const hasErrorsPassword = () => {
        return passwordValidation(password)
    };

    const hasErrorsStatus = () => {
        if(status !== undefined)
            return statusValidation(status)
    };

    const [token, setToken] = useState<object>()
    const getToken = () => {
        apiMain.post("/auth/login", {
            "email": email, 
            "password": password
        }).then((ev) => {
            if(ev) {
                // console.log(ev)
                setStatus(ev.status)
                setToken(ev.data)
                asyncStorage.set('token', ev.data)
            }
        }).catch((err: string) => {
            console.log(401)
            setStatus(401)
        })
    }

    useEffect(() => {
        asyncStorage.remove('token').then((value) => {
            console.log("limpando tudo: " + value)
        })

        setEmail('rafael@gmail.com');
        setPassword('123456')
    }, [])

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
                    keyboardType={'email-address'}
                    onChangeText={onChangeEmail}
                />
                <InputCustom 
                    label='Password'
                    invalidText='Senha invalida!' 
                    text={password} 
                    hasErros={passError} 
                    secureTextEntry={true}
                    onChangeText={onChangePassword}
                />

                <Button 
                    style={styles.button} 
                    mode="contained" 
                    onPress={() => {
                        if(hasErrorsStatus()) {
                            setEmailError(true); 
                            setPassError(true);
                        }
                        setEmailError(hasErrorsEmail()); 
                        setPassError(hasErrorsPassword());
                        getToken();
                        if((!hasErrorsStatus() && !hasErrorsPassword() && !hasErrorsEmail()) || ((email === 'admin' || email === 'Admin')  && (password === 'admin' || password === 'Admin'))) {
                            setTimeout(() => {
                                asyncStorage.get('token').then((value) => {
                                    console.log(value)
                                    if(value !== undefined) {
                                        navigation.navigate('NavegationOne');
                                    }
                                })
                            }, 1000)
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
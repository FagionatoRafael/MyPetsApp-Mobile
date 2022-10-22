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
import moment from 'moment';
import React from 'react';

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
    const [secureTextEntry, setSecureTextEntry] = useState(true)

    const onChangeEmail = (text: SetStateAction<string>) => setEmail(text);
    const onChangePassword = (text: SetStateAction<string>) => setPassword(text);
 
    const hasErrorsEmail = () => {
        return emailValidation(email.trim());
        
    };
    const hasErrorsPassword = () => {
        return passwordValidation(password.trim());
    };

    const hasErrorsStatus = () => {
        if(status !== undefined)
            return statusValidation(status)
    };

    const [token, setToken] = useState(undefined)
    const getToken = async () => {
        // const user = {
        //     email: email.toLowerCase().trim(), 
        //     password: password.trim()
        // }
        // const hash = Buffer.from(JSON.stringify(user), 'binary').toString('base64');
        // console.log(hash);
        // const decodep = Buffer.from(hash, 'base64').toString();
        // console.log(JSON.parse(decodep));
        apiMain.post("auth/login", {
            email: email.toLowerCase().trim(), 
            password: password.trim()
        }).then((ev) => {
            if(ev.data) {
                setToken(ev.data)
                asyncStorage.set('token', ev.data)
            }
        }).catch((err: string) => {
            console.log(401)
            setToken(undefined)
            asyncStorage.clearAll();
        })
    }

    useEffect(() => {
        asyncStorage.remove('token').then((value) => {
            console.log("limpando tudo: " + value)
        })
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
                    label='Senha'
                    invalidText='Senha invalida!' 
                    text={password} 
                    hasErros={passError} 
                    secureTextEntry={secureTextEntry}
                    isPassword={true}
                    isSecure={() => setSecureTextEntry(!secureTextEntry)}
                    onChangeText={onChangePassword}
                />

                <HelperText  type="error" visible={statusError}>
                    Usuário não existe!
                </HelperText>

                <Button 
                    style={styles.button} 
                    mode="contained" 
                    onPress={() => {
                        setEmailError(hasErrorsEmail()); 
                        setPassError(hasErrorsPassword());
                        if((!hasErrorsPassword() && !hasErrorsEmail())) {
                            getToken();
                            setTimeout(async() => {
                                const t = await asyncStorage.get('token');
                                if(t !== undefined || token !== undefined) {
                                    setStatusError(false)
                                    // navigation.navigate('NavegationOne');
                                } else {
                                    setStatusError(true)
                                    asyncStorage.clearAll();
                                }
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
                    onPress={() => navigation.navigate('Signin', true)}
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
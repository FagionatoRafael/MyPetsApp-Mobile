import { SafeAreaView, Text, View, Image } from 'react-native';
import styles from './styles';
import { HelperText, TextInput, Button, ActivityIndicator, Colors } from 'react-native-paper';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { useFonts, Dosis_400Regular } from '@expo-google-fonts/dosis';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

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
    const responseListener = useRef<any>();

    const [isLoading, setIsLoading] = useState(false);
    const [disabled, setDisable] = useState(false);

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
        const t = await asyncStorage.get('token');
        if(t === undefined && (!hasErrorsPassword() && !hasErrorsEmail())) {
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
        
    }

    useEffect(() => {
        getToken()
    })

    useEffect(() => {
        asyncStorage.remove('token').then((value) => {
            console.log("limpando tudo: " + value)
        })
        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener((response: any) => {
            if(response.notification.request.content.data.token.access_token) {
                apiMain.get('profile', {
                    headers: { Authorization: `Bearer ${response.notification.request.content.data.token.access_token}` }
                }).then((value) => {
                    if(value.data) {
                        setEmail(value.data.email);
                    }
                    console.log(value.data);
                })
            }
            // console.log(response);
        });

        return  () => {
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, [])

    return (
        <Container>
            {isLoading ?
                <ActivityIndicator animating={true} color={Colors.white} />
                : null
            }
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>MyPetsApp</Text>
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
                    disabled={disabled}
                    onPress={() => {
                        setEmailError(hasErrorsEmail()); 
                        setPassError(hasErrorsPassword());
                        if((!hasErrorsPassword() && !hasErrorsEmail())) {
                            // getToken();
                            setIsLoading(true);
                            setDisable(true);
                            setTimeout(async() => {
                                const t = await asyncStorage.get('token');
                                if(t !== undefined || token !== undefined) {
                                    setIsLoading(false);
                                    setDisable(false);
                                    setStatusError(false)
                                    navigation.navigate('NavegationOne');
                                } else {
                                    setStatusError(true)
                                    setIsLoading(false);
                                    setDisable(false);
                                    asyncStorage.clearAll();
                                }
                            }, 2000)

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
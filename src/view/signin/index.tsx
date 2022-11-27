import { SafeAreaView, Text, View, Image, TextInput } from 'react-native';
import styles from './styles';
import { ActivityIndicator, Button, Colors, HelperText } from 'react-native-paper';
import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import InputCustom from '../../components/Input';
import moment from 'moment'

import DateTimePicker, { DateTimePickerResult } from '@react-native-community/datetimepicker';
import Container from '../../components/Container';
import { nameValidation, passwordValidation, emailValidation, dateValidation } from '../../../util/validations';
import { apiMain } from '../../../services/connction';
import asyncStorage from '../../../util/asyncStorage';

const Signin = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [dateText, setDateText] = useState('')
    const [hasDate, setDate] = useState<DateTimePickerResult>();
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [disabled, setDisable] = useState(false);

    const [nameErr, setNameErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [dateErr, setDateErr] = useState(false);

    const [isConect, setIsConect] = useState(true);

    const onChangeName = (text: SetStateAction<string>) => setName(text);
    const onChangePassword = (text: SetStateAction<string>) => setPassword(text);
    const onChangeEmail = (text: SetStateAction<string>) => setEmail(text);

    const onChangeDateTime = (value: DateTimePickerResult) => {
        if(value.nativeEvent.timestamp) {
            let novo = moment(new Date(value.nativeEvent.timestamp || 1 * 1000)).format('DD/MM/YYYY');
            setDate(value)
            setDateText(novo)
            setVisible(false)
            console.log(dateText)
        }
    }
 
    const hasErrorsName = () => {
        return nameValidation(name)
    };
    const hasErrorsPassword = () => {
        return passwordValidation(password)
    };
    const hasErrorsEmail = () => {
        return emailValidation(email)
    };
    const hasErrorsDate = () => {
        return dateValidation(dateText)
    };

    const [visible, setVisible] = useState(false);
    const date = new Date();

    const [alreadyUser, setAlreadyUser] = useState(false)

    const getExistUser = () => {
        apiMain.post("email", {
            "email": email.trim()
        }).then((ev) => {
            console.log(ev.data)
            if(ev.data) {
                asyncStorage.set('exists', ev.data)
            }
        }).catch((err: string) => {
            console.log(401)
        })
    }

    const postUser = () => {
        apiMain.post('user', {
            name: name.trim(),
            password: password.trim(),
            dtBirthDay: dateText.trim(),
            dtSignin: moment().format('DD/MM/YYYY'),
            dtLastLogin: moment().format('DD/MM/YYYY'),
            email: email.toLowerCase().trim()
        }).then((ev) => {
            console.log(ev.status)
        }).catch((err) => console.log(err))
    }

    const hasConect = () => {
        apiMain.get('/').then(ev => {
            if(ev.data) {
                console.log(ev.status)
                setIsConect(false)
            }
        })
    }

    useEffect(() => {
        hasConect();
    }) 

    useEffect(() => {
        setName('');
        setEmail('');
        setPassword('');
        setDateText('');
    }, [navigation.getState().routes[navigation.getState().routes.length - 1].params])

    useEffect(() => {
        asyncStorage.remove('exists')
        if(!hasErrorsEmail()) {
            getExistUser();
        }
    }, [email])

    if(isConect) {
        return <Container>
            <ActivityIndicator animating={true} color={Colors.white} />
        </Container> 
    }

    return (
        <Container>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Cadastre-se</Text>
            </View>
            <View style={styles.form}>
               <InputCustom hasErros={nameErr} label={'Nome'} onChangeText={onChangeName} text={name} invalidText={'Nome deve ser maior de 2 letras!'}/>
               <InputCustom hasErros={emailErr} label={'Email'} onChangeText={onChangeEmail} text={email} invalidText={'Email Invalido!'} keyboardType={'email-address'}/>
               <InputCustom 
                    hasErros={passwordErr} 
                    label={'Senha'} 
                    onChangeText={onChangePassword} 
                    text={password} 
                    invalidText={'Senha deve ser maior que 6 letras ou numeros!'} 
                    secureTextEntry={secureTextEntry}
                    isPassword={true}
                    isSecure={() => setSecureTextEntry(!secureTextEntry)}
                />
               
               {visible ? 
                <DateTimePicker 
                    onChange={(value: any) => {
                        onChangeDateTime(value)
                        if(value.type !== 'set') {
                            setVisible(false)
                        }
                    }
                    
                    }
                    value={date}
                    minimumDate={new Date(1910, 0, 1)}
                    maximumDate={new Date()}
                    // onTouchCancel={(value: any) => setVisible(false)}
                />: <></>}

                <InputCustom 
                    hasTouch={() => setVisible(true)}
                    hasErros={dateErr}
                    label={'Data de aniversario'}
                    text={dateText} 
                    invalidText={'A data deve ser anterior a de hoje!'} 
                    onChangeText={() => console.log('alo')} 
                    editable={false}/>

                <HelperText  type="error" visible={alreadyUser}>
                    Email já cadastrado!
                </HelperText>

                <Button 
                    style={styles.button} 
                    mode="contained" 
                    disabled={disabled}
                    onPress={() => {
                        setNameErr(hasErrorsName())
                        setPasswordErr(hasErrorsPassword())
                        setEmailErr(hasErrorsEmail())
                        setDateErr(hasErrorsDate()) 
                        getExistUser();
                        if(!hasErrorsName() && !hasErrorsPassword() && !hasErrorsEmail() && !hasErrorsDate()) {
                            setDisable(true);
                            setTimeout(async() => {
                                const e = await asyncStorage.get('exists')
                                if(!e) {
                                    setAlreadyUser(false)
                                    postUser();
                                    setDisable(false);
                                    navigation.navigate('Confirmation')
                                } else {
                                    setAlreadyUser(true)
                                    setDisable(false);
                                }
                            }, 1000)
                        }
                    }}
                >
                    Cadastrar
                </Button>

                <Button 
                    style={styles.buttonText} 
                    color='#05386B' 
                    mode="text" 
                    onPress={() =>{navigation.navigate('Home')}}
                >
                    Voltar
                </Button>
            </View>
        </Container>
    );
}

export default Signin;
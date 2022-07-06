import { SafeAreaView, Text, View, Image, TextInput } from 'react-native';
import styles from './styles';
import { Button } from 'react-native-paper';
import React, { SetStateAction, useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import InputCustom from '../../components/Input';
import moment from 'moment'

import DateTimePicker, { DateTimePickerResult } from '@react-native-community/datetimepicker';
import Container from '../../components/Container';
import { nameValidation, passwordValidation, emailValidation, dateValidation } from '../../../util/validations';

const Signin = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [dateText, setDateText] = useState('')
    const [hasDate, setDate] = useState<DateTimePickerResult>();

    const [nameErr, setNameErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [dateErr, setDateErr] = useState(false);

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

    return (
        <Container>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Cadastre-se</Text>
            </View>
            <View style={styles.form}>
               <InputCustom hasErros={nameErr} label={'Nome'} onChangeText={onChangeName} text={name} invalidText={'Nome deve ser maior de 2 letras!'}/>
               <InputCustom hasErros={emailErr} label={'Email'} onChangeText={onChangeEmail} text={email} invalidText={'Email Invalido!'}/>
               <InputCustom hasErros={passwordErr} label={'Password'} onChangeText={onChangePassword} text={password} invalidText={'Senha deve ser maior que 6 letras ou numeros!'}/>
               
               {visible ? 
                <DateTimePicker 
                    onChange={(value: any) => onChangeDateTime(value)}
                    value={date}
                    // onTouchCancel={(value: any) => setVisible(false)}
                />: <></>}

                <InputCustom 
                    hasTouch={() => setVisible(true)}
                    hasErros={dateErr}
                    label={'Data de aniversario'}
                    text={dateText} 
                    invalidText={'A data deve ser anterior a de hoje!'} 
                    onChangeText={() => console.log('alo')} />

                <Button 
                    style={styles.button} 
                    mode="contained" 
                    onPress={() => {
                        setNameErr(hasErrorsName())
                        setPasswordErr(hasErrorsPassword())
                        setEmailErr(hasErrorsEmail())
                        setDateErr(hasErrorsDate()) 
                        if(!hasErrorsName() && !hasErrorsPassword() && !hasErrorsEmail() && !hasErrorsDate()) {
                            navigation.navigate('Confirmation')
                        }
                    }}
                >
                    Cadastrar
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

export default Signin;
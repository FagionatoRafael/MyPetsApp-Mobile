import { SafeAreaView, Text, View, Image, TextInput } from 'react-native';
import styles from './styles';
import { Button } from 'react-native-paper';
import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import InputCustom from '../../components/Input';
import moment from 'moment'
import { Feather } from '@expo/vector-icons';

import DateTimePicker, { DateTimePickerResult } from '@react-native-community/datetimepicker';
import Container from '../../components/Container';
import { nameValidation, passwordValidation, emailValidation, dateValidation } from '../../../util/validations';

const EditUser = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [dateText, setDateText] = useState('')
    const [hasDate, setDate] = useState<DateTimePickerResult>();
    const [deleteBotton, setDeleteBotton] = useState(true)

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

    useEffect(() => {
        const params = navigation.getState().routes[3].params
        if(params) {
            setName('Rafael')
            setEmail('Rafael@mail.com')
            setPassword('jdsncjsdn')
            setDateText('14/01/2000')
        }
    }, [])

    return (
        <Container margin={false}>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Altere seus dados</Text>
            </View>
            <View style={styles.form}>
               <InputCustom hasErros={nameErr} label={'Nome'} onChangeText={onChangeName} text={name} invalidText={'Nome deve ser maior de 2 letras!'}/>
               <InputCustom hasErros={emailErr} label={'Email'} onChangeText={onChangeEmail} text={email} invalidText={'Email Invalido!'}/>
               <InputCustom secureTextEntry={true} hasErros={passwordErr} label={'Password'} onChangeText={onChangePassword} text={password} invalidText={'Senha deve ser maior que 6 letras ou numeros!'}/>
               
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
                    onChangeText={() => console.log('alo')} 
                    editable={false}/>

                <View style={styles.groupButtons}>
                    <Button 
                        style={[styles.button, !deleteBotton ? {width: '100%'} : {}]} 
                        mode="contained" 
                        onPress={() => {
                            setNameErr(hasErrorsName())
                            setPasswordErr(hasErrorsPassword())
                            setEmailErr(hasErrorsEmail())
                            setDateErr(hasErrorsDate()) 
                            if(!hasErrorsName() && !hasErrorsPassword() && !hasErrorsEmail() && !hasErrorsDate()) {
                                navigation.goBack()
                            }
                        }}
                    >
                        Alterar
                    </Button>
                    {deleteBotton ? (<Button  mode="contained" style={styles.deleteButtom}>
                        <Feather name="trash-2" size={22} color="white" />
                    </Button>): <></>}
                </View>
            </View>
        </Container>
    );
}

export default EditUser;
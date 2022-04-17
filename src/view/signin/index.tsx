import { SafeAreaView, Text, View, Image, TextInput } from 'react-native';
import styles from './styles';
import { Button } from 'react-native-paper';
import React, { SetStateAction, useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import InputCustom from '../../components/Input';
import moment from 'moment'

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Container from '../../components/Container';

const Signin = () => {
    const navigation = useNavigation();

    const [text, setText] = useState('');
    const [dateText, setDateText] = useState('')
    const [hasDate, setDate] = useState<DateTimePickerEvent>();

    const onChangeText = (text: SetStateAction<string>) => setText(text);
 
    const hasErrors = () => {
        return !text.includes('@');
    };

    const [visible, setVisible] = useState(false);

    const onChangeDateTime = (value: DateTimePickerEvent) => {
        if(value.nativeEvent.timestamp) {
            let novo = moment(new Date(value.nativeEvent.timestamp || 1 * 1000)).format('DD/MM/YYYY');
            setDate(value)
            setDateText(novo)
            setVisible(false)
        }
    }

    const date = new Date();

    return (
        <Container>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Cadastre-se</Text>
            </View>
            <View style={styles.form}>
               <InputCustom hasErros={hasErrors} label={'Nome'} onChangeText={onChangeText} text={text}/>
               <InputCustom hasErros={hasErrors} label={'Email'} onChangeText={onChangeText} text={text}/>
               <InputCustom hasErros={hasErrors} label={'Password'} onChangeText={onChangeText} text={text}/>
               
               {visible ? 
                <DateTimePicker 
                    onChange={(value) => onChangeDateTime(value)}
                    value={date}
                />: <></>}

                <InputCustom 
                    hasTouch={() => setVisible(true)}
                    hasErros={hasErrors}
                    label={'Data de nascimento'}
                    onChangeText={() => onChangeText(text)} 
                    text={dateText}
                />

                <Button style={styles.button} mode="contained" onPress={() => console.log('Pressed')}>
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
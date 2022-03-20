import { SafeAreaView, Text, View, Image, TextInput } from 'react-native';
import styles from './styles';
import { Button } from 'react-native-paper';
import React, { SetStateAction, useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import InputCustom from '../../components/Input';

import { DateTimePickerModal } from 'react-native-paper-datetimepicker';

const Signin = () => {
    const navigation = useNavigation();

    const [text, setText] = useState('');

    const onChangeText = (text: SetStateAction<string>) => setText(text);
 
    const hasErrors = () => {
        return !text.includes('@');
    };

    const [visible, setVisible] = useState(false);
    const onDismiss = useCallback(() => {
        setVisible(false);
    }, [setVisible]);
    
    const onChange = useCallback(({ date }) => {
        setVisible(false);
        console.log({ date });
    }, []);

    const date = new Date();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Cadastre-se</Text>
            </View>
            <View style={styles.form}>
               <InputCustom hasErros={hasErrors} label={'Nome'} onChangeText={onChangeText} text={text}/>
               <InputCustom hasErros={hasErrors} label={'Email'} onChangeText={onChangeText} text={text}/>
               <InputCustom hasErros={hasErrors} label={'Password'} onChangeText={onChangeText} text={text}/>
               
                <>
                    <DateTimePickerModal
                        visible={visible}
                        onDismiss={onDismiss}
                        date={date}
                        onConfirm={onChange}
                        label="Pick A Date"
                    />
                    <TextInput value={date.toLocaleString()} />
                    <Button onPress={() => setVisible(true)}>Pick date</Button>
                </>
               
               <InputCustom hasErros={hasErrors} label={'Data de nascimento'} onChangeText={onChangeText} text={text}/>

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
        </SafeAreaView>
    );
}

export default Signin;
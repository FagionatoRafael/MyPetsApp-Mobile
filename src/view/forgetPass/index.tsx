import { Text, View } from 'react-native';
import styles from './styles';
import { Button, HelperText } from 'react-native-paper';
import React, { SetStateAction, useEffect, useState } from 'react';
import { useFonts, Dosis_400Regular } from '@expo-google-fonts/dosis';
import { useNavigation } from '@react-navigation/native';

import InputCustom from '../../components/Input';
import Container from '../../components/Container';
import { emailValidation } from '../../../util/validations';
import { apiMain } from '../../../services/connction';

const ForgetPass = () => {
    const navigation = useNavigation();

    let [fontsLoaded] = useFonts({
        Dosis_400Regular,
    });

    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [alreadyUser, setAlreadyUser] = useState(false);
    const [data, setData] = useState({});

    const onChangeEmail = (text: SetStateAction<string>) => setEmail(text);
 
    const hasErrors = () => {
        return emailValidation(email.trim())
    };

    const sendEmail = () => {
        apiMain.post('forgetPass', {
            email: email.trim()
        }).then((value) => {
            setData(value.data);
            console.log(value.data);
        }).catch((err) => {
            console.log(401)
        })
    }

    return (
        <Container>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Esqueci minha senha</Text>
            </View>
            <View style={styles.form}>
                <InputCustom label='Email' text={email} hasErros={emailErr} onChangeText={onChangeEmail} invalidText={'Email não cadastrado'}/>

                <HelperText  type="error" visible={alreadyUser}>
                    Email não cadastrado!
                </HelperText>
                
                <Button 
                    style={styles.button} 
                    mode="contained" 
                    onPress={() => {
                        setEmailErr(hasErrors())
                        if(!hasErrors()) {
                            if(data) {
                                setAlreadyUser(false)
                                sendEmail();
                                navigation.navigate('Confirmation')
                            } else {
                                setAlreadyUser(true)
                            }
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
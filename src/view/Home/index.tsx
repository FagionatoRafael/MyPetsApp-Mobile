import { SafeAreaView, Text, View, Image } from 'react-native';
import styles from './styles';
import { HelperText, TextInput, Button } from 'react-native-paper';
import { SetStateAction, useState } from 'react';
import { useFonts, Dosis_400Regular } from '@expo-google-fonts/dosis';
import { useNavigation } from '@react-navigation/native';

import InputCustom from '../../components/Input';
import Container from '../../components/Container';

const Home = () => {
    const navigation = useNavigation();

    let [fontsLoaded] = useFonts({
        Dosis_400Regular,
    });

    const [text, setText] = useState('');

    const onChangeText = (text: SetStateAction<string>) => setText(text);
 
    const hasErrors = () => {
        return !text.includes('@');
    };

    return (
        <Container>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>IPetsApp</Text>
            </View>
            <View style={styles.form}>
                <InputCustom label='Email' text={text} hasErros={hasErrors} onChangeText={onChangeText}/>
                <InputCustom label='Password' text={text} hasErros={hasErrors} onChangeText={onChangeText}/>

                <Button 
                    style={styles.button} 
                    mode="contained" 
                    onPress={() => navigation.navigate('NavegationOne')}
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
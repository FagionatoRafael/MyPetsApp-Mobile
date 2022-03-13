import { SafeAreaView, Text, View } from 'react-native';
import styles from './styles';
import { HelperText, TextInput, Button } from 'react-native-paper';
import { SetStateAction, useState } from 'react';

const Home = () => {

    const [text, setText] = useState('');

    const onChangeText = (text: SetStateAction<string>) => setText(text);
 
    const hasErrors = () => {
        return !text.includes('@');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <View>
                    <TextInput 
                        autoComplete={false}
                        style={styles.input}
                        mode='outlined' 
                        activeOutlineColor='#000'
                        label="Email" 
                        value={text} 
                        onChangeText={onChangeText} 
                    />
                    <HelperText type="error" visible={hasErrors()}>
                        Email address is invalid!
                    </HelperText>
                </View>

                <View>
                    <TextInput 
                        autoComplete={false}
                        style={styles.input}
                        mode='outlined' 
                        activeOutlineColor='#000'
                        label="Password" 
                        value={text} 
                        onChangeText={onChangeText} 
                    />
                    <HelperText type="error" visible={hasErrors()}>
                        Email address is invalid!
                    </HelperText>
                </View>

                <Button style={styles.button} mode="contained" onPress={() => console.log('Pressed')}>
                    Entrar
                </Button>

                <Button style={styles.buttonText} mode="text" onPress={() => console.log('Pressed')}>
                    cadastre-se/esqueci a senha
                </Button>

            </View>

        </SafeAreaView>
    );
}

export default Home;
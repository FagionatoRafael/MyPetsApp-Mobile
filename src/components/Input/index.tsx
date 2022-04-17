import { View } from 'react-native';
import styles from './styles';
import { HelperText, TextInput } from 'react-native-paper';
import IInputProp from '../../../interfaces/IInputProps.interface';

const InputCustom = ({hasTouch, label, text, onChangeText, hasErros}: IInputProp) => {
    return (
        <View onTouchStart={hasTouch}>
            <TextInput 
                autoComplete={false}
                style={styles.input}
                mode='outlined' 
                activeOutlineColor='#05386B'
                label={label} 
                value={text} 
                onChangeText={(value) => onChangeText(value)} 
            />
            <HelperText type="error" visible={hasErros()}>
                Email address is invalid!
            </HelperText>
        </View>
    );
}

export default InputCustom;
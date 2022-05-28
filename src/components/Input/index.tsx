import { View } from 'react-native';
import styles from './styles';
import { HelperText, TextInput } from 'react-native-paper';
import { IInputProp } from '../../../interfaces/_interface.interface';

const InputCustom = ({hasTouch, label, text, onChangeText, hasErros, invalidText}: IInputProp) => {
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
            <HelperText type="error" visible={hasErros}>
                {invalidText}
            </HelperText>
        </View>
    );
}

export default InputCustom;
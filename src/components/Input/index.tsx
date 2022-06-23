import { View } from 'react-native';
import styles from './styles';
import { HelperText, TextInput } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text'
import { IInputProp } from '../../../interfaces/_interface.interface';

const InputCustom: React.FC<IInputProp> = ({hasTouch, label, text, onChangeText, hasErros, invalidText, hasMask=false}) => {
    return (
        <View onTouchStart={hasTouch}>
            {hasMask ?
                <TextInput 
                    autoComplete={false}
                    style={styles.input}
                    mode='outlined' 
                    activeOutlineColor='#05386B'
                    value={text}
                    label={label} 
                    render={(props) =>
                        (<TextInputMask
                            style={{marginLeft: 10, marginTop: 10,fontSize: 20}}
                            onChangeText={(value) => onChangeText(value)}
                            type='custom'
                            options={{mask: '99.99'}}
                        />)
                    }
                /> :
                <TextInput 
                    autoComplete={false}
                    style={styles.input}
                    mode='outlined' 
                    activeOutlineColor='#05386B'
                    label={label} 
                    value={text} 
                    onChangeText={(value) => onChangeText(value)}
                /> 
            }
            {/* <TextInput 
                autoComplete={false}
                style={styles.input}
                mode='outlined' 
                activeOutlineColor='#05386B'
                label={label} 
                value={text} 
                onChangeText={(value) => onChangeText(value)}
            /> */}
            <HelperText type="error" visible={hasErros}>
                {invalidText}
            </HelperText>
        </View>
    );
}

export default InputCustom;
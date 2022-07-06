import { View } from 'react-native';
import styles from './styles';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text'
import { IInputProp } from '../../../interfaces/_interface.interface';

const InputCustom: React.FC<IInputProp> = (
    {hasTouch, 
    label, 
    text, 
    onChangeText, 
    hasErros, 
    invalidText, 
    hasMask=false, 
    editable=true, 
    smallInput=false, 
    multiline=false,
    keyboardType='default',
    secureTextEntry=false}) => {
    return (
        <View onTouchEnd={hasTouch} style={{zIndex: 9999}}>
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
                            value={text}
                            keyboardType='number-pad'
                            options={{mask: '99.99'}}
                        />)
                    }
                /> :
                <TextInput 
                    onPressIn={() => hasTouch}
                    onPressOut={() => hasTouch}
                    autoComplete={false}
                    style={[styles.input, {zIndex: 1, maxWidth: smallInput ? 160 : undefined}]}
                    mode='outlined' 
                    activeOutlineColor='#05386B'
                    secureTextEntry={secureTextEntry}
                    label={label} 
                    value={text} 
                    onChangeText={(value) => onChangeText(value)}
                    editable={editable}
                    keyboardType={keyboardType}
                    multiline={multiline}
                    numberOfLines={multiline ? 3 : 1}
                /> 
            }
            <HelperText type="error" visible={hasErros}>
                {invalidText}
            </HelperText>
        </View>
    );
}

export default InputCustom;
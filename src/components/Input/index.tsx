import { View } from 'react-native';
import styles from './styles';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text'
import { IInputProp } from '../../../interfaces/_interface.interface';

const InputCustom: React.FC<IInputProp> = ({hasTouch, label, text, onChangeText, hasErros, invalidText, hasMask=false, editable=true}) => {
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
                            options={{mask: '99.99'}}
                        />)
                    }
                /> :
                <TextInput 
                    onPressIn={() => hasTouch}
                    onPressOut={() => hasTouch}
                    autoComplete={false}
                    style={[styles.input, {zIndex: 1}]}
                    mode='outlined' 
                    activeOutlineColor='#05386B'
                    label={label} 
                    value={text} 
                    onChangeText={(value) => onChangeText(value)}
                    editable={editable}
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
import { View } from 'react-native';
import styles from './styles';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text'
import { IInputProp } from '../../../interfaces/_interface.interface';
import React from 'react';

const InputCustom: React.FC<IInputProp> = (
    {hasTouch, 
    label, 
    text, 
    onChangeText, 
    isSecure=()=>{},
    isPassword=false,
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
                            onChangeText={(value) => {
                                onChangeText(value)
                                if(value.length == 4) {
                                    let alterar = value.split('')
                                    value = `0${alterar[0]}${alterar[2]}${alterar[1]}${alterar[3]}` 
                                    onChangeText(value)
                                }
                            }}
                            type='custom'
                            value={text}
                            keyboardType='number-pad'
                            options={{
                                mask: '99.99'
                            }}
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
                    right={keyboardType !== 'numeric' ? 
                                isPassword ? 
                                    <TextInput.Icon icon="eye" onPress={() => isSecure()}/> 
                                    : null
                                : <TextInput.Affix text="KG"/>}
                    label={label} 
                    value={text} 
                    onChangeText={(value) => onChangeText(value)}
                    editable={editable}
                    keyboardType={keyboardType}
                    multiline={multiline}
                    numberOfLines={multiline ? 3 : 1}
                /> 
            }
            <HelperText  type="error" visible={hasErros}>
                {invalidText}
            </HelperText>
        </View>
    );
}

export default InputCustom;
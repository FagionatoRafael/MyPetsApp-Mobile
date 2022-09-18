import { View, Text, ScrollView } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Modal, Portal, Provider, Title, Button } from 'react-native-paper';
import styles from "./styles"
import { IModal } from '../../../interfaces/_interface.interface'; 
import React, { useState } from "react";

const ModalCustom: React.FC<IModal> = ({title, showModal, hideModal, setText, Itens, idIten, getId}) => {
    // const [text, setText] = useState('');
   
    const containerStyle = {backgroundColor: 'white', padding: 20};
    
    return (
        <Modal visible={showModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <ScrollView>
                <Title>{title}</Title>
                {Itens.map((value) => {
                    return (<Button 
                                key={value.id} 
                                style={idIten === value.id ? styles.buttonSelected : styles.button} 
                                mode="contained" 
                                onPress={() => {
                                    setText(value.name || '')
                                    getId(value.id)
                                    hideModal()
                                }}
                            >
                                {value.nameIcon ? <MaterialCommunityIcons name={value.nameIcon} size={24} color={idIten === value.id ? "#8EE4AF" : "#05386B"} /> : null}
                                <Title style={idIten === value.id ? styles.logoTextSelected : {}}>{value.name}</Title>
                            </Button>)
                })}
            </ScrollView>
        </Modal>
    )
}

export default ModalCustom;
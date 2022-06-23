import { View, Text } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Modal, Portal, Provider, Title, Button } from 'react-native-paper';
import styles from "./styles"
import { IModal } from '../../../interfaces/_interface.interface'; 
import { useState } from "react";

const ModalCustom: React.FC<IModal> = ({title, showModal, hideModal, setText}) => {
    // const [text, setText] = useState('');
   
    const containerStyle = {backgroundColor: 'white', padding: 20};
    
    return (
        <Modal visible={showModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <Title>{title}</Title>
            <Button style={styles.button} mode="contained" onPress={() => {setText('Cachorro')}}>
                <MaterialCommunityIcons name={'dog'} size={24} color="#05386B" />
                <Title>Cachorro</Title>
            </Button>
            <Button style={styles.button} mode="contained" onPress={() => setText('Gato')}>
                <MaterialCommunityIcons name={'cat'} size={24} color="#05386B" />
                <Title>Gato</Title>
            </Button>
        </Modal>
    )
}

export default ModalCustom;
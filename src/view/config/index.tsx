import { View, ScrollView, Text } from "react-native"
import CardPet from "../../components/CardPet";
import React, { useState } from "react";
import Container from "../../components/Container";
import { Divider,Switch } from "react-native-paper";
import styles from "./styles";

const Config = () => {
    const [isNoteOne, setIsNoteOne] = useState(false);
    const [isNoteTwo, setIsNoteTwo] = useState(false);
    const [isNoteThree, setIsNoteThree] = useState(false);

    const [isMailOne, setIsMailOne] = useState(false);
    const [isMailTwo, setIsMailTwo] = useState(false);
    const [isMailThree, setIsMailThree] = useState(false);

    const onToggleNoteOne = () => setIsNoteOne(!isNoteOne);
    const onToggleNoteTwo = () => setIsNoteTwo(!isNoteTwo);
    const onToggleNoteThree = () => setIsNoteThree(!isNoteThree);

    const onToggleMailOne = () => setIsMailOne(!isMailOne);
    const onToggleMailTwo = () => setIsMailTwo(!isMailTwo);
    const onToggleMailThree = () => setIsMailThree(!isMailThree);
    
    return (
        <Container margin={false}>
            <View style={styles.containerTitle}>
                <Text style={styles.title}>Configurações</Text>
            </View>

            <View style={styles.containerConfig}>
                <Text>Notificações</Text>
                <Divider style={{height: 5}}/>
                <View style={styles.containerToggle}>
                    <Text>Pets criados/alterados</Text>
                    <Switch value={isNoteOne} color={'#05386B'} onValueChange={onToggleNoteOne} />
                </View>
                <View style={styles.containerToggle}>
                    <Text>Atividade da agenda</Text>
                    <Switch value={isNoteTwo} color={'#05386B'} onValueChange={onToggleNoteTwo} />
                </View>
                <View style={styles.containerToggle}>
                    <Text>Vacinas criados/alteradas</Text>
                    <Switch value={isNoteThree} color={'#05386B'} onValueChange={onToggleNoteThree} />
                </View>
            </View>
            <View style={styles.containerConfig}>
                <Text>E-Mail</Text>
                <Divider style={{height: 5}}/>
                <View style={styles.containerToggle}>
                    <Text>Pets criados/alterados</Text>
                    <Switch value={isMailOne} color={'#05386B'} onValueChange={onToggleMailOne} />
                </View>
                <View style={styles.containerToggle}>
                    <Text>Atividade da agenda</Text>
                    <Switch value={isMailTwo} color={'#05386B'} onValueChange={onToggleMailTwo} />
                </View>
                <View style={styles.containerToggle}>
                    <Text>Vacinas criados/alteradas</Text>
                    <Switch value={isMailThree} color={'#05386B'} onValueChange={onToggleMailThree} />
                </View>
            </View>
        </Container>
    )
}

export default Config;
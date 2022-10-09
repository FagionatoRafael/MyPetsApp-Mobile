import { View, ScrollView, Text } from "react-native"
import CardPet from "../../components/CardPet";
import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import { Divider,Switch } from "react-native-paper";
import styles from "./styles";
import { apiMain } from "../../../services/connction";
import asyncStorage from "../../../util/asyncStorage";

const Config = () => {
    const [isNoteOne, setIsNoteOne] = useState<boolean>();
    const [isNoteTwo, setIsNoteTwo] = useState<boolean>();
    const [isNoteThree, setIsNoteThree] = useState<boolean>();

    const [isMailOne, setIsMailOne] = useState<boolean>();
    const [isMailTwo, setIsMailTwo] = useState<boolean>();
    const [isMailThree, setIsMailThree] = useState<boolean>();

    const onToggleNoteOne = () => setIsNoteOne(!isNoteOne);
    const onToggleNoteTwo = () => setIsNoteTwo(!isNoteTwo);
    const onToggleNoteThree = () => setIsNoteThree(!isNoteThree);

    const onToggleMailOne = () => setIsMailOne(!isMailOne);
    const onToggleMailTwo = () => setIsMailTwo(!isMailTwo);
    const onToggleMailThree = () => setIsMailThree(!isMailThree);

    useEffect(() => {
        const getToken = asyncStorage.get('token')
        getToken.then((value) => {
            apiMain.get('config', {
                headers: { Authorization: `Bearer ${value.access_token}` }
            }).then((v) => {
                setIsNoteOne(v.data.config_isNoteOne == 1 ? true : false);
                setIsNoteTwo(v.data.config_isNoteTwo == 1 ? true : false);
                setIsNoteThree(v.data.config_isNoteThree == 1 ? true : false);
                setIsMailOne(v.data.config_isMailOne == 1 ? true : false);
                setIsMailTwo(v.data.config_isMailTwo == 1 ? true : false);
                setIsMailThree(v.data.config_isMailThree == 1 ? true : false);
                console.log(v.status)
            }).catch((err) => {
                console.log(401);
            })
        
        })
    }, [])

    useEffect(() => {
        const getToken = asyncStorage.get('token')
        getToken.then((value) => {
            apiMain.patch('config', {
                isNoteOne: isNoteOne,
                isNoteTwo: isNoteTwo,
                isNoteThree: isNoteThree,
                isMailOne: isMailOne,
                isMailTwo: isMailTwo,
                isMailThree: isMailThree
            }, {
                headers: { Authorization: `Bearer ${value.access_token}` }
            }).then((v) => {
                console.log(v.status + "alooo")
            }).catch((err) => {
                console.log(401);
            })
        
        })
    }, [isNoteOne, isNoteTwo, isNoteThree, isMailOne, isMailTwo, isMailThree])
    
    return (
        <Container margin={false}>
            <View style={styles.containerTitle}>
                <Text style={styles.title}>Configurações</Text>
            </View>

            <View style={styles.containerConfig}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>Notificações</Text>
                <Divider style={{height: 5}}/>
                <View style={styles.containerToggle} onTouchEnd={onToggleNoteOne}>
                    <Text style={{color: '#fff'}}>Pets criados/alterados</Text>
                    <Switch value={isNoteOne} color={'#05386B'} onValueChange={onToggleNoteOne} />
                </View>
                <View style={styles.containerToggle} onTouchEnd={onToggleNoteTwo}>
                    <Text style={{color: '#fff'}}>Atividade da agenda</Text>
                    <Switch value={isNoteTwo} color={'#05386B'} onValueChange={onToggleNoteTwo} />
                </View>
                <View style={styles.containerToggle} onTouchEnd={onToggleNoteThree}>
                    <Text style={{color: '#fff'}}>Vacinas criados/alteradas</Text>
                    <Switch value={isNoteThree} color={'#05386B'} onValueChange={onToggleNoteThree} />
                </View>
            </View>
            {/* <View style={styles.containerConfig}>
                <Text style={{color: '#fff', fontWeight: 'bold' , fontSize: 18}}>E-Mail</Text>
                <Divider style={{height: 5}}/>
                <View style={styles.containerToggle} onTouchEnd={onToggleMailOne}>
                    <Text style={{color: '#fff'}}>Pets criados/alterados</Text>
                    <Switch value={isMailOne} color={'#05386B'} onValueChange={onToggleMailOne} />
                </View>
                <View style={styles.containerToggle} onTouchEnd={onToggleMailTwo}>
                    <Text style={{color: '#fff'}}>Atividade da agenda</Text>
                    <Switch value={isMailTwo} color={'#05386B'} onValueChange={onToggleMailTwo} />
                </View>
                <View style={styles.containerToggle} onTouchEnd={onToggleMailThree}>
                    <Text style={{color: '#fff'}}>Vacinas criados/alteradas</Text>
                    <Switch value={isMailThree} color={'#05386B'} onValueChange={onToggleMailThree} />
                </View>
            </View> */}
        </Container>
    )
}

export default Config;
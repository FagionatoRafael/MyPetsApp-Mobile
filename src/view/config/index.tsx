import { View, ScrollView, Text, Dimensions } from "react-native"
import CardPet from "../../components/CardPet";
import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import { ActivityIndicator, Divider,Switch } from "react-native-paper";
import styles from "./styles";
import { apiMain } from "../../../services/connction";
import asyncStorage from "../../../util/asyncStorage";

const Config = () => {
    const [isNoteOne, setIsNoteOne] = useState<boolean>();
    const [isNoteTwo, setIsNoteTwo] = useState<boolean>();
    const [isNoteThree, setIsNoteThree] = useState<boolean>();

    const [loading, setLoading] = useState<boolean>();

    // const [isMailOne, setIsMailOne] = useState<boolean>();
    // const [isMailTwo, setIsMailTwo] = useState<boolean>();
    // const [isMailThree, setIsMailThree] = useState<boolean>();

    const onToggleNoteOne = () => {
        setIsNoteOne(!isNoteOne)
        updateConfig();
    }
    const onToggleNoteTwo = () => {
        setIsNoteTwo(!isNoteTwo);
        updateConfig();
    }
    const onToggleNoteThree = () => setIsNoteThree(!isNoteThree);

    // const onToggleMailOne = () => setIsMailOne(!isMailOne);
    // const onToggleMailTwo = () => setIsMailTwo(!isMailTwo);
    // const onToggleMailThree = () => setIsMailThree(!isMailThree);

    const updateConfig = async () => {
        setLoading(true)
        const getToken = await asyncStorage.get('token')
        apiMain.patch('config', {
            isNoteOne: isNoteOne,
            isNoteTwo: isNoteTwo,
            // isNoteThree: isNoteThree,
            // isMailOne: isMailOne,
            // isMailTwo: isMailTwo,
            // isMailThree: isMailThree
        }, {
            headers: { Authorization: `Bearer ${getToken.access_token}` }
        }).then((v) => {
            console.log(v.status + "alooo")
            setLoading(false)
        }).catch((err) => {
            console.log(401);
        })
    }

    useEffect(() => {
        setLoading(true)
        const getToken = asyncStorage.get('token') 
        getToken.then((value) => {
            apiMain.get('config', {
                headers: { Authorization: `Bearer ${value.access_token}` }
            }).then((v) => {
                setIsNoteOne(v.data.config_isNoteOne == 1 ? true : false);
                setIsNoteTwo(v.data.config_isNoteTwo == 1 ? true : false);
                // setIsNoteThree(v.data.config_isNoteThree == 1 ? true : false);
                // setIsMailOne(v.data.config_isMailOne == 1 ? true : false);
                // setIsMailTwo(v.data.config_isMailTwo == 1 ? true : false);
                // setIsMailThree(v.data.config_isMailThree == 1 ? true : false);
                setLoading(false)
                console.log(v.data)
            }).catch((err) => {
                console.log(401);
            })
        
        })
    }, [])

    if(loading) {
        return <View style={
                    {display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center', 
                    alignContent: 'center', 
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                    alignItems: 'center',
                    alignSelf: 'center',
                    backgroundColor: '#5CDB95',
                    }}> 
                <ActivityIndicator animating={true} color="#fff"/>
            </View> 
    }
    
    return (
        <Container margin={false}>
            <View style={styles.containerTitle}>
                <Text style={styles.title}>Configurações</Text>
            </View>

            <View style={styles.containerConfig}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>Notificações</Text>
                <Divider style={{height: 5}}/>
                <View style={styles.containerToggle} onTouchEnd={onToggleNoteOne}>
                    <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 15}}>Celular</Text>
                    <Switch value={isNoteOne} color={'#05386B'} onValueChange={onToggleNoteOne} />
                </View>
                <View style={styles.containerToggle} onTouchEnd={onToggleNoteTwo}>
                    <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 15}}>E-mail</Text>
                    <Switch value={isNoteTwo} color={'#05386B'} onValueChange={onToggleNoteTwo} />
                </View>
                {/* <View style={styles.containerToggle} onTouchEnd={onToggleNoteThree}>
                    <Text style={{color: '#fff'}}>Vacinas criados/alteradas</Text>
                    <Switch value={isNoteThree} color={'#05386B'} onValueChange={onToggleNoteThree} />
                </View> */}
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
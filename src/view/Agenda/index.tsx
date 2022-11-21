import { View, ScrollView, Text, Dimensions} from "react-native"
import CardPet from "../../components/CardPet";
import React, { useEffect, useState } from "react";
import ContainerCards from "../../components/ContainerCards";
import CardAgenda from "../../components/CardAgenda";
import { useNavigation } from "@react-navigation/native";
import asyncStorage from "../../../util/asyncStorage";
import { apiCatsDogs, apiMain } from "../../../services/connction";
import { FontAwesome5 } from '@expo/vector-icons';
import { ActivityIndicator } from "react-native-paper";

interface IAgenda {
    id: number,
    DtToDO: string,
    TimeStart: string,
    TimeEnd: string,
    iDitems: string,
    iDPetId: number,
    name: string,
    iDSpeciesId: number,
    icon: string
}

const Agenda = () => {
    const navigation = useNavigation();

    const [agendas, setAgendas] = useState<IAgenda[]>([])
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);
    const [isConect, setIsConect] = useState(true);
     
    useEffect(() => {
        setAgendas([]);
    }, [])

    const hasConect = () => {
        apiCatsDogs.get('/').then(ev => {
            if(ev.data) {
                console.log(ev.status)
                setIsConect(false)
            }
        })
        apiMain.get('/').then(ev => {
            if(ev.data) {
                console.log(ev.status)
                setIsConect(false)
            }
        })
    }

    useEffect(() => {
        hasConect();
        
        const getToken = asyncStorage.get('token')
        getToken.then((value) => {
            setToken(value.access_token)
            if(value.access_token !== undefined || token !== undefined) {
                apiMain.get('agenda', {
                    headers: { Authorization: `Bearer ${value.access_token}` } 
                }).then((value) => {
                    if(value.data) {
                        value.data.forEach((v: any) => {
                            v.icon = v.iDSpeciesId === 1 ? 'dog' : 'cat';
                        })
                    }
                    setAgendas(value.data)
                    setLoading(false)
                }).catch((err) => {
                    console.log(401)
                })  
            } else {
                setLoading(true)
            }
        })
    }) 

    if(loading && isConect) {
        return (
            <View style={
                    {display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center', 
                    alignContent: 'center', 
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height * 0.8,
                    alignItems: 'center',
                    alignSelf: 'center'
                    
                    }}>
                <ActivityIndicator animating={true} color="#5CDB95"/>
            </View>
        )
    }

    return (
        <ContainerCards text="Agenda" funcNavi={() => navigation.navigate('AddAgenda')}>
            {agendas.length !== 0 ? agendas.map((value, index) => {
                return <CardAgenda 
                    key={index}
                    icon={value.icon} 
                    namePet={value.name} 
                    day={value.DtToDO} 
                    hoursOf={value.TimeStart} 
                    hoursTill={value.TimeEnd} 
                    itens={value.iDitems}
                    editFunc={() => navigation.navigate('AddAgenda', value)}
                />
            }) : 
            <View style={{display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignContent: 'center', 
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height * 0.8,
                alignItems: 'center',
                alignSelf: 'center'
            }}>
                <Text>Adicione sua primeira atividade no icone de mais</Text>
            </View>}
        </ContainerCards>
    )
}

export default Agenda;
import { View, ScrollView, Text} from "react-native"
import CardPet from "../../components/CardPet";
import React, { useEffect, useState } from "react";
import ContainerCards from "../../components/ContainerCards";
import CardAgenda from "../../components/CardAgenda";
import { useNavigation } from "@react-navigation/native";
import asyncStorage from "../../../util/asyncStorage";
import { apiMain } from "../../../services/connction";

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
     
    useEffect(() => {
        setAgendas([]);
    }, [])

    useEffect(() => {
        const getToken = asyncStorage.get('token')
        getToken.then((value) => {
            setToken(value.access_token)
            apiMain.get('agenda', {
                headers: { Authorization: `Bearer ${value.access_token}` } 
            }).then((value) => {
                if(value.data) {
                    value.data.forEach((v: any) => {
                        v.icon = v.iDSpeciesId === 1 ? 'dog' : 'cat';
                    })
                }
                setAgendas(value.data)
            }).catch((err) => {
                console.log(401)
            })  
        })
    }) 

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
            <View style={{display:'flex', justifyContent: 'center', alignSelf: 'center'}}>
                <Text>Adicione sua primeira atividade no icone de mais</Text>
            </View>}
        </ContainerCards>
    )
}

export default Agenda;
import { View, ScrollView, Text} from "react-native"
import CardPet from "../../components/CardPet";
import React, { useState } from "react";
import ContainerCards from "../../components/ContainerCards";
import CardAgenda from "../../components/CardAgenda";
import { useNavigation } from "@react-navigation/native";

const Agenda = () => {
    const navigation = useNavigation();

    const [agendas, setAgendas] = useState([{
        icon: 'dog',
        namePet: 'frank',
        day: "20/06/2022",
        hoursOf: "10:00",
        hoursTill: "12:00",
        itens: [1,2,3,4]
    },
    {
        icon: 'cat',
        namePet: 'Link',
        day: "22/06/2022",
        hoursOf: "10:00",
        hoursTill: "12:00",
        itens: [0,3, 4]
    }])
    
    return (
        <ContainerCards text="Agenda" funcNavi={() => navigation.navigate('AddAgenda')}>
            {agendas.map((value, index) => {
                return <CardAgenda 
                    key={index}
                    icon={value.icon} 
                    namePet={value.namePet} 
                    day={value.day} 
                    hoursOf={value.hoursOf} 
                    hoursTill={value.hoursTill} 
                    itens={value.itens}
                    editFunc={() => navigation.navigate('AddAgenda', value)}
                />
            })}
        </ContainerCards>
    )
}

export default Agenda;
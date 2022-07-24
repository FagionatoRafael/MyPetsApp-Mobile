import { View, ScrollView, Text} from "react-native"
import React, { useState } from "react";
import ContainerCards from "../../components/ContainerCards";
import { useNavigation } from "@react-navigation/native";
import CardVaccine from "../../components/CardVaccine";

const Vaccine = () => {
    const navigation = useNavigation();

    const [vaccines, setVaccines] = useState([{
        icon: 'dog',
        namePet: 'frank',
        day: "20/06/2022",
        vaccine: "Canine Distemper",
        description: "Vacina aplicada na clinica"
    },
    {
        icon: 'cat',
        namePet: 'Link',
        day: "22/06/2022",
        vaccine: "Feline Infectious Peritonitis",
        description: "Vacina Aplicada em casa"
    }])
    
    return (
        <ContainerCards text="Vacinas" funcNavi={() => navigation.navigate('AddAgenda')}>
            {vaccines.map((value, index) => {
                return <CardVaccine 
                    key={index}
                    icon={value.icon}
                    namePet={value.namePet}
                    day={value.day}
                    vaccine={value.vaccine} 
                    description={value.description}
                    editFunc={() => navigation.navigate('AddAgenda', value)}                 
                />
            })}
        </ContainerCards>
    )
}

export default Vaccine;
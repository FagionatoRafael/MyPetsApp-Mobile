import { View, ScrollView, Text} from "react-native"
import React, { useState } from "react";
import ContainerCards from "../../components/ContainerCards";
import { useNavigation } from "@react-navigation/native";
import CardHealth from "../../components/CardHealth";

const Health = () => {
    const navigation = useNavigation();

    const [health, setHealth] = useState([{
        icon: 'cat',
        name: 'link',
        media: '4',
        peso: 3.00,
        port: 'medio',
        description: 'Seu pet está um pouco acima do peso, tente caminhar ou bringa mais com ele  dar uma alimentação um puco mais saudavel.'
    },
    {
        icon: 'dog',
        name: 'Frank',
        media: '6',
        peso: 13.00,
        port: 'medio',
        description: 'Seu pet está um pouco acima do peso, tente caminhar ou bringa mais com ele  dar uma alimentação um puco mais saudavel.'
    }])

    return (
        <ContainerCards funcNavi={() => {} } text={"Saúde"} hasFAB={false}>
            {health.map((value, index) => {
                return <CardHealth 
                    key={index}
                    icon={value.icon} 
                    namePet={value.name} 
                    media={value.media}
                    peso={value.peso}
                    port={value.port}
                    description={value.description} 
                />
            })}
        </ContainerCards>
    )
}

export default Health;
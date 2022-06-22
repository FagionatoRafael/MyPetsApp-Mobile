import { View, ScrollView, Text} from "react-native"
import React from "react";
import ContainerCards from "../../components/ContainerCards";
import { useNavigation } from "@react-navigation/native";
import CardHealth from "../../components/CardHealth";

const Health = () => {
    const navigation = useNavigation();

    return (
        <ContainerCards funcNavi={() => { navigation.navigate('AddPets'); } } text={"Saúde"} hasFAB={false}>
            <CardHealth 
                icon={'cat'} 
                namePet={'Link'} 
                media={'4'}
                peso={'3'}
                port={'médio'}
                description={'Seu pet está um pouco acima do peso, tente caminhar ou bringa mais com ele  dar uma alimentação um puco mais saudavel.'} 
            />

            <CardHealth 
                icon={'dog'} 
                namePet={'Frank'} 
                media={'6'}
                peso={'13'}
                port={'médio'}
                description={'Seu pet está um pouco acima do peso, tente caminhar ou bringa mais com ele  dar uma alimentação um puco mais saudavel.'} 
            />
        </ContainerCards>
    )
}

export default Health;
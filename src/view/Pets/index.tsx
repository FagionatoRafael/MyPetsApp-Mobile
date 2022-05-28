import { View, ScrollView, Text } from "react-native"
import styles from "./styles"
import CardPet from "../../components/CardPet";
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import React from "react";
import ContainerCards from "../../components/ContainerCards";

const Pets = () => {
    const navigation = useNavigation();

    return (
        <ContainerCards funcNavi={() => { navigation.navigate('AddPets'); } } text={"Pets"}>
            <CardPet 
                icon={'dog'} 
                namePet={'frank'} 
                birthDay={'14/01/2014'} 
                description={'É um cachorro muito ciumento e atrapalhado. Gosta muito de comer tudo.'} 
            />

            <CardPet 
                icon={'cat'} 
                namePet={'link'} 
                birthDay={'14/01/2014'} 
                description={'É um cachorro muito ciumento e atrapalhado. Gosta muito de comer tudo.'} 
            />

            <CardPet 
                icon={'dog'} 
                namePet={'Aron'} 
                birthDay={'14/01/2014'} 
                description={'É um cachorro muito ciumento e atrapalhado. Gosta muito de comer tudo.'} 
            />

            <CardPet 
                icon={'cat'} 
                namePet={'Miguel'} 
                birthDay={'14/01/2014'} 
                description={'É um cachorro muito ciumento e atrapalhado. Gosta muito de comer tudo.'} 
            />

            <CardPet 
                icon={'cat'} 
                namePet={'margô'} 
                birthDay={'14/01/2014'} 
                description={'É um cachorro muito ciumento e atrapalhado. Gosta muito de comer tudo.'} 
            />
        </ContainerCards>
    )
}

export default Pets;
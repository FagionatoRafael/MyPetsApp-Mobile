import { View, ScrollView, Text } from "react-native"
import styles from "./styles"
import CardPet from "../../components/CardPet";
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import ContainerCards from "../../components/ContainerCards";

const Pets = () => {
    const navigation = useNavigation();

    const [pets, setPets] = useState([{
        icon: 'dog',
        pet: 'Cachorro',
        petId: 0,
        namePet: 'frank',
        birthday: '14/01/2014',
        description: 'É um cachorro muito ciumento e atrapalhado. Gosta muito de comer tudo.',
        breed: 'Pug',
        breedId: 0,
        weight: '10.00'
    },
    {
        icon: 'cat',
        pet: 'Gato',
        petId: 1,
        namePet: 'Link',
        birthday: '14/05/2017',
        description: 'É um gato. Gosta muito de comer tudo.',
        breed: 'Viralata',
        breedId: 0,
        weight: '10.00'
    }])

    return (
        <ContainerCards funcNavi={() => { navigation.navigate('AddPets'); } } text={"Pets"}>
            {pets.map((value, index) => {
                return <CardPet
                    key={index} 
                    icon={value.icon} 
                    namePet={value.namePet} 
                    birthDay={value.birthday} 
                    description={value.description} 
                    funcUpdate={() => navigation.navigate('AddPets', value)}
                />
            })}
            
        </ContainerCards>
    )
}

export default Pets;
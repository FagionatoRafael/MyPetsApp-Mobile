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
                funcUpdate={() => navigation.navigate('AddPets', {
                    pet: 'Cachorro',
                    petId: 0,
                    namePet: 'frank',
                    birthday: '14/01/2014',
                    description: 'É um cachorro muito ciumento e atrapalhado. Gosta muito de comer tudo.',
                    breed: 'Pug',
                    breedId: 0,
                    weight: '10.00'
                })}
            />

            <CardPet 
                icon={'cat'} 
                namePet={'link'} 
                birthDay={'14/01/2014'} 
                description={'É um cachorro muito ciumento e atrapalhado. Gosta muito de comer tudo.'} 
                funcUpdate={() => navigation.navigate('AddPets', {
                    pet: 'Gato',
                    petId: 1,
                    namePet: 'Link',
                    birthday: '14/05/2017',
                    description: 'É um gato. Gosta muito de comer tudo.',
                    breed: 'Viralata',
                    breedId: 0,
                    weight: '10.00'
                })}
            />

            <CardPet 
                icon={'dog'} 
                namePet={'Aron'} 
                birthDay={'14/01/2014'} 
                description={'É um cachorro muito ciumento e atrapalhado. Gosta muito de comer tudo.'} 
                funcUpdate={() => navigation.navigate('AddPets', {
                    pet: 'dog',
                    petId: 0,
                    namePet: 'frank',
                    birthday: '14/01/2014',
                    description: 'É um cachorro muito ciumento e atrapalhado. Gosta muito de comer tudo.',
                    breed: 'Pug',
                    breedId: 0,
                    weight: '10.00'
                })}
            />

            <CardPet 
                icon={'cat'} 
                namePet={'Miguel'} 
                birthDay={'14/01/2014'} 
                description={'É um cachorro muito ciumento e atrapalhado. Gosta muito de comer tudo.'} 
                funcUpdate={() => navigation.navigate('AddPets', {
                    pet: 'dog',
                    petId: 0,
                    namePet: 'frank',
                    birthday: '14/01/2014',
                    description: 'É um cachorro muito ciumento e atrapalhado. Gosta muito de comer tudo.',
                    breed: 'Pug',
                    breedId: 0,
                    weight: '10.00'
                })}
            />

            <CardPet 
                icon={'cat'} 
                namePet={'margô'} 
                birthDay={'14/01/2014'} 
                description={'É um cachorro muito ciumento e atrapalhado. Gosta muito de comer tudo.'}
                funcUpdate={() => navigation.navigate('AddPets', {
                    pet: 'cat',
                    petId: 1,
                    namePet: 'Link',
                    birthday: '14/05/2017',
                    description: 'É um gato. Gosta muito de comer tudo.',
                    breed: 'Viralata',
                    breedId: 0,
                    weight: '10.00'
                })} 
            />
        </ContainerCards>
    )
}

export default Pets;
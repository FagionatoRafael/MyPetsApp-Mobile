import { View, ScrollView, Text } from "react-native"
import styles from "./styles"
import CardPet from "../../components/CardPet";
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import ContainerCards from "../../components/ContainerCards";
import { apiCatsDogs, apiMain } from "../../../services/connction";
import asyncStorage from '../../../util/asyncStorage';


interface IPet {
    nameSpecies: string,
    id: number,
    iDSpeciesId: number,
    name: string,
    dtBirthDay: string,
    Description: string,
    nameBreed: string,
    iDBreed: number,
    weight: string,
    media: number,
    icon: 'dog' | 'cat',
    iDUserId: string
}

const Pets = () => {
    const navigation = useNavigation();

    const [pets, setPets] = useState<IPet[]>()

    useEffect(() => {
        const getToken = asyncStorage.get('token')
        getToken.then((value) => {
            apiMain.get('/pet', {
                headers: { Authorization: `Bearer ${value.access_token}` }
            }).then((value) => {  
                if(value.data.length !== 0) {
                    value.data.forEach((v: any) => {
                        v.icon = v.iDSpeciesId === 1 ? 'dog' : 'cat'  
                    })
                    
                    setPets(value.data)
                }
            }).catch((err) => {
                console.log(401)
            })
        })
    }, [pets])

    return (
        <ContainerCards funcNavi={() => { navigation.navigate('AddPets'); } } text={"Pets"}>
            {pets?.length !== 0 ? pets?.map((value, index) => {
                return <CardPet
                    key={index} 
                    icon={value.icon} 
                    namePet={value.name} 
                    birthDay={value.dtBirthDay} 
                    description={value.Description} 
                    funcUpdate={() => {
                        navigation.navigate('AddPets', value)
                    }}
                />
            }) : <View>
                    <Text>Adicione seu primeiro Pet no icone de mais</Text>
                </View>}
            
        </ContainerCards>
    )
}

export default Pets;
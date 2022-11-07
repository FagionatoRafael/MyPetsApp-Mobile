import { View, ScrollView, Text, Dimensions } from "react-native"
import styles from "./styles"
import CardPet from "../../components/CardPet";
import { ActivityIndicator, Colors, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import ContainerCards from "../../components/ContainerCards";
import { apiCatsDogs, apiMain } from "../../../services/connction";
import asyncStorage from '../../../util/asyncStorage';
import { FontAwesome5 } from '@expo/vector-icons';


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

    const [pets, setPets] = useState<IPet[]>([])

    const [token, setToken] = useState(undefined)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setPets([])
    }, [])

    useEffect(() => {
        const getToken = asyncStorage.get('token')
        getToken.then((value) => {
            setToken(value.access_token)
            if(value.access_token !== undefined || token !== undefined) {
                apiMain.get('pet', {
                    headers: { Authorization: `Bearer ${value.access_token}` }
                }).then((value) => { 
                    if(value.data) {
                        value.data.forEach((v: any) => {
                            v.icon = v.iDSpeciesId === 1 ? 'dog' : 'cat'  
                        })                    
                    }
                    setPets(value.data)
                    setLoading(false)
                }).catch((err) => {
                    console.log(401)
                })
            } else {
                setLoading(true)
            }
        })
    })

    if(loading) {
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
        <ContainerCards funcNavi={() => { navigation.navigate('AddPets'); } } text={"Pets"}>
            {pets?.length !== 0 ? pets?.map((value, index) => {
                return <CardPet
                    key={index} 
                    icon={value.icon} 
                    namePet={value.name} 
                    birthDay={value.dtBirthDay} 
                    description={value.Description} 
                    breed={value.nameBreed}
                    funcUpdate={() => {
                        navigation.navigate('AddPets', value)
                    }}
                />
            }) : <View style={{display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center', 
                    alignContent: 'center', 
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height * 0.8,
                    alignItems: 'center',
                    alignSelf: 'center'
                }}>
                    <Text>Adicione seu primeiro Pet no icone de mais</Text>
                </View>}
            
        </ContainerCards>
    )
}

export default Pets;
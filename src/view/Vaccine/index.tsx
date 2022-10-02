import { View, ScrollView, Text} from "react-native"
import React, { useEffect, useState } from "react";
import ContainerCards from "../../components/ContainerCards";
import { useNavigation } from "@react-navigation/native";
import CardVaccine from "../../components/CardVaccine";
import asyncStorage from "../../../util/asyncStorage";
import { apiMain } from "../../../services/connction";

interface IVaccines {
    icon: string
    id: number,
	DtVac: string,
    vaccine: string,
    iDPetId: number,
    idVaccine: number,
    description: string,
    name: string,
    iDSpeciesId: number
}

const Vaccine = () => {
    const navigation = useNavigation();

    const [vaccines, setVaccines] = useState<IVaccines[]>([])

    useEffect(() => {
        const getToken = asyncStorage.get('token')
        getToken.then((value) => {
            apiMain.get('vaccines', {
                headers: { Authorization: `Bearer ${value.access_token}` }
            }).then((value) => {
                value.data.forEach((v: any) => {
                    v.icon = v.iDSpeciesId === 1 ? 'dog' : 'cat'  
                })
                setVaccines(value.data)
            }).catch((err) => { 
                console.log(401)
            })
        })
    })
    
    return (
        <ContainerCards text="Vacinas" funcNavi={() => navigation.navigate('AddVaccine')}>
            {vaccines.length !== 0 ? vaccines.map((value, index) => {
                return <CardVaccine 
                    key={index}
                    icon={value.icon}
                    namePet={value.name}
                    day={value.DtVac}
                    vaccine={value.vaccine} 
                    description={value.description}
                    editFunc={() => navigation.navigate('AddVaccine', value)}                 
                />
            }): 
            <View style={{display:'flex', justifyContent: 'center', alignSelf: 'center'}}>
                <Text>Adicione as vacinas que seu pet tomou no mais</Text>
            </View>}
        </ContainerCards>
    )
}

export default Vaccine;
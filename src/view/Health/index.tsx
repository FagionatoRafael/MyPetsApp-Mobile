import { View, ScrollView, Text} from "react-native"
import React, { useEffect, useState } from "react";
import ContainerCards from "../../components/ContainerCards";
import { useNavigation } from "@react-navigation/native";
import CardHealth from "../../components/CardHealth";
import asyncStorage from "../../../util/asyncStorage";
import { apiCatsDogs, apiMain } from "../../../services/connction";

const Health = () => {
    const navigation = useNavigation();

    const [health, setHealth] = useState([{
        id: 1,
        icon: 'cat',
        iDSpeciesId: 1,
        iDBreed: 4,
        name: 'link',
        media: 4,
        weight: 3.00,
        description: 'Seu pet está um pouco acima do peso, tente caminhar ou bringa mais com ele  dar uma alimentação um puco mais saudavel.'
    },
    {
        id: 2,
        icon: 'dog',
        iDSpeciesId: 2,
        iDBreed: 3,
        name: 'Frank',
        media: 6,
        weight: 13.00,
        description: 'Seu pet está um pouco acima do peso, tente caminhar ou bringa mais com ele  dar uma alimentação um puco mais saudavel.'
    }])

    const makeDescriptionWeight = (pesoPet: number, pesoMedia: number) => {
        if(pesoPet < pesoMedia) {
            return 'O peso do seu pet esta a baixo do peso ideal da raça.'
        } else if(pesoPet == pesoMedia) {
            return 'O peso do seu pet esta dentro da media ideal da raça.'
        } else {
            return 'O peso do seu pet esta a cima da media ideal da raça.'
        }
    }

    useEffect(() => {
        const getToken = asyncStorage.get('token')
        getToken.then((value) => {
            apiMain.get('pet', {
                headers: { Authorization: `Bearer ${value.access_token}` }
            }).then((value) => {
                value.data.forEach((v: any) => {
                    delete v.dtBirthDay;
                    delete v.iDSpeciesId;
                    delete v.iDUserId;
                    delete v.nameBreed;
                    delete v.nameSpecies;
                    delete v.Description;
                    v.icon = v.iDSpeciesId === 1 ? 'dog' : 'cat';
                    v.description = makeDescriptionWeight(v.weight, v.media)
                })
                setHealth(value.data)
                console.log(value.data)
            }).catch((err) => {
                console.log(401)
            })
        })  
    }, [])

    return (
        <ContainerCards funcNavi={() => {} } text={"Saúde"} hasFAB={false}>
            {health.length !== 0 ? health.map((value, index) => {
                return <CardHealth 
                        key={index}
                        icon={value.icon}
                        namePet={value.name}
                        media={value.media}
                        peso={value.weight}
                        description={value.description}                
                    />
            }) : 
            <View style={{display:'flex', justifyContent: 'center', alignSelf: 'center'}}>
                <Text>Adicione seu primeiro pet na aba de pets</Text>
            </View>}
        </ContainerCards>
    )
}

export default Health;
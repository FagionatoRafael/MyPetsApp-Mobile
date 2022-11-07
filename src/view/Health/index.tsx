import { View, ScrollView, Text, Dimensions} from "react-native"
import React, { useEffect, useState } from "react";
import ContainerCards from "../../components/ContainerCards";
import { useNavigation } from "@react-navigation/native";
import CardHealth from "../../components/CardHealth";
import asyncStorage from "../../../util/asyncStorage";
import { apiCatsDogs, apiMain } from "../../../services/connction";
import { FontAwesome5 } from '@expo/vector-icons';
import { ActivityIndicator } from "react-native-paper";

interface IHealth {
    id: number,
    icon: string,
    iDSpeciesId: number,
    iDBreed: number,
    name: string,
    media: number,
    weight: number,
    description: string
}

const Health = () => {
    const navigation = useNavigation();

    const [health, setHealth] = useState<IHealth[]>([])
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);

    const makeDescriptionWeight = (pesoPet: number, pesoMedia: number) => {
        if((pesoPet + (pesoPet * 0.8)) < pesoMedia) {
            return 'O peso do seu pet esta a baixo do peso ideal da raça.'
        } else if(pesoPet == pesoMedia || ((pesoPet - (pesoPet * 0.8)) <= pesoMedia)) {
            return 'O peso do seu pet esta dentro da media ideal da raça.'
        } else {
            return 'O peso do seu pet esta a cima da media ideal da raça.'
        }
    }

    useEffect(() => {
        setHealth([])
    }, [])

    useEffect(() => {
        const getToken = asyncStorage.get('token')
        getToken.then((value) => {
            setToken(value.access_token)
            if(value.access_token !== undefined || token !== undefined) {
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
            <View style={{display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center', 
                    alignContent: 'center', 
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height * 0.8,
                    alignItems: 'center',
                    alignSelf: 'center'
                }}>
                <Text>Adicione seu primeiro pet na aba de pets</Text>
            </View>}
        </ContainerCards>
    )
}

export default Health;
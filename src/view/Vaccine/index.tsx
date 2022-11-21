import { View, ScrollView, Text, Dimensions} from "react-native"
import React, { useEffect, useState } from "react";
import ContainerCards from "../../components/ContainerCards";
import { useNavigation } from "@react-navigation/native";
import CardVaccine from "../../components/CardVaccine";
import asyncStorage from "../../../util/asyncStorage";
import { apiCatsDogs, apiMain } from "../../../services/connction";
import { FontAwesome5 } from '@expo/vector-icons';
import { ActivityIndicator } from "react-native-paper";

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
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);
    const [isConect, setIsConect] = useState(true);

    useState(() => {
        setVaccines([])
    })

    const hasConect = () => {
        apiCatsDogs.get('/').then(ev => {
            if(ev.data) {
                console.log(ev.status)
                setIsConect(false)
            }
        })
        apiMain.get('/').then(ev => {
            if(ev.data) {
                console.log(ev.status)
                setIsConect(false)
            }
        })
    }

    useEffect(() => {
        hasConect();
        
        const getToken = asyncStorage.get('token')
        getToken.then((value) => {
            setToken(value.access_token)
            if(value.access_token !== undefined || token !== undefined) {
                apiMain.get('vaccines', {
                    headers: { Authorization: `Bearer ${value.access_token}` }
                }).then((value) => {
                    value.data.forEach((v: any) => {
                        v.icon = v.iDSpeciesId === 1 ? 'dog' : 'cat'  
                    })
                    setVaccines(value.data)
                    setLoading(false)
                }).catch((err) => { 
                    console.log(401)
                })
            } else {
                setLoading(true)
            }
        })
    })

    if(loading && isConect) {
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
            <View style={{display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center', 
                    alignContent: 'center', 
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height * 0.8,
                    alignItems: 'center',
                    alignSelf: 'center'
                }}>
                <Text>Adicione as vacinas que seu pet tomou no mais</Text>
            </View>}
        </ContainerCards>
    )
}

export default Vaccine;
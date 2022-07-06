import { View, ScrollView, Text} from "react-native"
import CardPet from "../../components/CardPet";
import React from "react";
import ContainerCards from "../../components/ContainerCards";
import CardAgenda from "../../components/CardAgenda";
import { useNavigation } from "@react-navigation/native";

const Agenda = () => {
    const navigation = useNavigation();
    
    return (
        <ContainerCards text="Agenda" funcNavi={() => navigation.navigate('AddAgenda')}>
            <CardAgenda 
                icon={'dog'} 
                namePet={"Frank"} 
                day={"20/06/2022"} 
                hoursOf={"10:00"} 
                hoursTill={"12:00"} 
                itens={[1,2,3,4]}
                editFunc={() => alert('primeiro card')}
            />
            <CardAgenda 
                icon={'cat'} 
                namePet={"Link"} 
                day={"22/06/2022"} 
                hoursOf={"09:00"} 
                hoursTill={"10:00"} 
                itens={[0,3, 4]}
                editFunc={() => alert('segundo card')}
            />
        </ContainerCards>
    )
}

export default Agenda;
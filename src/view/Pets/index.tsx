import { View, ScrollView } from "react-native"
import styles from "./styles"
import CardPet from "../../components/CardPet";
import React from "react";

const Pets = () => {
    return (
        <ScrollView>
            <View style={styles.card}>
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
            </View>
        </ScrollView>
    )
}

export default Pets;
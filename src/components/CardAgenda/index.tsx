import { View, Text, Image } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import styles from "./styles"
import { AntDesign } from '@expo/vector-icons';
import { ICardAgenda } from '../../../interfaces/_interface.interface'
import React from "react";

// import SVGBowl from '../../../../assets/dog-dish-icon.svg';
// import SVGCollar from '../../../../assets/dog-collar-icon.svg';
// import SVGShower from '../../../../assets/shower-icon.svg';
// import SVGMedication from '../../../../assets/medication_icon.svg';
// import SVGBall from '../../../../assets/ball-icon.svg';

const CardAgenda: React.FC<ICardAgenda> = ({icon, namePet, day, hoursOf, hoursTill, itens, editFunc}) => {
    return (
        <Card style={styles.card} key={namePet}>
            <View style={styles.cardContainer}>
                <Card.Content style={styles.nameIcon}>
                    <MaterialCommunityIcons name={icon} size={24} color="#05386B" />
                    <Title numberOfLines={1} style={{width: 100}}>{namePet}</Title>
                </Card.Content>
                <Card.Content style={styles.nameIcon}>
                    <Ionicons name="calendar-sharp" size={24} color="#05386B" />
                    <View style={styles.daysAndHours}>
                        <Title>{day}</Title>
                        <Text>Das:{hoursOf} Até:{hoursTill}</Text>
                    </View>
                </Card.Content>
            </View>
            <Card.Content style={styles.description}>
                <AntDesign name="menu-fold" size={24} color="#05386B" />
                <View style={styles.itensTodo}>
                    {JSON.parse(itens).map((value: any) => {
                        if(value === 0) {
                            return <Image key={value} source={require('../../../assets/dog-dish-icon.png')} style={{width: 30, height: 30}}/>
                        }
                        if(value === 1) {
                            return <Image key={value} source={require('../../../assets/dog-collar-icon.png')} style={{width: 30, height: 30}}/>
                        }
                        if(value === 2) {
                            return <Image key={value} source={require('../../../assets/shower-icon.png')} style={{width: 30, height: 30}}/>
                        }
                        if(value === 3) {
                            return <Image key={value} source={require('../../../assets/medication_icon.png')} style={{width: 30, height: 30}}/>
                        }
                        if(value === 4) {
                            return <FontAwesome5 key={value} name="volleyball-ball" size={30} color="#05386B" />
                        }
                    })}
                </View>
            </Card.Content>
            <Card.Actions style={styles.buttonCard} onTouchEnd={editFunc}>
                <Button color="#EDF5E1">Editar</Button>
            </Card.Actions>
        </Card>
    )
}

export default CardAgenda;
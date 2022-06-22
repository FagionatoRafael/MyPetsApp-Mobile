import { View, Text } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import styles from "./styles"
import { ICardHealth, ICardPet } from '../../../interfaces/_interface.interface';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 

const CardHealth: React.FC<ICardHealth> = ({icon, namePet, media, peso, port, description}) => {
    return (
        <Card style={{marginBottom: 10}}>
            <View style={styles.cardContainer}>
                <Card.Content style={styles.nameIcon}>
                    <MaterialCommunityIcons name={icon} size={24} color="#05386B" />
                    <Title>{namePet}</Title>
                </Card.Content>
                <Card.Content style={styles.nameIcon}>
                    <FontAwesome name="asterisk" size={24} color="#05386B" />
                    <View style={styles.pesoAndPort}>
                        <Text>Peso: {peso} Kg</Text>
                        <Text>Porte: {port}</Text>
                    </View>
                </Card.Content>
            </View>
            <Card.Content style={styles.description}>
                <Entypo name="line-graph" size={24} color="#05386B" />  
                <Paragraph>peso médio/porte: {media} kg </Paragraph>
            </Card.Content>
            <Card.Content style={styles.description}>
                <AntDesign name="staro" size={24} color="#05386B" />
                <Paragraph>{description}</Paragraph>
            </Card.Content>
        </Card>
    )
}

export default CardHealth;
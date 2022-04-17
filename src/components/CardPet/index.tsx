import { View, Text } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import styles from "./styles"
import { IconProps } from "react-native-paper/lib/typescript/components/MaterialCommunityIcon";

interface ICardPet {
    icon: any
    namePet: string
    birthDay: string
    description: string
}

const CardPet: React.FC<ICardPet> = ({icon, namePet, birthDay, description}) => {
    return (
        <Card style={{marginBottom: 10}}>
            <View style={styles.cardContainer}>
                <Card.Content style={styles.nameIcon}>
                    <MaterialCommunityIcons name={icon} size={24} color="#05386B" />
                    <Title>{namePet}</Title>
                </Card.Content>
                <Card.Content style={styles.nameIcon}>
                    <FontAwesome5 name="gift" size={24} color="#05386B" />
                    <Title>{birthDay}</Title>
                </Card.Content>
            </View>
            <Card.Content style={styles.description}>
                <Ionicons name="document-text" size={24} color="#05386B" />
                <Paragraph>{description}</Paragraph>
            </Card.Content>
            <Card.Actions style={styles.buttonCard}>
                <Button color="#EDF5E1">Editar</Button>
            </Card.Actions>
        </Card>
    )
}

export default CardPet;
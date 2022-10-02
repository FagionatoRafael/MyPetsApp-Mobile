import { View, Text, Dimensions } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import styles from "./styles"
import { ICardPet } from '../../../interfaces/_interface.interface';

const CardPet: React.FC<ICardPet> = ({icon, namePet, birthDay, description, funcUpdate}) => {
    const windowWidth = Dimensions.get('window').width;
    
    return (
        <Card style={styles.card}>
            <View style={styles.cardContainer}>
                <Card.Content style={styles.nameIcon}>
                    <MaterialCommunityIcons name={icon} size={24} color="#05386B" />
                    <Title numberOfLines={1} style={{width: 100}}>{namePet}</Title>
                </Card.Content>
                <Card.Content style={styles.nameIcon}>
                    <FontAwesome5 name="gift" size={24} color="#05386B" />
                    <Title>{birthDay}</Title>
                </Card.Content>
            </View>
            <Card.Content style={styles.description}>
                <Ionicons name="document-text" size={24} color="#05386B" />
                <Paragraph style={{width: windowWidth * 0.8}}>{description}</Paragraph>
            </Card.Content>
            <Card.Actions style={styles.buttonCard} onTouchEnd={funcUpdate}>
                <Button color="#EDF5E1">Editar</Button>
            </Card.Actions>
        </Card>
    )
}

export default CardPet;
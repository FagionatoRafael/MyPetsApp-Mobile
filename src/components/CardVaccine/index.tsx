import { View, Text, Image, Dimensions } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import styles from "./styles"
import { AntDesign } from '@expo/vector-icons';
import { ICardVaccine } from '../../../interfaces/_interface.interface'

const CardVaccine: React.FC<ICardVaccine> = ({icon, namePet, day, vaccine, description, editFunc}) => {
    const windowWidth = Dimensions.get('window').width;
    
    return (
        <Card style={{marginBottom: 10}} key={namePet}>
            <View style={styles.cardContainer}>
                <Card.Content style={styles.nameIcon}>
                    <MaterialCommunityIcons name={icon} size={24} color="#05386B" />
                    <Title>{namePet}</Title>
                </Card.Content>
                <Card.Content style={styles.nameIcon}>
                    <Ionicons name="calendar-sharp" size={24} color="#05386B" />
                    <View style={styles.daysAndHours}>
                        <Title>{day}</Title>
                    </View>
                </Card.Content>
            </View>
            <Card.Content style={styles.description}>
                <FontAwesome5 name="syringe" size={24} color="#05386B" />
                <Paragraph style={{width: windowWidth - 100}}>{vaccine}</Paragraph>
            </Card.Content>
            <Card.Content style={styles.description}>
                <Ionicons name="document-text" size={24} color="#05386B" />
                <Paragraph style={{width: windowWidth - 100}}>{description}</Paragraph>
            </Card.Content>
            <Card.Actions style={styles.buttonCard} onTouchEnd={editFunc}>
                <Button color="#EDF5E1">Editar</Button>
            </Card.Actions>
        </Card>
    )
}

export default CardVaccine;
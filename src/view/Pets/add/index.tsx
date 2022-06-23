import { Text, View, TextInput } from 'react-native';
import styles from './styles';
import { Modal, Portal, Provider, Title, Button } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text'
import React, { SetStateAction, useState } from 'react';
import { useFonts, Dosis_400Regular } from '@expo-google-fonts/dosis';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment'

import InputCustom from '../../../components/Input';
import Container from '../../../components/Container';
import ModalCustom from '../../../components/Modal';
import { dateValidation, nameValidation } from '../../../../util/validations';

const AddPet = () => {
    const navigation = useNavigation();

    let [fontsLoaded] = useFonts({
        Dosis_400Regular,
    });
    const date = new Date();

    const [name, setName] = useState('');
    const [dateText, setDateText] = useState('')
    const [birthday, setBirthday] = useState<DateTimePickerEvent>();
    const [pet, setPet] = useState('');
    const [breed, setBreed] = useState('');
    const [weight, setWeight] = useState('');
    const [description, setDescription] = useState('');

    const [nameErr, setNameErr] = useState(false);
    const [birthdayErr, setBirthdayErr] = useState(false);
    const [petErr, setPetErr] = useState(false);
    const [breedErr, setBreedErr] = useState(false);
    const [weightErr, setWeightErr] = useState(false);
    const [descriptionErr, setDescriptionErr] = useState(false);

    const onChangeName = (text: SetStateAction<string>) => setName(text);
    const onChangePet = (text: SetStateAction<string>) => setPet(text);
    const onChangeBreed = (text: SetStateAction<string>) => setBreed(text);
    const onChangeWeight = (text: SetStateAction<string>) => setWeight(text);
    const onChangeDescription = (text: SetStateAction<string>) => setDescription(text);
    const onChangeBirthday = (value: DateTimePickerEvent) => {
        if(value.nativeEvent.timestamp) {
            let novo = moment(new Date(value.nativeEvent.timestamp || 1 * 1000)).format('DD/MM/YYYY');
            setBirthday(value)
            setDateText(novo)
            setVisible(false)
        }
    }
 
    const hasErrorsName = () => {
        return nameValidation(name)
    };
    const hasErrorsBirthday = () => {
        return dateValidation(dateText)
    };
    const hasErrorsPet = () => {
        return nameValidation(pet)
    };
    const hasErrorsBreed = () => {
        return nameValidation(breed)
    };
    const hasErrorsWeight = () => {
        return !name.includes('@');
    };
    const hasErrorsDescription = () => {
        return !name.includes('@');
    };

    const [text, setText] = useState('')

    const [visibleModal, setVisibleModal] = useState(false);
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisibleModal(true);
    const hideModal = () => setVisibleModal(false);
    // const containerStyle = {backgroundColor: 'white', padding: 20};

    return (
        <>
            <Container margin={false}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>Adicione seu pet</Text>
                </View>
                <View style={styles.form}>
                    {visible ? 
                    <DateTimePicker 
                        onChange={(value: any) => onChangeBirthday(value)}
                        value={date}
                    />: <></>}

                    <InputCustom label='Nome do Pet' text={name} hasErros={nameErr} onChangeText={onChangeName} invalidText={''}/>
                    <InputCustom label='Data de nascimento' text={dateText} hasErros={birthdayErr} onChangeText={onChangeBirthday} invalidText={''} hasTouch={() => setVisible(true)}/>
                    <InputCustom label='Pet' text={pet} hasErros={petErr} onChangeText={onChangePet} hasTouch={showModal} invalidText={''}/>
                    <InputCustom label='Raça' text={breed} hasErros={breedErr} onChangeText={onChangeBreed} invalidText={''}/>
                    <InputCustom label='Peso(KG)' text={weight} hasErros={weightErr} onChangeText={onChangeWeight} invalidText={''} hasMask={true}/>    
                    <InputCustom label='Descrição' text={description} hasErros={descriptionErr} onChangeText={onChangeDescription} invalidText={''}/>    

                    <Button 
                        style={styles.button} 
                        mode="contained" 
                        onPress={() => {
                            setNameErr(hasErrorsName())
                        }}
                    >
                        Adicionar
                    </Button>
                </View>
            </Container>
            <ModalCustom title='Escolha o pet:' showModal={pet != '' ? false : visibleModal} hideModal={hideModal} setText={setPet}/>
        </>
    );
}

export default AddPet;
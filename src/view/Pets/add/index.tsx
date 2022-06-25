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
import { dateValidation, descriptionValidation, nameValidation, weigthValidadtion } from '../../../../util/validations';
import { IItens } from '../../../../interfaces/IModal.interface';

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
        return weigthValidadtion(weight);
    };
    const hasErrorsDescription = () => {
        return descriptionValidation(description);
    };

    const [text, setText] = useState('')

    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleModalBreed, setVisibleModalBreed] = useState(false);
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisibleModal(true);
    const hideModal = () => setVisibleModal(false);

    const showModalBreed = () => setVisibleModalBreed(true);
    const hideModalBreed = () => setVisibleModalBreed(false);

    const [itens, setItens] = useState<IItens[]>([{
        id: 0,
        name: 'dog',
        ShowedName: 'cachorro',
    }, {
        id: 1,
        name: 'cat',
        ShowedName: 'Gato',
    }])

    const [itensBreedDog, setItensBreed] = useState<IItens[]>([{
        id: 0,
        ShowedName: 'pug'
    }, {
        id: 1,
        ShowedName: 'Poddle',
    }, {
        id: 2,
        ShowedName: 'Boxer',
    }, {
        id: 3,
        ShowedName: 'Pincher',
    }])

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

                    <InputCustom label='Nome do Pet' text={name} hasErros={nameErr} onChangeText={onChangeName} invalidText={'O nome precisa se acima de 3 letras!'}/>
                    <InputCustom label='Data de nascimento' text={dateText} hasErros={birthdayErr} onChangeText={() => {}} invalidText={'A data deve ser anterior a de hoje!'} hasTouch={() => setVisible(true)}/>
                    <InputCustom label='Pet' text={pet} hasErros={petErr} onChangeText={onChangePet} hasTouch={showModal} invalidText={'Um Pet deve ser selecionado!'}/>
                    <InputCustom label='Raça' text={breed} hasErros={breedErr} onChangeText={onChangeBreed} invalidText={'Uma raça precisa ser selecionada!'} hasTouch={showModalBreed}/>
                    <InputCustom label='Peso(KG)' text={weight} hasErros={weightErr} onChangeText={onChangeWeight} invalidText={'É necessário colocar um peso!'} hasMask={true}/>    
                    <InputCustom label='Descrição' text={description} hasErros={descriptionErr} onChangeText={onChangeDescription} invalidText={'A descrição não pode ser vazia e nem maior que 200 letras!'}/>    

                    <Button 
                        style={styles.button} 
                        mode="contained" 
                        onPress={() => {
                            setNameErr(hasErrorsName())
                            setBirthdayErr(hasErrorsBirthday())
                            setPetErr(hasErrorsPet())
                            setBreedErr(hasErrorsBreed())
                            setWeightErr(hasErrorsWeight())
                            setDescriptionErr(hasErrorsDescription())
                            console.log(weightErr)
                            if(!hasErrorsName() && !hasErrorsBirthday() && !hasErrorsPet() && !hasErrorsBreed() && !hasErrorsWeight() && !hasErrorsDescription()) {
                                navigation.goBack()
                            }
                        }}
                    >
                        Adicionar
                    </Button>
                </View>
            </Container>
            <ModalCustom title='Escolha o pet:' showModal={pet != '' ? false : visibleModal} hideModal={hideModal} setText={setPet} Itens={itens}/>
            <ModalCustom title='Escolha a raça:' showModal={breed != '' ? false : visibleModalBreed} hideModal={hideModalBreed} setText={setBreed} Itens={itensBreedDog}/>
        </>
    );
}

export default AddPet;
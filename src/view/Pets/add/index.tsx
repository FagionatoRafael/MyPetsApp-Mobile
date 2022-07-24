import { Text, View, TextInput } from 'react-native';
import styles from './styles';
import { Modal, Portal, Provider, Title, Button } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text'
import React, { SetStateAction, useState } from 'react';
import { useFonts, Dosis_400Regular } from '@expo-google-fonts/dosis';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment'

import InputCustom from '../../../components/Input';
import Container from '../../../components/Container';
import ModalCustom from '../../../components/Modal';
import { dateValidation, descriptionValidation, nameValidation, weigthValidadtion } from '../../../../util/validations';
import { IItens } from '../../../../interfaces/IModal.interface';

interface IParams {
    pet: string,
    petId: number,
    namePet: string,
    birthday: string,
    description: string,
    breed: string,
    breedId: number,
    weight: string
}

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
    const [idPet, setIdPet] = useState<number>()
    const [breed, setBreed] = useState('');
    const [idBreed, setIdBreed] = useState<number>()
    const [weight, setWeight] = useState('');
    const [description, setDescription] = useState('');
    const [deleteBotton, setDeleteBotton] = useState(false)

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

    const [title, setTitle] = useState('')
    const [button, setButton] = useState('')
    const [id, setId] = useState<number>()

    useState(() => {
        const params: IParams = navigation.getState().routes[3].params
        setTitle('Adicione seu pet')
        setButton('Adicionar')
        if(params) {
            setName(params.namePet)
            setDateText(params.birthday)
            setPet(params.pet)
            setBreed(params.breed)
            setWeight(params.weight)
            setDescription(params.description)
            setIdPet(params.petId)
            setIdBreed(params.breedId)
            setTitle('Altere seu pet')
            setButton('Alterar')
            setDeleteBotton(true)
        }
        setVisibleModal(false)
        setVisibleModalBreed(false)
    }, [])

    return (
        <>
            <Container margin={false}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>{title}</Text>
                </View>
                <View style={styles.form}>
                    {visible ? 
                    <DateTimePicker 
                    onTouchEnd={() => console.log('alooo')}
                        onTouchCancel={(event) => {setVisible(false); console.log(event)}}
                        onChange={(value: any) => onChangeBirthday(value)}
                        value={date}
                    />: <></>}

                    <InputCustom label='Nome do Pet' text={name} hasErros={nameErr} onChangeText={onChangeName} invalidText={'O nome precisa se acima de 3 letras!'}/>
                    <InputCustom label='Data de nascimento' text={dateText} hasErros={birthdayErr} onChangeText={() => {}} invalidText={'A data deve ser anterior a de hoje!'} hasTouch={() => setVisible(true)} editable={false}/>
                    <InputCustom label='Pet' text={pet} hasErros={petErr} onChangeText={onChangePet} hasTouch={showModal} invalidText={'Um Pet deve ser selecionado!'} editable={false}/>
                    <InputCustom label='Raça' text={breed} hasErros={breedErr} onChangeText={onChangeBreed} invalidText={'Uma raça precisa ser selecionada!'} hasTouch={showModalBreed} editable={false}/>
                    <InputCustom label='Peso(KG)' text={weight} hasErros={weightErr} onChangeText={onChangeWeight} invalidText={'É necessário colocar um peso!'} hasMask={true}/>    
                    <InputCustom label='Descrição' text={description} hasErros={descriptionErr} onChangeText={onChangeDescription} multiline={true} invalidText={'A descrição não pode ser vazia e nem maior que 200 letras!'}/>    
                    
                    <View style={styles.groupButtons}>
                        <Button 
                            style={[styles.button, !deleteBotton ? {width: '100%'} : {}]} 
                            mode="contained" 
                            onPress={() => {
                                setNameErr(hasErrorsName())
                                setBirthdayErr(hasErrorsBirthday())
                                setPetErr(hasErrorsPet())
                                setBreedErr(hasErrorsBreed())
                                setWeightErr(hasErrorsWeight())
                                setDescriptionErr(hasErrorsDescription())
                                if(!hasErrorsName() && !hasErrorsBirthday() && !hasErrorsPet() && !hasErrorsBreed() && !hasErrorsWeight() && !hasErrorsDescription()) {
                                    navigation.goBack()
                                }
                            }}
                        >
                            {button}
                        </Button>
                        {deleteBotton ? (<Button  mode="contained" style={styles.deleteButtom}>
                            <Feather name="trash-2" size={22} color="white" />
                        </Button>): <></>}
                    </View>
                    
                </View>
            </Container>
            <ModalCustom 
                title='Escolha o pet:' 
                showModal={visibleModal} 
                hideModal={hideModal} 
                setText={setPet} 
                Itens={itens}
                idIten={idPet}
                getId={(value) => {setIdPet(value)}}
            />
            <ModalCustom 
                title='Escolha a raça:' 
                showModal={visibleModalBreed} 
                hideModal={hideModalBreed} 
                setText={setBreed} 
                Itens={itensBreedDog}
                idIten={idBreed}
                getId={(value) => {setIdBreed(value)}}
            />
        </>
    );
}

export default AddPet;